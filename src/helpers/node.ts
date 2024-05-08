import Translator from "../classes/Translator";
import IABZeusTranslatorConfig from "../interfaces/IABZeusTranslatorConfig";
import { groupByAttr } from "./array";
import { FormatTriniGroups } from "./functions/formatTriniGroup";
import { flatTrini } from "./functions/misc";
import { splitIntoTrinitarianGroups } from "./functions/splitIntoTrinitarianGroups";

export const findParentIdFromPreviousGroup = (nodes: any[], group: number) => {
    let parent = nodes.find((item: any) => item.group === group);
    return parent && parent.id ? parent.id : null;
};

export const nodeTree = (
    config: IABZeusTranslatorConfig,
    arr: any,
    nodes?: any,
    links?: any,
    obj?: any,
    index?: number,
    nodeIndex?: number,
    level?: number,
    parent?: number,
    type?: "eto" | "suj" | "obj" | "trini" | null
  ): any => {
    const debug = false;
    const translator = new Translator();
  
    const translate = (word: string) => {
      const trinitarianGroups = FormatTriniGroups(
        splitIntoTrinitarianGroups(word)
      );
      let output = "";
      //console.log("translating groups",trinitarianGroups)
      for (let i = 0; i < trinitarianGroups.length; i++) {
        const translation = translator.trinitarian(trinitarianGroups[i], {
          ...config,
          ...{ inlineDetail: true },
        });
        output += translation;
        //console.log("subtranslating w:",word," g:",trinitarianGroups[i]," output:",)
      }
  
      return output;
    };
  
    if (!type) type = null;
    if (!level) level = 0;
    if (!index) index = 0;
    if (!nodeIndex) nodeIndex = 0;
    if (!nodes) nodes = [];
    if (!links) links = [];
  
    let trini: any = {};
  
    let _arr = !Array.isArray(arr) ? Array.from(arr) : arr;
    
    while (_arr.length === 1 && Array.isArray(_arr)) {
      _arr = _arr[0];
    }

    trini.trini = _arr;
  
    let tempNodes: any[] = [];
    let tempLinks: any[] = [];
  
    if (index === 0) {
      nodeIndex++;
  
      /* console.log(config,typeof trini === "object"
      ? trini.trini
      : trini);*/
  
      const name = flatTrini(trini.trini);
      const n = {
        id: nodeIndex,
        name: name,
        val: trini,
        type: type || "trini",
        group: level,
        parent:
          level === 0 ? null : findParentIdFromPreviousGroup(nodes, level - 1),
        ...(type && (config.nestedTranslation || level > 0)
          ? { translation: translate(name) }
          : { translation: null }),
      };
      tempNodes.push(n);
      debug && console.log(`appending main node ${n.id} ${n.name}`);
    }
    const parentNodeIndex = nodeIndex;
    if (_arr[index]) {
      if (typeof trini.suj !== "object") {
        if (_arr[index].length > 1) {
          const _suj = nodeTree(
            config,
            _arr[index],
            tempNodes,
            null,
            obj,
            index,
            nodeIndex + 1,
            level + 1,
            parent,
            "suj"
          );
          nodeIndex = Number(_suj.nodeIndex);
          //level = Number(_suj.level);
          trini.suj = _suj.suj;
          //console.log("_suj", _arr[index], trini.suj);
          tempNodes = [...tempNodes, ..._suj.nodes];
          tempLinks = [...tempLinks, ..._suj.links];
          //console.log("_suj.nodes",_suj.nodes);
        } else {
          nodeIndex++;
          trini.suj = _arr[index];
  
          const name =
            typeof trini.suj === "object"
              ? flatTrini(trini.suj.trini)
              : flatTrini(trini.suj);
          const o = {
            id: nodeIndex,
            name: name,
            val: trini.suj,
            type: "suj",
            group: Number(`${level + 1}${parentNodeIndex}`),
            parent: parentNodeIndex,
            ...(config.nestedTranslation
              ? { translation: translate(name) }
              : { translation: null }),
          };
          tempNodes.push(o);
          debug && console.log(`appending node ${o.id} ${o.name}`);
          tempNodes.push(o);
  
          debug &&
            console.log(
              `linking ${parentNodeIndex} ${trini.trini} with ${nodeIndex} : ${o.name}`
            );
  
          tempLinks.push({
            source: parentNodeIndex,
            target: nodeIndex,
          });
        }
        //nodeIndex++;
      }
    }
  
    if (_arr[index + 1]) {
      if (typeof trini.eto !== "object") {
        if (_arr[index + 1] && _arr[index + 1].length > 1) {
          const _eto = nodeTree(
            config,
            _arr[index + 1],
            tempNodes,
            null,
            obj,
            index,
            nodeIndex + 1,
            level + 1,
            parent,
            "eto"
          );
          nodeIndex = Number(_eto.nodeIndex);
          //level = Number(_eto.level);
          trini.eto = _eto.obj;
          //console.log("_eto", _arr[index + 1], trini.eto);
          tempNodes = [...tempNodes, ..._eto.nodes];
          tempLinks = [...tempLinks, ..._eto.links];
          //console.log("_eto.modes",_eto.nodes);
        } else {
          nodeIndex++;
          trini.eto = _arr[index + 1];
          const translator = new Translator();
          //console.log(trini.eto)
          const name =
            typeof trini.eto === "object"
              ? flatTrini(trini.eto.trini)
              : flatTrini(trini.eto);
  
          const o = {
            id: nodeIndex,
            name: name,
            val: trini.eto,
            type: "eto",
            group: Number(`${level + 1}${parentNodeIndex}`),
            parent: parentNodeIndex,
            ...(config.nestedTranslation
              ? { translation: translate(name) }
              : { translation: null }),
          };
  
          debug && console.log(`appending node ${o.id} ${o.name}`);
          tempNodes.push(o);
  
          debug &&
            console.log(
              `linking ${parentNodeIndex} ${trini.trini} with ${nodeIndex} : ${o.name}`
            );
          tempLinks.push({
            source: parentNodeIndex,
            target: nodeIndex,
          });
        }
        //nodeIndex++;
      }
    }
  
    if (_arr[index + 2]) {
      if (typeof trini.obj !== "object") {
        if (_arr[index + 2] && _arr[index + 2].length > 1) {
          const _obj = nodeTree(
            config,
            _arr[index + 2],
            tempNodes,
            null,
            obj,
            index,
            nodeIndex + 1,
            level + 1,
            parent,
            "obj"
          );
          nodeIndex = Number(_obj.nodeIndex);
          trini.obj = _obj.obj;
          tempNodes = [...tempNodes, ..._obj.nodes];
          tempLinks = [...tempLinks, ..._obj.links];
        } else {
          nodeIndex++;
          trini.obj = _arr[index + 2];
          const name =
            typeof trini.obj === "object"
              ? flatTrini(trini.obj.trini)
              : flatTrini(trini.obj);
          const o = {
            id: nodeIndex,
            name: name,
            val: trini.obj,
            type: "obj",
            group: Number(`${level + 1}${parentNodeIndex}`),
            parent: parentNodeIndex,
            ...(config.nestedTranslation
              ? { translation: translate(name) }
              : { translation: null }),
          };
          debug && console.log(`appending node ${o.id} ${o.name}`);
          tempNodes.push(o);
          debug &&
            console.log(
              `linking ${parentNodeIndex} ${trini.trini} with ${nodeIndex} : ${o.name}`
            );
          tempLinks.push({
            source: parentNodeIndex,
            target: nodeIndex,
          });
        }
      }
    }
  
    if (!obj) {
      obj = trini;
      nodes = tempNodes;
      links = tempLinks;
    } else if (obj && obj.value && obj.value !== trini.value) {
      obj = { ...obj, trini };
      nodes = [...nodes, ...tempNodes];
      links = [...links, ...tempLinks];
    }
  
    index += 3;
  
    if (index < _arr.length) {
      return nodeTree(
        config,
        _arr,
        nodes,
        links,
        obj,
        index,
        nodeIndex,
        level,
        parent
      );
    }
  
    return {
      arr: _arr,
      nodes: nodes,
      links: links,
      obj: obj,
      index: index,
      nodeIndex: nodeIndex,
      level: level,
      parent: parent,
    };
  };

  export const parseNodeLinks = (obj: any) => {
    let nodes = obj.nodes;
    let links = obj.links;
  
    const uniqueNodes = nodes.reduce((acc: any, item: any) => {
      if (!acc.some((accItem: any) => accItem.id === item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
  
    const levels = groupByAttr(obj.nodes, "group");
    const levelsKeys = Object.keys(levels);
  
    for (let l = 0; l < levelsKeys.length; l++) {
      let levelGroup = levels[levelsKeys[l]];
      //console.log("levelGroup", levelGroup);
      for (let i = 0; i < levelGroup.length; i++) {
        let item = levelGroup[i];
        if (item.parent) {
          links.push({
            source: item.parent,
            target: item.id,
          });
        }
      }
    }
  
    obj.nodes = uniqueNodes;
    obj.links = links;
  
    return obj;
  };
  
  
