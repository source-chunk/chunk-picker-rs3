importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js');
let nonValids = {};
let globalValids;
let eGlobal;
let highestOverall = {};
let dropRatesGlobal = {};
let dropTablesGlobal = {};
let tempAlwaysGlobal = {};
let xpTable = {
    "1": 0,
    "2": 83,
    "3": 174,
    "4": 276,
    "5": 388,
    "6": 512,
    "7": 650,
    "8": 801,
    "9": 969,
    "10": 1154,
    "11": 1358,
    "12": 1584,
    "13": 1833,
    "14": 2107,
    "15": 2411,
    "16": 2746,
    "17": 3115,
    "18": 3523,
    "19": 3973,
    "20": 4470,
    "21": 5018,
    "22": 5624,
    "23": 6291,
    "24": 7028,
    "25": 7842,
    "26": 8740,
    "27": 9730,
    "28": 10824,
    "29": 12031,
    "30": 13363,
    "31": 14833,
    "32": 16456,
    "33": 18247,
    "34": 20224,
    "35": 22406,
    "36": 24815,
    "37": 27473,
    "38": 30408,
    "39": 33648,
    "40": 37224,
    "41": 41171,
    "42": 45529,
    "43": 50339,
    "44": 55649,
    "45": 61512,
    "46": 67983,
    "47": 75127,
    "48": 83014,
    "49": 91721,
    "50": 101333,
    "51": 111945,
    "52": 123660,
    "53": 136594,
    "54": 150872,
    "55": 166636,
    "56": 184040,
    "57": 203254,
    "58": 224466,
    "59": 247886,
    "60": 273742,
    "61": 302288,
    "62": 333804,
    "63": 368599,
    "64": 407015,
    "65": 449428,
    "66": 496254,
    "67": 547953,
    "68": 605032,
    "69": 668051,
    "70": 737627,
    "71": 814445,
    "72": 899257,
    "73": 992895,
    "74": 1096278,
    "75": 1210421,
    "76": 1336443,
    "77": 1475581,
    "78": 1629200,
    "79": 1798808,
    "80": 1986068,
    "81": 2192818,
    "82": 2421087,
    "83": 2673114,
    "84": 2951373,
    "85": 3258594,
    "86": 3597792,
    "87": 3972294,
    "88": 4385776,
    "89": 4842295,
    "90": 5346332,
    "91": 5902831,
    "92": 6517253,
    "93": 7195629,
    "94": 7944614,
    "95": 8771558,
    "96": 9684577,
    "97": 10692629,
    "98": 11805606,
    "99": 13034431,
    "100": 14391160,
    "101": 15889109,
    "102": 17542976,
    "103": 19368992,
    "104": 21385073,
    "105": 23611006,
    "106": 26068632,
    "107": 28782069,
    "108": 31777943,
    "109": 35085654,
    "110": 38737661,
    "111": 42769801,
    "112": 47221641,
    "113": 52136869,
    "114": 57563718,
    "115": 63555443,
    "116": 70170840,
    "117": 77474828,
    "118": 85539082,
    "119": 94442737,
    "120": 104273167
};
let diaryTierOrder = ['Beginner', 'Easy', 'Medium', 'Hard', 'Elite'];
let diaryHierarchy = ['Elite', 'Hard', 'Medium', 'Easy', 'Beginner'];
let outputTasks = {};
let multiTasks = {};

let type;
let chunks;
let baseChunkData;
let rules;
let chunkInfo;
let skillNames;
let processingSkill;
let maybePrimary;
let combatSkills;
let monstersPlus;
let objectsPlus;
let chunksPlus;
let itemsPlus;
let mixPlus;
let npcsPlus;
let tools;
let elementalRunes;
let manualTasks;
let completeChallenges;
let backlog;
let rareDropNum;
let universalPrimary;
let elementalStaves;
let rangedItems;
let boneItems;
let highestCurrent;
let dropTables;
let questPointTotal;
let questProgress = {};
let diaryProgress = {};
let skillQuestXp = {};
let kudosTotal = 0;
let possibleSkillTotal = 0;
let randomLoot;
let magicTools;
let bossLogs;
let bossMonsters;
let minigameShops;
let manualEquipment;
let checkedChallenges;
let backloggedSources;
let altChallenges;
let manualMonsters;
let slayerLocked;
let passiveSkill;
let f2pSkills;
let assignedXpRewards;
let isDiary2Tier = false;
let manualAreas;
let secondaryPrimaryNum;
let isOnlyManualAreas = false;
let bestEquipmentAltsGlobal = {};

let clueTasksPossible = {};
let areasStructure = {};
let tempChunkData = {};

onmessage = function(e) {
    try {
        eGlobal = e;
        [
            type,
            chunks,
            rules,
            chunkInfo,
            skillNames,
            processingSkill,
            maybePrimary,
            combatSkills,
            monstersPlus,
            objectsPlus,
            chunksPlus,
            itemsPlus,
            mixPlus,
            npcsPlus,
            tasksPlus,
            tools,
            elementalRunes,
            manualTasks,
            completedChallenges,
            backlog,
            rareDropNum,
            universalPrimary,
            elementalStaves,
            rangedItems,
            boneItems,
            highestCurrent,
            dropTables,
            possibleAreas,
            randomLoot,
            magicTools,
            bossLogs,
            bossMonsters,
            minigameShops,
            manualEquipment,
            checkedChallenges,
            backloggedSources,
            altChallenges,
            manualMonsters,
            slayerLocked,
            passiveSkill,
            f2pSkills,
            assignedXpRewards,
            isDiary2Tier,
            manualAreas,
            secondaryPrimaryNum,
            isOnlyManualAreas,
        ] = eGlobal.data;

        if (isDiary2Tier) {
            !!chunkInfo['challenges']['Diary'] && Object.keys(chunkInfo['challenges']['Diary']).filter(task => { return !chunkInfo['challenges']['Diary'][task].hasOwnProperty('Reward') && diaryHierarchy.includes(task.split('|')[1].split('%2F')[1]) && chunkInfo['challenges']['Diary'][task].hasOwnProperty('Tasks') }).forEach(task => {
                Object.keys(chunkInfo['challenges']['Diary'][task]['Tasks']).filter(subTask => { return chunkInfo['challenges']['Diary'][task]['Tasks'][subTask] === 'Diary' && diaryHierarchy.includes(subTask.split('|')[1].split('%2F')[1]) && subTask.includes('Complete the') && (diaryHierarchy.indexOf(subTask.split('|')[1].split('%2F')[1]) - diaryHierarchy.indexOf(task.split('|')[1].split('%2F')[1]) === 1) }).forEach(subTask => {
                    let newTier = diaryHierarchy[diaryHierarchy.indexOf(subTask.split('|')[1].split('%2F')[1]) + 1];
                    !!newTier && (chunkInfo['challenges']['Diary'][task]['Tasks'][subTask.split(subTask.split('|')[1].split('%2F')[1]).join(newTier)] = 'Diary');
                    delete chunkInfo['challenges']['Diary'][task]['Tasks'][subTask];
                    if (Object.keys(chunkInfo['challenges']['Diary'][task]['Tasks']).length === 0) {
                        delete chunkInfo['challenges']['Diary'][task]['Tasks'];
                    }
                });
            });
        }

        if (rareDropNum === "1/0") {
            rareDropNum = "1/999999999999999";
        }
        if (secondaryPrimaryNum === "1/0") {
            secondaryPrimaryNum = "1/999999999999999";
        }
        if (!chunkInfo) {
            return;
        }

        if (!chunks) {
            chunks = {};
        }

        dropRatesGlobal = {};
        dropTablesGlobal = {};

        chunks = getAllChunkAreas(chunks);
        postMessage('5%');
        baseChunkData = gatherChunksInfo(chunks);
        postMessage('10%');
        globalValids = calcChallenges(chunks, baseChunkData);
        baseChunkData = tempChunkData;
        postMessage('90%');
        calcBIS();
        postMessage('100%');
        //console.log(globalValids);

        let tempChallengeArr;
        type === 'current' && (tempChallengeArr = calcCurrentChallenges2());

        //console.log(nonValids);
        //console.log(baseChunkData);

        postMessage([type, globalValids, baseChunkData, chunkInfo, highestCurrent, tempChallengeArr, type === 'current' ? questPointTotal : 0, highestOverall, type === 'current' ? dropRatesGlobal : {}, questProgress, diaryProgress, skillQuestXp, chunks, type === 'current' ? dropTablesGlobal : {}, bestEquipmentAltsGlobal]);
    } catch (err) {
        postMessage(['error', err]);
    }
}

// replaceAll helper
let escapeRegExp = function(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replaces all instances of match within str with replacement
String.prototype.replaceAll = function(match, replacement) {
    return this.split(match).join(replacement);
}

// Combines JSONs
let combineJSONs = function(a, b) {
    let temp = {};
    !!a && Object.keys(a).forEach(sub => {
        if (typeof a[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], a[sub]);
        } else {
            temp[sub] = a[sub];
        }
    });
    !!b && Object.keys(b).forEach(sub => {
        if (typeof b[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], b[sub]);
        } else {
            temp[sub] = b[sub];
        }
    });
    return temp;
}

// Returns level from input xp
let getLevelForXp = function(xp) {
    let level = 1
    while (xp >= xpTable[level + 1]) {
        level++;
    }
    return level;
}

// Calculates all the possible challenges
let calcChallenges = function(chunks, baseChunkData) {
    let valids = {};
    let outputs = {};
    let outputObjects = {};
    let newValids = {};
    let tempItemSkill = {};
    let tempMultiStepSkill = {};
    let i = 0;
    !!manualTasks && !!manualTasks['Quest'] && Object.keys(manualTasks['Quest']).forEach(name => {
        let manualOff = false;
        let i = 0;
        let currNameArr = [];
        currNameArr.push(name);
        while (!manualOff && !!chunkInfo['challenges']['Quest'] && !!chunkInfo['challenges']['Quest'][currNameArr[i]] && chunkInfo['challenges']['Quest'][currNameArr[i]].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks']).filter(subTask => chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks'][subTask] === 'Quest').length > 0) {
            Object.keys(chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks']).filter(subTask => chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks'][subTask] === 'Quest').forEach(subTask => {
                if (subTask.includes('+')) {
                    if (subTask.includes('+x')) {
                        subTask = subTask.split('+x')[0] + '+';
                    }
                    chunkInfo['codeItems']['tasksPlus'].hasOwnProperty(subTask) && chunkInfo['codeItems']['tasksPlus'][subTask].forEach(plusTask => {
                        if (!!chunkInfo['challenges']['Quest'][plusTask] && chunkInfo['challenges']['Quest'][currNameArr[i]]['BaseQuest'] === chunkInfo['challenges']['Quest'][plusTask]['BaseQuest']) {
                            manualTasks['Quest'][plusTask] = true;
                            currNameArr.push(plusTask);
                        }
                    });
                } else {
                    if (!!chunkInfo['challenges']['Quest'][subTask] && chunkInfo['challenges']['Quest'][currNameArr[i]]['BaseQuest'] === chunkInfo['challenges']['Quest'][subTask]['BaseQuest']) {
                        manualTasks['Quest'][subTask] = true;
                        currNameArr.push(subTask);
                    }
                }
            });
            i++;
        }
    });
    !!manualTasks && Object.keys(manualTasks).forEach(skill => {
        skill !== 'BiS' && Object.keys(manualTasks[skill]).forEach(challenge => {
            if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]) {
                if (!valids[skill]) {
                    valids[skill] = {};
                }
                valids[skill][challenge] = manualTasks[skill][challenge];if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = manualTasks[skill][challenge];
                chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
            }
        });
    });

    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Spawns'] && Object.keys(chunkInfo['taskUnlocks']['Spawns']).forEach(item => {
        Object.keys(chunkInfo['taskUnlocks']['Spawns'][item]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Spawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Spawns'][item][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                if (!baseChunkData['items'][item]) {
                    baseChunkData['items'][item] = {};
                }
                baseChunkData['items'][item][chunk] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Monsters'] && Object.keys(chunkInfo['taskUnlocks']['Monsters']).forEach(monster => {
        Object.keys(chunkInfo['taskUnlocks']['Monsters'][monster]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Monsters'][monster][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Monsters'][monster][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['monsters'].hasOwnProperty(monster) && baseChunkData['monsters'][monster].hasOwnProperty(chunk)) {
                !!baseChunkData['monsters'][monster] && delete baseChunkData['monsters'][monster][chunk];
                if (!!baseChunkData['monsters'][monster] && Object.keys(baseChunkData['monsters'][monster]).length === 0) {
                    delete baseChunkData['monsters'][monster];
                    let dropsObj = chunkInfo['drops'][monster];
                    if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                        dropsObj = chunkInfo['skillItems']['Slayer'][monster];
                    }
                    !!dropsObj && Object.keys(dropsObj).forEach(drop => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach(item => {
                                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                                    delete baseChunkData['items'][item];
                                }
                                !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][item];
                                if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                    delete dropRatesGlobal[monster];
                                }
                                !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][item];
                                if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                    delete dropTablesGlobal[monster];
                                }
                            });
                        } else {
                            if (!!baseChunkData['items'][drop]) {
                                if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                                    let re = new RegExp(`/Slay .*\~|${monster}|\~/`,"gm");
                                    let slayerTaskName = (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).find(value => re.test(value))) || (!!newValids['Slayer'] && Object.keys(newValids['Slayer']).find(value => re.test(value))) || "";
                                    delete baseChunkData['items'][drop][slayerTaskName];
                                    if (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(slayerTaskName)) {
                                        delete newValids['Slayer'][slayerTaskName];
                                    }
                                } else {
                                    delete baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                }
                            }
                            if (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).length <= 0) {
                                delete baseChunkData['items'][drop];
                            }
                            !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][drop];
                            if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                delete dropRatesGlobal[monster];
                            }
                            !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][drop];
                            if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                delete dropTablesGlobal[monster];
                            }
                        }
                    });
                }
            } else if (tempValid && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster])) {
                if (!baseChunkData['monsters'].hasOwnProperty(monster)) {
                    baseChunkData['monsters'][monster] = {};
                }
                baseChunkData['monsters'][monster][chunk] = true;
                !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach(item => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!baseChunkData['items'][item]) {
                                        baseChunkData['items'][item] = {};
                                    }
                                    if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                        baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                    } else {
                                        baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!baseChunkData['items'][drop]) {
                                baseChunkData['items'][drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['NPCs'] && Object.keys(chunkInfo['taskUnlocks']['NPCs']).forEach(npc => {
        Object.keys(chunkInfo['taskUnlocks']['NPCs'][npc]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['NPCs'][npc][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['NPCs'][npc][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['npcs'].hasOwnProperty(npc) && baseChunkData['npcs'][npc].hasOwnProperty(chunk)) {
                !!baseChunkData['npcs'][npc] && delete baseChunkData['npcs'][npc][chunk];
                if (!!baseChunkData['npcs'][npc] && Object.keys(baseChunkData['npcs'][npc]).length === 0) {
                    delete baseChunkData['npcs'][npc];
                }
            } else if (tempValid && (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc])) {
                if (!baseChunkData['npcs'].hasOwnProperty(npc)) {
                    baseChunkData['npcs'][npc] = {};
                }
                baseChunkData['npcs'][npc][chunk] = true;
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Objects'] && Object.keys(chunkInfo['taskUnlocks']['Objects']).forEach(object => {
        Object.keys(chunkInfo['taskUnlocks']['Objects'][object]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Objects'][object][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Objects'][object][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['objects'].hasOwnProperty(object) && baseChunkData['objects'][object].hasOwnProperty(chunk)) {
                !!baseChunkData['objects'][object] && delete baseChunkData['objects'][object][chunk];
                if (!!baseChunkData['objects'][object] && Object.keys(baseChunkData['objects'][object]).length === 0) {
                    delete baseChunkData['objects'][object];
                }
            } else if (tempValid && (!backloggedSources['objects'] || !backloggedSources['objects'][object])) {
                if (!baseChunkData['objects'].hasOwnProperty(object)) {
                    baseChunkData['objects'][object] = {};
                }
                baseChunkData['objects'][object][chunk] = true;
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Shops'] && Object.keys(chunkInfo['taskUnlocks']['Shops']).forEach(shop => {
        Object.keys(chunkInfo['taskUnlocks']['Shops'][shop]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Shops'][shop][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Shops'][shop][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['shops'].hasOwnProperty(shop) && baseChunkData['shops'][shop].hasOwnProperty(chunk)) {
                !!baseChunkData['shops'][shop] && delete baseChunkData['shops'][shop][chunk];
                if (!!baseChunkData['shops'][shop] && Object.keys(baseChunkData['shops'][shop]).length === 0) {
                    delete baseChunkData['shops'][shop];
                    !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return !!baseChunkData['items'][item] }).forEach(item => {
                        delete baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                        if (Object.keys(baseChunkData['items'][item]).length <= 0) {
                            delete baseChunkData['items'][item];
                        }
                    });
                }
            } else if (tempValid && (!backloggedSources['shops'] || !backloggedSources['shops'][shop])) {
                if (!baseChunkData['shops'].hasOwnProperty(shop)) {
                    baseChunkData['shops'][shop] = {};
                }
                baseChunkData['shops'][shop][chunk] = true;
                !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return (!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item]) }).forEach(item => {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                });
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach(item => {
        let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
        let monster = '';
        let asterisk = '*';
        if (item.includes('^')) {
            asterisk += '^';
            monster = item.split('^')[1];
            item = item.split('^')[0];
            monster === '' && (asterisk += '^');
        }
        if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
            if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return source === monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') }).forEach(source => {
                    delete baseChunkData['items'][item][source];
                    if (Object.keys(baseChunkData['items'][item]).length === 0) {
                        delete baseChunkData['items'][item];
                    }
                });
                if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                    dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                    delete dropRatesGlobal[monster][item];
                }
                if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                    dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                    delete dropTablesGlobal[monster][item];
                }
            } else if (asterisk.includes('^') && monster === '') {
                baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                delete baseChunkData['items'][item];
                !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                });
                !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                });
            } else if (!asterisk.includes('^')) {
                baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = combineJSONs(baseChunkData['items'][item + asterisk], JSON.parse(JSON.stringify(baseChunkData['items'][item]))));
                delete baseChunkData['items'][item];
            }
        } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
            if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                if ((chunkInfo['drops'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                    if (!baseChunkData['items'].hasOwnProperty(item)) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][monster] = 'secondary-drop';
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                }
            } else if (asterisk.includes('^') && monster === '') {
                baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                delete baseChunkData['items'][item + asterisk];
                !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                });
                !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                });
            } else if (!asterisk.includes('^')) {
                baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                delete baseChunkData['items'][item + asterisk];
            }
        }
    });
    if (rules['RDT'] && baseChunkData['items']['GemDropTable+'] && newValids && newValids['Quest'] && newValids['Quest'].hasOwnProperty("~|Legends' Quest|~ Complete the quest")) {
        Object.keys(baseChunkData['items']['GemDropTable+']).forEach(monster => {
            monster = monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J');
            !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]['GemDropTable+']).forEach(quantity => {
                Object.keys(dropTables['GemDropTable+']).forEach(item => {
                    if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        if ((chunkInfo['drops'][monster]['GemDropTable+'][quantity] === 'Always' && dropTables['GemDropTable+'][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                        }
                        if (!dropRatesGlobal[monster]) {
                            dropRatesGlobal[monster] = {};
                        }
                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+']).forEach(quantity => {
                                dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                            });
                        }
                    }
                });
            });
            !!chunkInfo['skillItems']['Slayer'][monster] && Object.keys(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+']).forEach(quantity => {
                Object.keys(dropTables['GemDropTableLegends+']).forEach(item => {
                    if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        if (chunkInfo['skillItems']['Slayer'][monster][item] === 'Always') {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                        }
                        if (!dropRatesGlobal[monster]) {
                            dropRatesGlobal[monster] = {};
                        }
                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+']).forEach(quantity => {
                                dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                            });
                        }
                    }
                });
            });
        });
    }
    if (!!chunks && Object.keys(chunks).filter(chunk => { return chunkInfo['unnotingChunks'].includes(chunk) }).length === 0) {
        !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach(monster => {
            !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach(item => {
                !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach(quantity => {
                    if (quantity.includes('(noted)')) {
                        if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster.replaceAll('%2F', '#')]) {
                            delete baseChunkData['items'][item][monster.replaceAll('%2F', '#')];
                            if (!baseChunkData['items'][item] || Object.keys(baseChunkData['items'][item]).length === 0) {
                                delete baseChunkData['items'][item];
                            }
                        }
                    }
                });
            });
        });
    }

    do {
        i++;
        postMessage(((i + 1) * 7) + '%');
        !!tempItemSkill && Object.keys(tempItemSkill).forEach(skill => {
            let skillMax = Math.max(...Object.values(newValids[skill]));
            !!tempItemSkill[skill] && Object.keys(tempItemSkill[skill]).forEach(item => {
                !!tempItemSkill[skill][item] && !!tempItemSkill[skill][item].forEach(itemTask => {
                    if (!newValids[skill] || !chunkInfo['challenges'][skill] || !chunkInfo['challenges'][skill][itemTask] || (skillMax < chunkInfo['challenges'][skill][itemTask]['Level'] && !rules['Multi Step Processing'])) {
                        delete tempItemSkill[skill][item][tempItemSkill[skill][item].indexOf(itemTask)];
                    }
                });
            });
        });
        valids = newValids;
        [newValids, tempItemSkill, tempMultiStepSkill] = calcChallengesWork(chunks, baseChunkData, tempItemSkill);
        !!manualTasks && Object.keys(manualTasks).forEach(skill => {
            skill !== 'BiS' && Object.keys(manualTasks[skill]).forEach(challenge => {
                if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]) {
                    if (!valids[skill]) {
                        valids[skill] = {};
                    }
                    valids[skill][challenge] = manualTasks[skill][challenge];
                    if (!newValids[skill]) {
                        newValids[skill] = {};
                    }
                    newValids[skill][challenge] = manualTasks[skill][challenge];
                    chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
                }
            });
        });
        let fullyValid;
        let leftoversCount = 0;
        let savedValids = JSON.parse(JSON.stringify(newValids));
        let passedByTasks = {};
        let tasksModified;
        while ((leftoversCount < 10 && Object.keys(diff(newValids, savedValids) || {}).length !== 0) || leftoversCount < 1 || tasksModified) {
            tasksModified = false;
            savedValids = JSON.parse(JSON.stringify(newValids));
            Object.keys(savedValids).filter((skill) => { return skill !== 'BiS' }).forEach(skill => {
                Object.keys(savedValids[skill]).sort(function(a, b) { return skill === 'Diary' ? ((diaryTierOrder.indexOf(a.split('|')[1].split('%2F')[1]) - diaryTierOrder.indexOf(b.split('|')[1].split('%2F')[1]) === 0) ? (chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(a) && chunkInfo['challenges'][skill].hasOwnProperty(b) && chunkInfo['challenges'][skill][a].hasOwnProperty('ManualShow') !== chunkInfo['challenges'][skill][b].hasOwnProperty('ManualShow') ? chunkInfo['challenges'][skill][a].hasOwnProperty('ManualShow') - chunkInfo['challenges'][skill][b].hasOwnProperty('ManualShow') : a.replaceAll('Task ', '').localeCompare(b.replaceAll('Task ', ''), 'en', { numeric: true })) : (diaryTierOrder.indexOf(a.split('|')[1].split('%2F')[1]) - diaryTierOrder.indexOf(b.split('|')[1].split('%2F')[1]))) : a.replaceAll('Task ', '').localeCompare(b.replaceAll('Task ', ''), 'en', { numeric: true }) }).forEach(challenge => {
                    if (!passedByTasks[skill]) {
                        passedByTasks[skill] = {};
                    }
                    passedByTasks[skill][challenge] = true;
                    let bestBoost = 0;
                    let ownsCrystalSaw = false;
                    if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && (!chunkInfo['challenges'][skill].hasOwnProperty(challenge) ? !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost') : !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost')) && (!completedChallenges[skill] || !completedChallenges[skill].hasOwnProperty(challenge))) {
                        Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                            if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                if (boost !== 'Crystal saw') {
                                    if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                                        let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                        let possibleBoost = Math.floor(newValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        possibleBoost = Math.floor((newValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        if (possibleBoost > bestBoost) {
                                            bestBoost = possibleBoost;
                                        }
                                    } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                        bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                    }
                                } else if (skill === 'Construction') {
                                    if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw+')) {
                                        ownsCrystalSaw = true;
                                        chunkInfo['challenges'][skill][challenge]['ItemsDetails'].push('Crystal saw');
                                    }
                                }
                            }
                        });
                    }
                    if ((!checkPrimaryMethod(skill, newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 || (chunkInfo['challenges'][skill][challenge]['Level'] - (bestBoost + (ownsCrystalSaw ? 3 : 0))) > passiveSkill[skill]) && (!skillQuestXp || !skillQuestXp.hasOwnProperty(skill) || (chunkInfo['challenges'][skill][challenge]['Level'] - (bestBoost + (ownsCrystalSaw ? 3 : 0))) > skillQuestXp[skill]['level'])) && !!chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Level'] > 1) {
                        let highestCompletedLevel = 0;
                        !!completedChallenges && completedChallenges.hasOwnProperty(skill) && Object.keys(completedChallenges[skill]).forEach(task => {
                            if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][task] && !!chunkInfo['challenges'][skill][task]['Level'] && chunkInfo['challenges'][skill][task]['Level'] > highestCompletedLevel) {
                                highestCompletedLevel = chunkInfo['challenges'][skill][task]['Level'];
                            }
                        });
                        if (highestCompletedLevel <= 1 || highestCompletedLevel < chunkInfo['challenges'][skill][challenge]['Level']) {
                            if (!nonValids.hasOwnProperty(challenge)) {
                                nonValids[challenge] = [];
                            }
                            nonValids[challenge] = [...nonValids[challenge], 'Passive'];
                            !!newValids[skill] && delete newValids[skill][challenge];
                            !!valids[skill] && delete valids[skill][challenge];
                            tasksModified = true;
                        }
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                    if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Skills')) {
                        Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).filter((subSkill) => { return (!checkPrimaryMethod(subSkill, newValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level']) || ((!!passiveSkill && passiveSkill.hasOwnProperty(subSkill) && passiveSkill[subSkill] > 1 && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] <= passiveSkill[subSkill]) || (!!skillQuestXp && skillQuestXp.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > skillQuestXp[subSkill]['level']))) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).forEach(subSkill => {
                            let bestBoost = 0;
                            let ownsCrystalSaw = false;
                            if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(subSkill) && (!chunkInfo['challenges'][subSkill].hasOwnProperty(challenge) ? !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost') : !chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('NoBoost')) && (!completedChallenges[subSkill] || !completedChallenges[subSkill].hasOwnProperty(challenge))) {
                                Object.keys(chunkInfo['codeItems']['boostItems'][subSkill]).forEach(boost => {
                                    if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                        if (boost !== 'Crystal saw') {
                                            if (typeof chunkInfo['codeItems']['boostItems'][subSkill][boost] === 'string') {
                                                let stringSplit = chunkInfo['codeItems']['boostItems'][subSkill][boost].split('%+');
                                                let possibleBoost = Math.floor(newValids[subSkill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                                possibleBoost = Math.floor((newValids[subSkill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                                if (possibleBoost > bestBoost) {
                                                    bestBoost = possibleBoost;
                                                }
                                            } else if (chunkInfo['codeItems']['boostItems'][subSkill][boost] > bestBoost) {
                                                bestBoost = chunkInfo['codeItems']['boostItems'][subSkill][boost];
                                            }
                                        } else if (subSkill === 'Construction' && chunkInfo['challenges'][subSkill].hasOwnProperty(challenge)) {
                                            if (chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][subSkill][challenge]['Items'].includes('Saw+')) {
                                                ownsCrystalSaw = true;
                                                chunkInfo['challenges'][subSkill][challenge]['ItemsDetails'].push('Crystal saw');
                                            }
                                        }
                                    }
                                });
                            }
                            let highestCompletedLevel = 0;
                            !!completedChallenges && completedChallenges.hasOwnProperty(subSkill) && Object.keys(completedChallenges[subSkill]).forEach(task => {
                                if (!!chunkInfo['challenges'][subSkill] && !!chunkInfo['challenges'][subSkill][task] && !!chunkInfo['challenges'][subSkill][task]['Level'] && chunkInfo['challenges'][subSkill][task]['Level'] > highestCompletedLevel) {
                                    highestCompletedLevel = chunkInfo['challenges'][subSkill][task]['Level'];
                                }
                            });
                            if (!checkPrimaryMethod(subSkill, newValids, baseChunkData) && ((subSkill !== 'Slayer' || !slayerLocked || (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - (bestBoost + (ownsCrystalSaw ? 3 : 0))) > slayerLocked['level'])) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] <= 1 || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > passiveSkill[subSkill]) && (highestCompletedLevel <= 1 || highestCompletedLevel <= chunkInfo['challenges'][skill][challenge]['Skills'][subSkill])) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subSkill];
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                tasksModified = true;
                            }
                        });
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                    }
                    if ((skill !== 'Extra' || chunkInfo['challenges'][skill][challenge].hasOwnProperty('Requirements')) && savedValids.hasOwnProperty(skill) && savedValids[skill].hasOwnProperty(challenge)) {
                        fullyValid = true;
                        !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                            if (subTask.includes('+')) {
                                if (subTask.includes('+x')) {
                                    let xNum = parseInt(subTask.split('+x')[1]);
                                    let xResults = 0;
                                    let xSubTask = subTask.split('+x')[0] + '+';
                                    if (!tasksPlus[xSubTask] && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            return;
                                        }
                                    } else {
                                        let tempValid = false;
                                        tasksPlus[xSubTask].forEach(plus => {
                                            if (!(!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) || (!!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                                tempValid = true;
                                                xResults++;
                                            } else if (skill === 'Diary' && chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                                tempValid = true;
                                                xResults++;
                                            }
                                        });
                                        if ((!tempValid || xResults < xNum) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            if (!nonValids.hasOwnProperty(challenge)) {
                                                nonValids[challenge] = [];
                                            }
                                            nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                            fullyValid = false;
                                            !!newValids[skill] && delete newValids[skill][challenge];
                                            !!valids[skill] && delete valids[skill][challenge];
                                            !!savedValids[skill] && delete savedValids[skill][challenge];
                                            tasksModified = true;
                                            if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                    if (!tasksPlus[subTask]) {
                                        if (!nonValids.hasOwnProperty(challenge) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], subTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        tasksModified = true;
                                        if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            return;
                                        }
                                    } else {
                                        let tempValid = false;
                                        tasksPlus[subTask].forEach(plus => {
                                            if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                                tempValid = true;
                                            } else if (skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                                tempValid = true;
                                            }
                                        });
                                        if (!tempValid && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            if (!nonValids.hasOwnProperty(challenge)) {
                                                nonValids[challenge] = [];
                                            }
                                            nonValids[challenge] = [...nonValids[challenge], subTask];
                                            fullyValid = false;
                                            !!newValids[skill] && delete newValids[skill][challenge];
                                            !!valids[skill] && delete valids[skill][challenge];
                                            !!savedValids[skill] && delete savedValids[skill][challenge];
                                            tasksModified = true;
                                            if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                                return;
                                            }
                                        }
                                    }
                                }
                            } else {
                                let highestCompletedLevel = 0;
                                !!completedChallenges && completedChallenges.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) && Object.keys(completedChallenges[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]).forEach(task => {
                                    if (!!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] > highestCompletedLevel) {
                                        highestCompletedLevel = chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'];
                                    }
                                });
                                if (!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge) || (!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] <= 1 || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level']) && (highestCompletedLevel <= 1 || highestCompletedLevel < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) {
                                    if (!(skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !chunkInfo['challenges'][skill][challenge]['ManualShow'] && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], subTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        tasksModified = true;
                                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            return;
                                        }
                                    }
                                }
                            }
                        });
                        if (!!chunkInfo['challenges'][skill][challenge]['BackupParent']) {
                            if (((!!valids[skill] && (valids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']) || newValids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) || (backlog[skill] && backlog[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], chunkInfo['challenges'][skill][challenge]['BackupParent']];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            }
                        }
                        !!chunkInfo['challenges'][skill][challenge]['Requirements'] && chunkInfo['challenges'][skill][challenge]['Requirements'].filter((req) => { return !checkPrimaryMethod(req, newValids, baseChunkData) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).forEach(req => {
                            if (!nonValids.hasOwnProperty(challenge)) {
                                nonValids[challenge] = [];
                            }
                            nonValids[challenge] = [...nonValids[challenge], req];
                            fullyValid = false;
                            !!newValids[skill] && delete newValids[skill][challenge];
                            !!valids[skill] && delete valids[skill][challenge];
                            if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                return;
                            }
                        });
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                        if (fullyValid) {
                            !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                                if (subTask.includes('+')) {
                                    if (subTask.includes('+x')) {
                                        let xSubTask = subTask.split('+x')[0] + '+';
                                        if (!tasksPlus[xSubTask]) {
                                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['ManualShow']) {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(xSubTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] = false);
                                            }
                                        } else {
                                            tasksPlus[xSubTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                            });
                                        }
                                    } else {
                                        if (!tasksPlus[subTask]) {
                                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                            }
                                        } else {
                                            tasksPlus[subTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                            });
                                        }
                                    }
                                } else {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                    }
                                }
                            });
                        }
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
                let extraSets = {};
                skill === 'Extra' && Object.keys(newValids[skill]).filter((challenge) => { return chunkInfo['challenges'][skill][challenge].hasOwnProperty('Set') }).forEach(challenge => {
                    if (!extraSets.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Set'])) {
                        extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                    } else if ((chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][extraSets[chunkInfo['challenges'][skill][challenge]['Set']]]['Priority']) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(extraSets[newValids[skill][challenge]['Set']])) {
                            nonValids[extraSets[newValids[skill][challenge]['Set']]] = [];
                        }
                        nonValids[extraSets[newValids[skill][challenge]['Set']]] = [...nonValids[extraSets[newValids[skill][challenge]['Set']]], 'extraSets'];
                        !!newValids[skill] && delete newValids[skill][extraSets[newValids[skill][challenge]['Set']]];
                        !!valids[skill] && delete valids[skill][extraSets[newValids[skill][challenge]['Set']]];
                        tasksModified = true;
                        extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                    } else if (!chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                        tasksModified = true;
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
            });
            leftoversCount++;
        }
        Object.keys(newValids).filter((skill) => { return skill !== 'BiS' }).forEach(skill => {
            if (!checkPrimaryMethod(skill, newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1)) {
                tempValidsSkill = {};
                !!newValids[skill] && Object.keys(newValids[skill]).filter(task => { return newValids[skill][task] === 1 }).forEach(task => {
                    tempValidsSkill[task] = newValids[skill][task];
                });
                newValids[skill] = tempValidsSkill;
            }
            checkPrimaryMethod(skill, newValids, baseChunkData) && Object.keys(newValids[skill]).sort(function(a, b) { return a.localeCompare(b, 'en', { numeric: true }) }).forEach(challenge => {
                fullyValid = true;
                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoXp') && !rules["Highest Level"] && !!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']] && Object.keys(baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]).length > 1) {
                    delete newValids[skill][challenge];
                    if (!newValids[skill]) {
                        delete newValids[skill];
                    }
                    delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                    if (!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]) {
                        delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']];
                        if (!baseChunkData['items']) {
                            delete baseChunkData['items'];
                        }
                    }
                    return;
                }
                !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                    if (subTask.includes('+')) {
                        if (subTask.includes('+x')) {
                            let xNum = parseInt(subTask.split('+x')[1]);
                            let xResults = 0;
                            let xSubTask = subTask.split('+x')[0] + '+';
                            if (!tasksPlus[xSubTask] && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            } else {
                                let tempValid = false;
                                tasksPlus[xSubTask].forEach(plus => {
                                    if (!(!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) || (!!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                        tempValid = true;
                                        xResults++;
                                    } else if (skill === 'Diary' && chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                        tempValid = true;
                                        xResults++;
                                    }
                                });
                                if ((!tempValid || xResults < xNum) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    if (!nonValids.hasOwnProperty(challenge)) {
                                        nonValids[challenge] = [];
                                    }
                                    nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                    fullyValid = false;
                                    !!newValids[skill] && delete newValids[skill][challenge];
                                    !!valids[skill] && delete valids[skill][challenge];
                                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                        return;
                                    }
                                }
                            }
                        } else {
                            if (!tasksPlus[subTask]) {
                                if (!nonValids.hasOwnProperty(challenge) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            } else {
                                let tempValid = false;
                                tasksPlus[subTask].forEach(plus => {
                                    if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1) || (!!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                        tempValid = true;
                                    } else if (skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                        tempValid = true;
                                    }
                                });
                                if (!tempValid && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    if (!nonValids.hasOwnProperty(challenge)) {
                                        nonValids[challenge] = [];
                                    }
                                    nonValids[challenge] = [...nonValids[challenge], subTask];
                                    fullyValid = false;
                                    !!newValids[skill] && delete newValids[skill][challenge];
                                    !!valids[skill] && delete valids[skill][challenge];
                                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                        return;
                                    }
                                }
                            }
                        }
                    } else {
                        let highestCompletedLevel = 0;
                        !!completedChallenges && completedChallenges.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) && Object.keys(completedChallenges[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]).forEach(task => {
                            if (!!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] > highestCompletedLevel) {
                                highestCompletedLevel = chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'];
                            }
                        });
                        if (!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge) || (!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] <= 1 || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level']) && (highestCompletedLevel <= 1 || highestCompletedLevel < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) {
                            if (!(skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !chunkInfo['challenges'][skill][challenge]['ManualShow'] && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            }
                        }
                    }
                });
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
                if (!!chunkInfo['challenges'][skill][challenge]['BackupParent']) {
                    if (((!!valids[skill] && (valids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']) || newValids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) || (backlog[skill] && backlog[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], chunkInfo['challenges'][skill][challenge]['BackupParent']];
                        fullyValid = false;
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                    }
                }
                !!chunkInfo['challenges'][skill][challenge]['Requirements'] && chunkInfo['challenges'][skill][challenge]['Requirements'].filter((req) => { return !checkPrimaryMethod(req, newValids, baseChunkData) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).forEach(req => {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], req];
                    fullyValid = false;
                    !!newValids[skill] && delete newValids[skill][challenge];
                    !!valids[skill] && delete valids[skill][challenge];
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
                if (fullyValid) {
                    !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                        if (subTask.includes('+')) {
                            if (subTask.includes('+x')) {
                                let xSubTask = subTask.split('+x')[0] + '+';
                                if (!tasksPlus[xSubTask]) {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(xSubTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] = false);
                                    }
                                } else {
                                    tasksPlus[xSubTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                    });
                                }
                            } else {
                                if (!tasksPlus[subTask]) {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                    }
                                } else {
                                    tasksPlus[subTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                    });
                                }
                            }
                        } else {
                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                            }
                        }
                    });
                }
            });
            let extraSets = {};
            skill === 'Extra' && Object.keys(newValids[skill]).filter((challenge) => { return chunkInfo['challenges'][skill][challenge].hasOwnProperty('Set') }).forEach(challenge => {
                if (!extraSets.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Set'])) {
                    extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                } else if ((chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][extraSets[chunkInfo['challenges'][skill][challenge]['Set']]]['Priority']) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                    !!newValids[skill] && delete newValids[skill][extraSets[newValids[skill][challenge]['Set']]];
                    !!valids[skill] && delete valids[skill][extraSets[newValids[skill][challenge]['Set']]];
                    extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                } else if (!chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                    !!newValids[skill] && delete newValids[skill][challenge];
                    !!valids[skill] && delete valids[skill][challenge];
                }
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
            });
        });
        Object.keys(outputs).forEach(output => {
            Object.keys(outputs[output]).filter(source => outputs[output][source].includes('-') && chunkInfo['challenges'].hasOwnProperty(outputs[output][source].split('-')[1]) && chunkInfo['challenges'][outputs[output][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][outputs[output][source].split('-')[1]][source].hasOwnProperty('NoXp')).forEach(source => {
                if (!!baseChunkData['items'][output] && (Object.keys(baseChunkData['items'][output]).length > 1 || !baseChunkData['items'][output].hasOwnProperty(source))) {
                    delete newValids[outputs[output][source].split('-')[1]][source];
                    if (!newValids[outputs[output][source].split('-')[1]]) {
                        delete newValids[outputs[output][source].split('-')[1]];
                    }
                }
            });
        });
        !rules["Highest Level"] && Object.keys(tempItemSkill).forEach(skill => {
            Object.keys(tempItemSkill[skill]).filter((item) => { return !!baseChunkData['items'][item] }).forEach(item => {
                let lowestItem;
                let lowestName;
                let taskIsRemoved;
                tempItemSkill[skill][item].filter((name) => { return !!chunkInfo['challenges'][skill][name] && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoXp') }).forEach(name => {
                    taskIsRemoved = false;
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (challenge.hasOwnProperty('Tasks')) {
                        chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).forEach(subTask => {
                            if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                                !!newValids[skill] && delete newValids[skill][name];
                                !!valids[skill] && delete valids[skill][name];
                                !!tempItemSkill[skill][item] && tempItemSkill[skill][item].splice(tempItemSkill[skill][item].indexOf(name), 1);
                                if (!!tempItemSkill[skill][item] && tempItemSkill[skill][item].length === 0) {
                                    delete tempItemSkill[skill][item];
                                }
                                taskIsRemoved = true;
                            }
                        });
                    }
                    if (!taskIsRemoved && newValids.hasOwnProperty(skill) && checkPrimaryMethod(skill, newValids, baseChunkData) && (!backlog[skill] || !backlog[skill].hasOwnProperty(name))) {
                        if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                            lowestItem = challenge;
                            lowestName = name;
                        } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                            lowestItem = challenge;
                            lowestName = name;
                        }
                    }
                });
                if (!!lowestName) {
                    !newValids[skill] && (newValids[skill] = {});
                    newValids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level'];
                }
            });
        });
        Object.keys(tempItemSkill).forEach(skill => {
            let lowestName;
            let lowestLevel;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach(challenge => {
                if ((!lowestLevel || (lowestLevel < newValids[skill][challenge])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                    lowestName = challenge;
                    lowestLevel = newValids[skill][challenge];
                }
            });
            if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && passiveSkill[skill] > lowestLevel) {
                lowestLevel = passiveSkill[skill];
            } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && skillQuestXp[skill]['level'] > lowestLevel) {
                lowestLevel = skillQuestXp[skill]['level'];
            }
            !!lowestName && Object.keys(tempItemSkill[skill]).forEach(item => {
                !!baseChunkData['items'][item] && tempItemSkill[skill][item].filter((name) => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(name) && (chunkInfo['challenges'][skill][name]['Level'] <= lowestLevel) && name !== lowestName}).forEach(name => {
                    let stillValid = true;
                    chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).forEach(subTask => {
                        if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                            stillValid = false;
                        }
                    });
                    if (stillValid) {
                        !newValids[skill] && (newValids[skill] = {});
                        newValids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                        chunkInfo['challenges'][skill][name]['Priority'] = (chunkInfo['challenges'][skill][name].hasOwnProperty('Priority') ? chunkInfo['challenges'][skill][name]['Priority'] : -1) + 1000;
                    }
                });
            });
        });
        Object.keys(tempMultiStepSkill).forEach(skill => {
            let lowestLevel;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach(challenge => {
                if ((!lowestLevel || (lowestLevel < newValids[skill][challenge])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                    lowestLevel = newValids[skill][challenge];
                }
            });
            if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && passiveSkill[skill] > lowestLevel) {
                lowestLevel = passiveSkill[skill];
            } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && skillQuestXp[skill]['level'] > lowestLevel) {
                lowestLevel = skillQuestXp[skill]['level'];
            }
            !!lowestLevel && Object.keys(tempMultiStepSkill[skill]).filter((name) => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(name) && (chunkInfo['challenges'][skill][name]['Level'] <= lowestLevel)}).forEach(name => {
                let stillValid = true;
                chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).forEach(subTask => {
                    if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                        stillValid = false;
                    }
                });
                if (stillValid) {
                    !newValids[skill] && (newValids[skill] = {});
                    newValids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                    chunkInfo['challenges'][skill][name]['Priority'] = 999;
                }
            });
        });
        let areasAdded = {};
        let tempChunkArray = [];
        !isOnlyManualAreas && newValids.hasOwnProperty('Nonskill') && Object.keys(newValids['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('UnlocksArea') && (!manualAreas.hasOwnProperty(task) || manualAreas[task]) }).forEach(task => {
            if (chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('SkillsNeeded')) {
                let tempValidNeeded = true;
                Object.keys(chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded']).forEach(taskSkill => {
                    if (!checkPrimaryMethod(taskSkill, newValids, baseChunkData) && !(!!passiveSkill && passiveSkill.hasOwnProperty(taskSkill) && passiveSkill[taskSkill] > 1 && chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded'][taskSkill] <= passiveSkill[taskSkill])) {
                        tempValidNeeded = false;
                    }
                });
                if (tempValidNeeded) {
                    tempChunkArray.push(task);
                }
            } else {
                tempChunkArray.push(task);
            }
        });
        let indexCount = 0;
        let startingSize = tempChunkArray.length;
        let deadChunkArray = [];
        while (indexCount < tempChunkArray.length && indexCount < (startingSize * 2)) {
            if (!chunks.hasOwnProperty(tempChunkArray[indexCount]) && possibleAreas.hasOwnProperty(tempChunkArray[indexCount])) {
                if (Object.keys(areasStructure[tempChunkArray[indexCount]]).filter(subArea => { return chunks.hasOwnProperty(subArea) }).length > 0) {
                    chunks[tempChunkArray[indexCount]] = true;
                    areasAdded[tempChunkArray[indexCount]] = true;
                } else if (Object.keys(areasStructure[tempChunkArray[indexCount]]).filter(subArea => { return tempChunkArray.includes(subArea) && possibleAreas.hasOwnProperty(subArea) }).length > 0 && !deadChunkArray.includes(tempChunkArray[indexCount])) {
                    tempChunkArray.push(tempChunkArray[indexCount]);
                    deadChunkArray.push(tempChunkArray[indexCount]);
                }
            }
            indexCount++;
        }
        if (Object.keys(areasAdded).length > 0) {
            baseChunkData = combineJSONs(baseChunkData, gatherChunksInfo(areasAdded));
        }
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Spawns'] && Object.keys(chunkInfo['taskUnlocks']['Spawns']).forEach(item => {
            Object.keys(chunkInfo['taskUnlocks']['Spawns'][item]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Spawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Spawns'][item][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                    if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                        delete baseChunkData['items'][item];
                    }
                } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][chunk] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Monsters'] && Object.keys(chunkInfo['taskUnlocks']['Monsters']).forEach(monster => {
            Object.keys(chunkInfo['taskUnlocks']['Monsters'][monster]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Monsters'][monster][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Monsters'][monster][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['monsters'].hasOwnProperty(monster) && baseChunkData['monsters'][monster].hasOwnProperty(chunk)) {
                    !!baseChunkData['monsters'][monster] && delete baseChunkData['monsters'][monster][chunk];
                    if (!!baseChunkData['monsters'][monster] && Object.keys(baseChunkData['monsters'][monster]).length === 0) {
                        delete baseChunkData['monsters'][monster];
                        let dropsObj = chunkInfo['drops'][monster];
                        if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                            dropsObj = chunkInfo['skillItems']['Slayer'][monster];
                        }
                        !!dropsObj && Object.keys(dropsObj).forEach(drop => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach(item => {
                                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                    if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                                        delete baseChunkData['items'][item];
                                    }
                                    !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][item];
                                    if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                        delete dropRatesGlobal[monster];
                                    }
                                    !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][item];
                                    if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                        delete dropTablesGlobal[monster];
                                    }
                                });
                            } else {
                                if (!!baseChunkData['items'][drop]) {
                                    if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                                        let re = new RegExp(`/Slay .*\~|${monster}|\~/`,"gm");
                                        let slayerTaskName = (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).find(value => re.test(value))) || (!!newValids['Slayer'] && Object.keys(newValids['Slayer']).find(value => re.test(value))) || "";
                                        delete baseChunkData['items'][drop][slayerTaskName];
                                        if (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(slayerTaskName)) {
                                            delete newValids['Slayer'][slayerTaskName];
                                        }
                                    } else {
                                        delete baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                    }
                                }
                                if (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).length <= 0) {
                                    delete baseChunkData['items'][drop];
                                }
                                !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][drop];
                                if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                    delete dropRatesGlobal[monster];
                                }
                                !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][drop];
                                if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                    delete dropTablesGlobal[monster];
                                }
                            }
                        });
                    }
                } else if (tempValid && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster])) {
                    if (!baseChunkData['monsters'].hasOwnProperty(monster)) {
                        baseChunkData['monsters'][monster] = {};
                    }
                    baseChunkData['monsters'][monster][chunk] = true;
                    !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach(item => {
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!baseChunkData['items'][item]) {
                                            baseChunkData['items'][item] = {};
                                        }
                                        if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                        } else {
                                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!baseChunkData['items'][drop]) {
                                    baseChunkData['items'][drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['NPCs'] && Object.keys(chunkInfo['taskUnlocks']['NPCs']).forEach(npc => {
            Object.keys(chunkInfo['taskUnlocks']['NPCs'][npc]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['NPCs'][npc][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['NPCs'][npc][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['npcs'].hasOwnProperty(npc) && baseChunkData['npcs'][npc].hasOwnProperty(chunk)) {
                    !!baseChunkData['npcs'][npc] && delete baseChunkData['npcs'][npc][chunk];
                    if (!!baseChunkData['npcs'][npc] && Object.keys(baseChunkData['npcs'][npc]).length === 0) {
                        delete baseChunkData['npcs'][npc];
                    }
                } else if (tempValid && (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc])) {
                    if (!baseChunkData['npcs'].hasOwnProperty(npc)) {
                        baseChunkData['npcs'][npc] = {};
                    }
                    baseChunkData['npcs'][npc][chunk] = true;
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Objects'] && Object.keys(chunkInfo['taskUnlocks']['Objects']).forEach(object => {
            Object.keys(chunkInfo['taskUnlocks']['Objects'][object]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Objects'][object][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Objects'][object][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['objects'].hasOwnProperty(object) && baseChunkData['objects'][object].hasOwnProperty(chunk)) {
                    !!baseChunkData['objects'][object] && delete baseChunkData['objects'][object][chunk];
                    if (!!baseChunkData['objects'][object] && Object.keys(baseChunkData['objects'][object]).length === 0) {
                        delete baseChunkData['objects'][object];
                    }
                } else if (tempValid && (!backloggedSources['objects'] || !backloggedSources['objects'][object])) {
                    if (!baseChunkData['objects'].hasOwnProperty(object)) {
                        baseChunkData['objects'][object] = {};
                    }
                    baseChunkData['objects'][object][chunk] = true;
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Shops'] && Object.keys(chunkInfo['taskUnlocks']['Shops']).forEach(shop => {
            Object.keys(chunkInfo['taskUnlocks']['Shops'][shop]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Shops'][shop][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Shops'][shop][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['shops'].hasOwnProperty(shop) && baseChunkData['shops'][shop].hasOwnProperty(chunk)) {
                    !!baseChunkData['shops'][shop] && delete baseChunkData['shops'][shop][chunk];
                    if (!!baseChunkData['shops'][shop] && Object.keys(baseChunkData['shops'][shop]).length === 0) {
                        delete baseChunkData['shops'][shop];
                        !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return !!baseChunkData['items'][item] }).forEach(item => {
                            delete baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                            if (Object.keys(baseChunkData['items'][item]).length <= 0) {
                                delete baseChunkData['items'][item];
                            }
                        });
                    }
                } else if (tempValid && (!backloggedSources['shops'] || !backloggedSources['shops'][shop])) {
                    if (!baseChunkData['shops'].hasOwnProperty(shop)) {
                        baseChunkData['shops'][shop] = {};
                    }
                    baseChunkData['shops'][shop][chunk] = true;
                    !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return (!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item]) }).forEach(item => {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                    });
                }
            });
        });
        let slayerTaskLockedItems = {};
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach(item => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
            let monster = '';
            let asterisk = '*';
            if (item.includes('^')) {
                asterisk += '^';
                monster = item.split('^')[1];
                item = item.split('^')[0];
                monster === '' && (asterisk += '^');
            }
            if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if (!slayerTaskLockedItems[item]) {
                        slayerTaskLockedItems[item] = {};
                    }
                    slayerTaskLockedItems[item][monster.toLowerCase()] = true;
                    !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source === monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) || (source.toLowerCase().includes(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').toLowerCase()) && source.includes('Slay')) }).forEach(source => {
                        delete baseChunkData['items'][item][source];
                        if (Object.keys(baseChunkData['items'][item]).length === 0) {
                            delete baseChunkData['items'][item];
                        }
                    });
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = combineJSONs(baseChunkData['items'][item + asterisk], JSON.parse(JSON.stringify(baseChunkData['items'][item]))));
                    delete baseChunkData['items'][item];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                            dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                            delete dropRatesGlobal[monster][item];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                            dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                            delete dropTablesGlobal[monster][item];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if ((chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['drops'][monster].hasOwnProperty(item) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                        if (!baseChunkData['items'].hasOwnProperty(item)) {
                            baseChunkData['items'][item] = {};
                        }
                        baseChunkData['items'][item][monster] = 'secondary-drop';
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                    delete baseChunkData['items'][item + asterisk];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                    delete baseChunkData['items'][item + asterisk];
                }
            }
        });
        if (rules['RDT'] && baseChunkData['items']['GemDropTable+'] && newValids && newValids['Quest'] && newValids['Quest'].hasOwnProperty("~|Legends' Quest|~ Complete the quest")) {
            Object.keys(baseChunkData['items']['GemDropTable+']).forEach(monster => {
                monster = monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J');
                !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]['GemDropTable+']).forEach(quantity => {
                    Object.keys(dropTables['GemDropTable+']).forEach(item => {
                        if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if ((chunkInfo['drops'][monster]['GemDropTable+'][quantity] === 'Always' && dropTables['GemDropTable+'][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                if (!baseChunkData['items'][item]) {
                                    baseChunkData['items'][item] = {};
                                }
                                if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+']).forEach(quantity => {
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                                });
                            }
                        }
                    });
                });
                !!chunkInfo['skillItems']['Slayer'][monster] && Object.keys(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+']).forEach(quantity => {
                    Object.keys(dropTables['GemDropTableLegends+']).forEach(item => {
                        if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][monster][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                if (!baseChunkData['items'][item]) {
                                    baseChunkData['items'][item] = {};
                                }
                                if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+']).forEach(quantity => {
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                                });
                            }
                        }
                    });
                });
            });
        }
        if (!!chunks && Object.keys(chunks).filter(chunk => { return chunkInfo['unnotingChunks'].includes(chunk) }).length === 0) {
            !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach(monster => {
                !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach(item => {
                    !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach(quantity => {
                        if (quantity.includes('(noted)')) {
                            if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster.replaceAll('%2F', '#')]) {
                                delete baseChunkData['items'][item][monster.replaceAll('%2F', '#')];
                                if (!baseChunkData['items'][item] || Object.keys(baseChunkData['items'][item]).length === 0) {
                                    delete baseChunkData['items'][item];
                                }
                            }
                        }
                    });
                });
            });
        }

        if (rules['Skilling Pets']) {
            let skillingPets = {
                'Fishing': 'Heron',
                'Mining': 'Rock golem',
                'Woodcutting': 'Beaver',
                'Agility': 'Giant squirrel',
                'Farming': 'Tangleroot',
                'Thieving': 'Rocky',
                'Runecrafting': 'Rift guardian'
            }
            Object.keys(skillingPets).forEach(skill => {
                if (checkPrimaryMethod(skill, newValids, baseChunkData) && !!newValids && newValids[skill] && Object.keys(newValids[skill]).filter(task => { return chunkInfo['challenges'][skill].hasOwnProperty(task) && !chunkInfo['challenges'][skill][task].hasOwnProperty('NoPet') && !chunkInfo['challenges'][skill][task].hasOwnProperty('Description') }).length > 0) {
                    if (!baseChunkData['items'][skillingPets[skill]]) {
                        baseChunkData['items'][skillingPets[skill]] = {};
                    }
                    baseChunkData['items'][skillingPets[skill]][skill] = 'secondary-' + skill;
                } else {
                    !!baseChunkData['items'][skillingPets[skill]] && delete baseChunkData['items'][skillingPets[skill]][skill];
                    if (!!baseChunkData['items'][skillingPets[skill]] && Object.keys(baseChunkData['items'][skillingPets[skill]]).length <= 0) {
                        delete baseChunkData['items'][skillingPets[skill]];
                    }
                }
            });
        }
        let highestSoFar = {};
        Object.keys(newValids).forEach(skill => {
            highestSoFar[skill] = 0;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach(challenge => {
                if (newValids[skill][challenge] > highestSoFar[skill]) {
                    highestSoFar[skill] = newValids[skill][challenge];
                }
            });
        });
        let tempChallenges = JSON.parse(JSON.stringify(newValids));
        Object.keys(extraOutputItems).forEach(skill => {
            Object.keys(extraOutputItems[skill]).forEach(challenge => {
                if (chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Level') && chunkInfo['challenges'][skill][challenge]['Level'] <= highestSoFar[skill]) {
                    if (!tempChallenges[skill]) {
                        tempChallenges[skill] = {};
                    }
                    if (!tempChallenges[skill][challenge]) {
                        tempChallenges[skill][challenge] = extraOutputItems[skill][challenge];
                    }
                }
            });
        });
        Object.keys(tempChallenges).forEach(skill => {
            Object.keys(tempChallenges[skill]).forEach(challenge => {
                let subSkillValid = !(chunkInfo['challenges'][skill][challenge].hasOwnProperty('Skills') && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).filter((subSkill) => { return !checkPrimaryMethod(subSkill, tempChallenges, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level']) }).length > 0);
                if (subSkillValid && skill !== 'BiS') {
                    if (!!chunkInfo['challenges'][skill][challenge]['Output'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        let output = chunkInfo['challenges'][skill][challenge]['Output'];
                        let highestDropRate = 0;
                        !!chunkInfo['challenges'][skill][challenge]['Items'] && chunkInfo['challenges'][skill][challenge]['Items'].filter(item => item.includes('*')).forEach(item => {
                            if (item.replaceAll(/\*/g, '').includes('+')) {
                                let lowestPlusRate = 0;
                                !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].forEach(plus => {
                                    !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).forEach(source => {
                                        if (baseChunkData['items'][plus][source] === 'secondary-drop') {
                                            if (!!dropRatesGlobal[source] &&  !!dropRatesGlobal[source][plus] && !isNaN(dropRatesGlobal[source][plus].split('/')[0]) && ((parseFloat(dropRatesGlobal[source][plus].split('/')[0]) / parseFloat(dropRatesGlobal[source][plus].split('/')[1])) > lowestPlusRate)) {
                                                lowestPlusRate = parseFloat(dropRatesGlobal[source][plus].split('/')[0]) / parseFloat(dropRatesGlobal[source][plus].split('/')[1]);
                                            }
                                        } else if (baseChunkData['items'][plus][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][plus][source].split('-')[1])) {
                                            let lowestQuantityRate = 0;
                                            !!chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]] && !!chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')] && chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus] && Object.keys(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus]).forEach(quantity => {
                                                if (!isNaN(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) && ((parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[1])) < lowestQuantityRate)) {
                                                    lowestQuantityRate = parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[1]);
                                                }
                                            });
                                            if ((lowestQuantityRate > lowestPlusRate) && (lowestQuantityRate !== 0)) {
                                                lowestPlusRate = lowestQuantityRate;
                                            }
                                        }
                                    });
                                });
                                if ((lowestPlusRate > highestDropRate) && (lowestPlusRate!== 0)) {
                                    highestDropRate = lowestPlusRate;
                                }
                            } else {
                                !!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'secondary-drop') {
                                        if (!!dropRatesGlobal[source] && !!dropRatesGlobal[source][item.replaceAll(/\*/g, '')] && !isNaN(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) && ((parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) / parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[1])) > highestDropRate)) {
                                            highestDropRate = parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) / parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[1]);
                                        }
                                    } else if (baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                        let lowestQuantityRate = 0;
                                        !!chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] && !!chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')] && chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')] && Object.keys(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')]).forEach(quantity => {
                                            if (!isNaN(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) && ((parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[1])) < lowestQuantityRate)) {
                                                lowestQuantityRate = parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[1]);
                                            }
                                        });
                                        if ((lowestQuantityRate > highestDropRate) && (lowestQuantityRate !== 0)) {
                                            highestDropRate = lowestQuantityRate;
                                        }
                                    }
                                });
                            }
                        });
                        if (highestDropRate <= 0) {
                            highestDropRate = 1;
                        }
                        !!chunkInfo['skillItems'][skill] && !!chunkInfo['skillItems'][skill][output] && Object.keys(chunkInfo['skillItems'][skill][output]).filter((item) => { return (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || isNaN(parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1])) || (parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) * highestDropRate) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossLogs.hasOwnProperty(output)) }).forEach(item => {
                            if (!outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]) {
                                outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = {};
                            }
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Source')) {
                                if (chunkInfo['challenges'][skill][challenge]['Source'] === 'shop' && (!backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = chunkInfo['challenges'][skill][challenge]['Source'];
                                    if (!baseChunkData['shops'].hasOwnProperty(challenge)) {
                                        baseChunkData['shops'][challenge] = {};
                                    }
                                    baseChunkData['shops'][challenge][chunkInfo['challenges'][skill][challenge].hasOwnProperty('Chunks') ? chunkInfo['challenges'][skill][challenge]['Chunks'][0] : 'Nonskill'] = true;
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' && (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] === 'Always' || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) > (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))))) && !chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' && (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) <= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else {
                                    delete outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                }
                            } else if ((chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] === 'Always' || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) > (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))))) && !chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + skill;
                            } else if ((chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) <= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + skill;
                            }
                        });
                        if (!chunkInfo['skillItems'][skill] || !chunkInfo['skillItems'][skill][output]) {
                            if (!outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]) {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = {};
                            }
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Source')) {
                                if (chunkInfo['challenges'][skill][challenge]['Source'] === 'shop' && (!backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (!chunkInfo['challenges'][skill][challenge]['Secondary'] && (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' || !backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' || !backloggedSources['shops'] || !backloggedSources['shops'][challenge]) {
                                    outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                }
                            } else if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + skill;
                            } else {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + skill;
                            }
                        }
                    }
                    if (!!chunkInfo['challenges'][skill][challenge]['Output Object'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        let outputObject = chunkInfo['challenges'][skill][challenge]['Output Object'];
                        if (!outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]) {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = {};
                        }
                        if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = true;
                        } else {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]['Secondary-' + challenge] = true;
                        }
                    }
                }
            });
        });
        outputTasks = {};
        Object.keys(outputs).filter((output) => { return !backloggedSources['items'] || !backloggedSources['items'][output] }).forEach(output => {
            Object.keys(outputs[output]).filter((source) => { return outputs[output][source].split('-').length <= 1 || ((newValids.hasOwnProperty(outputs[output][source].split('-')[1])) || (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(source) && (!slayerTaskLockedItems.hasOwnProperty(output) || !slayerTaskLockedItems[output].hasOwnProperty(source.split('|')[1].toLowerCase())))) || (outputs[output][source].split('-')[1] === 'drop' && !(newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(source))) }).forEach(source => {
                if (outputs[output][source] !== 'shop' || (source.includes('~|') && source.includes('|~') && (!backloggedSources['shops'] || !backloggedSources['shops'][source.split('~|')[1].split('|~')[0]]))) {
                    if (baseChunkData['items'].hasOwnProperty(output + '*')) {
                        if (!baseChunkData['items'][output + '*']) {
                            baseChunkData['items'][output + '*'] = {};
                        }
                        baseChunkData['items'][output + '*'][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output + '*';
                    } else if (baseChunkData['items'].hasOwnProperty(output + '*^')) {
                        if (!baseChunkData['items'][output + '*^']) {
                            baseChunkData['items'][output + '*^'] = {};
                        }
                        baseChunkData['items'][output + '*^'][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output + '*^';
                    } else if (baseChunkData['items'].hasOwnProperty(output + '*^^')) {
                        if (!baseChunkData['items'][output + '*^^']) {
                            baseChunkData['items'][output + '*^^'] = {};
                        }
                        baseChunkData['items'][output + '*^^'][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output + '*^^';
                    } else {
                        if (!baseChunkData['items'][output]) {
                            baseChunkData['items'][output] = {};
                        }
                        baseChunkData['items'][output][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output;
                    }
                }
            });
            if (baseChunkData['items'][output] === {}) {
                delete baseChunkData['items'][output];
            }
        });
        Object.keys(outputObjects).forEach(output => {
            if (!baseChunkData['objects'][output]) {
                baseChunkData['objects'][output] = {};
            }
            Object.keys(outputObjects[output]).forEach(source => {
                baseChunkData['objects'][output][source] = outputObjects[output][source];
            });
        });
        Object.keys(baseChunkData['items']).forEach(item => {
            Object.keys(baseChunkData['items'][item]).filter((source) => { return baseChunkData['items'][item][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][item][source].split('-')[1]) && (!newValids.hasOwnProperty(baseChunkData['items'][item][source].split('-')[1]) || !newValids[baseChunkData['items'][item][source].split('-')[1]].hasOwnProperty(source)) && (baseChunkData['items'][item][source].split('-')[1] !== 'Nonskill' || source !== 'Manually Added*') }).forEach(source => {
                delete baseChunkData['items'][item][source];
                if (baseChunkData['items'][item] === {}) {
                    delete baseChunkData['items'][item];
                }
            });
        });
        Object.keys(chunkInfo['slayerEquipment']).forEach(item => {
            if (!!slayerLocked && chunkInfo['slayerEquipment'][item] > slayerLocked['level'] && baseChunkData['items'].hasOwnProperty(item)) {
                !!baseChunkData['items'] && (baseChunkData['items'][item + '*'] = {...baseChunkData['items'][item]});
                !!baseChunkData['items'] && delete baseChunkData['items'][item];
            } else if ((!slayerLocked || chunkInfo['slayerEquipment'][item] <= slayerLocked['level']) && baseChunkData['items'].hasOwnProperty(item + '*')) {
                !!baseChunkData['items'] && (baseChunkData['items'][item] = {...baseChunkData['items'][item + '*']});
                !!baseChunkData['items'] && delete baseChunkData['items'][item + '*'];
            }
        });
        Object.keys(newValids).forEach(skill => {
            Object.keys(newValids[skill]).filter((index) => { return chunkInfo['challenges'][skill][index].hasOwnProperty('Skills') && !chunkInfo['challenges'][skill][index].hasOwnProperty('ClueTier') }).forEach(name => {
                Object.keys(chunkInfo['challenges'][skill][name]['Skills']).forEach(subSkill => {
                    if (!chunkInfo['challenges'][subSkill]) {
                        chunkInfo['challenges'][subSkill] = {};
                    }
                    if (chunkInfo['challenges'][subSkill].hasOwnProperty(name)) {
                        chunkInfo['challenges'][subSkill][name] = {
                            ...chunkInfo['challenges'][subSkill][name],
                            'Level': chunkInfo['challenges'][skill][name]['Skills'][subSkill],
                            'Tasks': {
                                ...chunkInfo['challenges'][subSkill][name]['Tasks'],
                                [name + '--' + skill]: skill
                            }
                        }
                    } else {
                        if (!newValids.hasOwnProperty(subSkill)) {
                            newValids[subSkill] = {};
                        }
                        newValids[subSkill][name] = chunkInfo['challenges'][skill][name]['Skills'][subSkill];
                        chunkInfo['challenges'][subSkill][name] = {
                            ...chunkInfo['challenges'][skill][name],
                            'Level': chunkInfo['challenges'][skill][name]['Skills'][subSkill],
                            'Tasks': {
                                [name + '--' + skill]: skill
                            }
                        }
                    }
                    if (skill === 'Quest' || skill === 'Diary') {
                        delete chunkInfo['challenges'][subSkill][name]['BaseQuest'];
                        delete chunkInfo['challenges'][subSkill][name]['Skills'];
                        chunkInfo['challenges'][skill][name] = {
                            ...chunkInfo['challenges'][skill][name],
                            'Tasks': {
                                ...chunkInfo['challenges'][skill][name]['Tasks'],
                                [name + '--' + subSkill]: subSkill
                            }
                        }
                        if (chunkInfo['challenges'][subSkill][name].hasOwnProperty('SkillsBoost') && chunkInfo['challenges'][subSkill][name]['SkillsBoost'].hasOwnProperty(subSkill)) {
                            chunkInfo['challenges'][subSkill][name] = {
                                ...chunkInfo['challenges'][subSkill][name],
                                'NoBoost': true
                            }
                        }
                    }
                });
            });
        });
        Object.keys(newValids).forEach(skill => {
            Object.keys(newValids[skill]).filter(challenge => { return (chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward')) && checkPrimaryMethod(skill, newValids, baseChunkData) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !!chunkInfo['challenges'][skill][challenge]['Reward'] }).forEach(challenge => {
                chunkInfo['challenges'][skill][challenge]['Reward'].forEach(reward => {
                    if (!baseChunkData['items'][reward]) {
                        baseChunkData['items'][reward] = {};
                    }
                    baseChunkData['items'][reward][challenge] = 'secondary-' + skill;
                });
            });
        });
        questPointTotal = 0;
        questProgress = {};
        diaryProgress = {};
        skillQuestXp = {};
        !!newValids && !!newValids['Quest'] && Object.keys(newValids['Quest']).forEach(line => {
            if (chunkInfo['challenges']['Quest'].hasOwnProperty(line) && chunkInfo['challenges']['Quest'][line].hasOwnProperty('QuestPoints')) {
                questPointTotal += chunkInfo['challenges']['Quest'][line]['QuestPoints'];
                questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] = 'Complete the quest';
            } else if (questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] !== 'Complete the quest') {
                if (!questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']]) {
                    questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] = [];
                }
                questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']].push(line);
            }
            if (chunkInfo['challenges']['Quest'].hasOwnProperty(line) && chunkInfo['challenges']['Quest'][line].hasOwnProperty('XpReward')) {
                Object.keys(chunkInfo['challenges']['Quest'][line]['XpReward']).filter((skill) => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 }).forEach(skill => {
                    if (!skillQuestXp[skill]) {
                        skillQuestXp[skill] = {
                            xp: 0,
                            level: 1
                        };
                    }
                    skillQuestXp[skill]['xp'] += chunkInfo['challenges']['Quest'][line]['XpReward'][skill];
                    skillQuestXp[skill]['level'] = getLevelForXp(skillQuestXp[skill]['xp']);
                });
            }
        });
        !!newValids && !!newValids['Nonskill'] && Object.keys(newValids['Nonskill']).filter((line) => { return chunkInfo['challenges']['Nonskill'].hasOwnProperty(line) && chunkInfo['challenges']['Nonskill'][line].hasOwnProperty('XpReward') }).forEach(line => {
            Object.keys(chunkInfo['challenges']['Nonskill'][line]['XpReward']).filter((skill) => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 }).forEach(skill => {
                if (!skillQuestXp[skill]) {
                    skillQuestXp[skill] = {
                        xp: 0,
                        level: 1
                    };
                }
                skillQuestXp[skill]['xp'] += chunkInfo['challenges']['Nonskill'][line]['XpReward'][skill];
                skillQuestXp[skill]['level'] = getLevelForXp(skillQuestXp[skill]['xp']);
            });
        });
        !!assignedXpRewards && Object.keys(assignedXpRewards).forEach(skill => {
            !!assignedXpRewards[skill] && Object.keys(assignedXpRewards[skill]).forEach(line => {
                !!assignedXpRewards[skill][line] && Object.keys(assignedXpRewards[skill][line]).forEach(skillOpt => {
                    if (!skillQuestXp[skillOpt]) {
                        skillQuestXp[skillOpt] = {
                            xp: 0,
                            level: 1
                        };
                    }
                    skillQuestXp[skillOpt]['xp'] += assignedXpRewards[skill][line][skillOpt];
                    skillQuestXp[skillOpt]['level'] = getLevelForXp(skillQuestXp[skillOpt]['xp']);
                });
            });
        });
        let tier;
        !!newValids && !!newValids['Diary'] && Object.keys(newValids['Diary']).forEach(line => {
            tier = line.split('|')[1].split('%2F')[1];
            if (chunkInfo['challenges']['Diary'].hasOwnProperty(line) && chunkInfo['challenges']['Diary'][line].hasOwnProperty('Reward')) {
                if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]) {
                    diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']] = {};
                }
                if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]) {
                    diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier] = [];
                }
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]['done'] = true;
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']] = {};
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier] = [];
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks']) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks'] = [];
            }
            diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier].push(line);
            diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks'].push(line);
        });
        kudosTotal = 0;
        possibleSkillTotal = 0;
        let tempPrimarySkill = false;
        !!newValids && Object.keys(newValids).filter((skill) => { return !!newValids[skill] }).forEach(skill => {
            Object.keys(newValids[skill]).filter(challenge => { return (chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Kudos')) }).forEach(line => {
                kudosTotal += chunkInfo['challenges'][skill][line]['Kudos'];
            });
            if (skillNames.includes(skill) && skill !== 'Combat') {
                tempPrimarySkill = checkPrimaryMethod(skill, newValids, baseChunkData);
                if (skill === 'Slayer' && !!slayerLocked) {
                    possibleSkillTotal += slayerLocked['level'];
                } else if (tempPrimarySkill) {
                    possibleSkillTotal += 99;
                } else if (!!passiveSkill && passiveSkill.hasOwnProperty(skill)) {
                    possibleSkillTotal += passiveSkill[skill] === 0 ? 1 : passiveSkill[skill];
                } else if (skill === 'Hitpoints') {
                    possibleSkillTotal += 10;
                } else {
                    possibleSkillTotal += 1;
                }
            }
        });
        clueTasksPossible = {
            'beginner': true,
            'easy': true,
            'medium': true,
            'hard': true,
            'elite': true,
            'master': true
        };
        !!chunkInfo['challenges']['Nonskill'] && Object.keys(chunkInfo['challenges']['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('ClueTier') && !newValids.hasOwnProperty('Nonskill') || !newValids['Nonskill'].hasOwnProperty(task) }).forEach(task => {
            clueTasksPossible[chunkInfo['challenges']['Nonskill'][task]['ClueTier']] = false;
        });
        !!baseChunkData && !!baseChunkData['items'] && Object.keys(baseChunkData['items']).filter(item => { return Object.keys(baseChunkData['items'][item]).length === 0 }).forEach(item => {
            delete baseChunkData['items'][item];
        });
        globalValids = {...newValids};
        //console.log(i);
    } while ((Object.keys(diff(valids, newValids) || {}).length !== 0 && i < 10) || i < 3);
    valids = newValids;
    //console.log(baseChunkData);
    tempChunkData = baseChunkData;
    return valids;
}

// Returns copy of object
let freeze = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Gets diff between 2 objects
let diff = function(obj1, obj2, isInner) {
    let result = {};
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj1 || typeof obj1 !== 'object') {
        return obj1;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj1[key] || obj2[key];
        }
        if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = diff(obj1[key], obj2[key], true);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    if (!isInner) {
        result = freeze(clearEmpties(result));
    }
    return result;
}

// Clears empty subobjects from object
let clearEmpties = function(obj) {
    typeof obj === 'object' && Object.keys(obj).forEach(subObj => {
        if (typeof obj[subObj] === 'object' && Object.keys(obj).length === 0) {
            delete obj[subObj];
        } else if (typeof obj[subObj] === 'object') {
            obj[subObj] = clearEmpties(obj[subObj]);
        }
    });
    if (Object.keys(obj).length === 0) {
        return undefined;
    } else {
        return obj;
    }
}

// Checks if every source of an item is from a shop
let onlyShop = function(sources) {
    let allShop = !(Object.keys(sources).filter((source) => { return sources[source] !== 'shop' }).length > 0);
    return allShop;
}

// Does the work to calculate all the possible challenges
let calcChallengesWork = function(chunks, baseChunkData, oldTempItemSkill) {
    let items = {...baseChunkData['items']};
    let objects = {...baseChunkData['objects']};
    let monsters = {...baseChunkData['monsters']};
    let npcs = {...baseChunkData['npcs']};
    let valids = {};
    extraOutputItems = {};
    multiTasks = {};
    rules['Multi Step Processing'] && Object.keys(oldTempItemSkill).filter(skill => checkPrimaryMethod(skill, globalValids, baseChunkData)).forEach(skill => {
        !!oldTempItemSkill[skill] && Object.keys(oldTempItemSkill[skill]).forEach(item => {
            !!oldTempItemSkill[skill][item] && oldTempItemSkill[skill][item].filter(task => !!chunkInfo['challenges'][skill][task] && chunkInfo['challenges'][skill][task].hasOwnProperty('Output') && (!items.hasOwnProperty(chunkInfo['challenges'][skill][task]['Output']) || !items[chunkInfo['challenges'][skill][task]['Output']].hasOwnProperty(task))).forEach(task => {
                if (!items[chunkInfo['challenges'][skill][task]['Output']]) {
                    items[chunkInfo['challenges'][skill][task]['Output']] = {}
                }
                items[chunkInfo['challenges'][skill][task]['Output']][task] = 'multi-' + skill;
                if (!multiTasks[chunkInfo['challenges'][skill][task]['Output']]) {
                    multiTasks[chunkInfo['challenges'][skill][task]['Output']] = {};
                }
                if (!multiTasks[chunkInfo['challenges'][skill][task]['Output']][skill]) {
                    multiTasks[chunkInfo['challenges'][skill][task]['Output']][skill] = {};
                }
                multiTasks[chunkInfo['challenges'][skill][task]['Output']][skill][task] = true;
            });
        });
    });

    let tempItemSkill = {};
    let tempMultiStepSkill = {};

    !!chunkInfo['challenges'] && !!chunkInfo['challenges']['Extra'] && Object.keys(chunkInfo['challenges']['Extra']).filter((name) => { return chunkInfo['challenges']['Extra'][name].hasOwnProperty('Permanent') && !chunkInfo['challenges']['Extra'][name]['Permanent'] }).forEach(name => {
        delete chunkInfo['challenges']['Extra'][name];
    });

    // Secondary MTA
    if (!!chunkInfo['challenges']['Magic'] && !!chunkInfo['challenges']['Magic']['Participate in all parts of the ~|Magic Training Arena|~']) {
        chunkInfo['challenges']['Magic']['Participate in all parts of the ~|Magic Training Arena|~']['forcedPrimary'] = !rules['Secondary MTA'];
    }

    // Max Cape
    if (rules['Skillcape'] && !!chunks && chunks.hasOwnProperty('11063')) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        valids['Extra']['Buy the ~|Max cape|~%2E Nerd%2E'] = 'Skillcapes';
        if (!chunkInfo['challenges']['Extra']) {
            chunkInfo['challenges']['Extra'] = {};
        }
        chunkInfo['challenges']['Extra']['Buy the ~|Max cape|~%2E Nerd%2E'] = {
            'Category': ['Skillcape'],
            'Chunks': ['11063'],
            'ChunksDetails': ['11063'],
            'Label': 'Skillcapes',
            'Output': 'Max cape',
            'TotalLevelNeeded': 2772,
            'Permanent': false
        }
    }

    // Questpoints Cape
    if (!!chunks && chunks.hasOwnProperty('12338')) {
        if (!valids['Nonskill']) {
            valids['Nonskill'] = {};
        }
        valids['Nonskill']['Buy the quest point cape*'] = 'Skillcapes';
        if (!chunkInfo['challenges']['Nonskill']) {
            chunkInfo['challenges']['Nonskill'] = {};
        }
        let totalQuestPoints = 0;
        !!chunkInfo['challenges'] && !!chunkInfo['challenges']['Quest'] && Object.keys(chunkInfo['challenges']['Quest']).filter(task => chunkInfo['challenges']['Quest'][task].hasOwnProperty('QuestPoints')).forEach(task => {
            totalQuestPoints += chunkInfo['challenges']['Quest'][task]['QuestPoints'];
        });
        chunkInfo['challenges']['Nonskill']['Buy the quest point cape*'] = {
            'Chunks': ['12338'],
            'ChunksDetails': ['12338'],
            'Output': 'Quest point cape (t)',
            'QuestPointsNeeded': totalQuestPoints,
            'Permanent': false,
            "Not F2P": true
        }
    }

    let tempSkills;
    if (rules['F2P'] && rules['Skiller']) {
        tempSkills = [...f2pSkills.filter(x => !combatSkills.includes(x) && x !== 'Combat' && x !== 'Slayer'), 'Nonskill', 'Quest', 'Extra'];
    } else if (rules['F2P']) {
        tempSkills = [...f2pSkills, 'Nonskill', 'Quest', 'Extra'];
    } else if (rules['Skiller']) {
        tempSkills = [...skillNames.filter(x => !combatSkills.includes(x) && x !== 'Combat' && x !== 'Slayer'), 'Nonskill', 'Quest', 'Extra'];
    } else {
        tempSkills = [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'];
    }

    let doneTempSkillItems = false;

    !!chunkInfo['challenges'] && tempSkills.filter(skill => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] > 0 }).forEach(skill => {
        doneTempSkillItems = false;
        tempItemSkill[skill] = {};
        tempMultiStepSkill[skill] = {};
        valids[skill] = {};
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return (((chunkInfo['challenges'][skill][a].hasOwnProperty('Description') - chunkInfo['challenges'][skill][b].hasOwnProperty('Description')) === 0) ? chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] : (chunkInfo['challenges'][skill][a].hasOwnProperty('Description') - chunkInfo['challenges'][skill][b].hasOwnProperty('Description'))) }).forEach(name => {
            if (!chunkInfo['challenges'][skill][name].hasOwnProperty('Priority') && (skill === 'Quest' || skill === 'Diary')) {
                chunkInfo['challenges'][skill][name]['Priority'] = -1;
            }
            wrongThings = [];
            !!chunkInfo['challenges'][skill][name]['Category'] && chunkInfo['challenges'][skill][name]['Category'].filter((category) => { return maybePrimary.includes(category) }).forEach(category => {
                chunkInfo['challenges'][skill][name]['Primary'] = rules[category] && chunkInfo['challenges'][skill][name]['Primary'];
            });
            let validChallenge = true;
            let tempSecondary = false;
            if (!!chunkInfo['challenges'][skill][name]['ManualInvalid'] && chunkInfo['challenges'][skill][name]['ManualInvalid']) {
                validChallenge = false;
                wrongThings.push('Manual');
                nonValids[name] = wrongThings;
                return;
            }
            chunkInfo['challenges'][skill][name]['ItemsDetails'] = [];
            chunkInfo['challenges'][skill][name]['ObjectsDetails'] = [];
            chunkInfo['challenges'][skill][name]['MonstersDetails'] = [];
            chunkInfo['challenges'][skill][name]['NPCsDetails'] = [];
            chunkInfo['challenges'][skill][name]['ChunksDetails'] = [];
            chunkInfo['challenges'][skill][name]['Skill RequirementsDetails'] = [];
            chunkInfo['challenges'][skill][name]['Skill Requirements'] = [];

            
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills')) {
                chunkInfo['challenges'][skill][name]['Skill Requirements'].push(...Object.keys(chunkInfo['challenges'][skill][name]['Skills']).map((key) => chunkInfo['challenges'][skill][name]['Skills'][key] + ' ' + key));
                chunkInfo['challenges'][skill][name]['Skill RequirementsDetails'].push(...Object.keys(chunkInfo['challenges'][skill][name]['Skills']).map((key) => chunkInfo['challenges'][skill][name]['Skills'][key] + ' ' + key))
            }

            delete chunkInfo['challenges'][skill][name]['NeverShow'];
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Not F2P') && rules['F2P']) {
                validChallenge = false;
                wrongThings.push('F2P');
                nonValids[name] = wrongThings;
                return;
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('QuestPointsNeeded')) {
                if (!questPointTotal || (questPointTotal < chunkInfo['challenges'][skill][name]['QuestPointsNeeded'])) {
                    validChallenge = false;
                    wrongThings.push('QPS');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (!!chunkInfo['challenges'][skill][name]['KudosNeeded']) {
                if (kudosTotal < chunkInfo['challenges'][skill][name]['KudosNeeded']) {
                    validChallenge = false;
                    wrongThings.push('Kudos');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('TotalLevelNeeded')) {
                if (possibleSkillTotal < chunkInfo['challenges'][skill][name]['TotalLevelNeeded']) {
                    validChallenge = false;
                    wrongThings.push('Total Level');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('CombatLevelNeeded')) {
                let combatExists = combatSkills.filter((skill2) => { return checkPrimaryMethod(skill2, valids, baseChunkData) }).length > 0;
                if (!combatExists) {
                    validChallenge = false;
                    wrongThings.push('Combat Level');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (skill === 'Extra' && chunkInfo['challenges'][skill][name].hasOwnProperty('Set')) {
                if (!!backlog[skill] && backlog[skill].hasOwnProperty(name)) {
                    validChallenge = false;
                    wrongThings.push('Set outclassed');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            !!chunkInfo['challenges'][skill][name]['Category'] && Object.keys(rules).forEach(rule => {
                if (chunkInfo['challenges'][skill][name]['Category'].includes(rule) && !maybePrimary.includes(rule) && !rules[rule] && (rule !== 'Secondary Primary' || secondaryPrimaryNum === "1/1")) {
                    validChallenge = false;
                    wrongThings.push(rule);
                    return;
                }
                if (rule === 'Collection Log Clues' && chunkInfo['challenges'][skill][name]['Category'].includes('Collection Log Clues') && rules[rule]) {
                    if (!clueTasksPossible.hasOwnProperty(name.split(' ')[0].substring(1).toLowerCase()) || !clueTasksPossible[name.split(' ')[0].substring(1).toLowerCase()]) {
                        validChallenge = false;
                        wrongThings.push('Collection Log Clues');
                        nonValids[name] = wrongThings;
                        return;
                    }
                }
                if (rule === 'Shortcut Task' && chunkInfo['challenges'][skill][name]['Category'].includes('Shortcut') && !rules[rule] && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                    /*validChallenge = false;
                    wrongThings.push('Shortcut');
                    nonValids[name] = wrongThings;
                    return;*/
                    chunkInfo['challenges'][skill][name]['NeverShow'] = true;
                }
                if (rule === 'InsidePOH' && chunkInfo['challenges'][skill][name]['Category'].includes('InsidePOH Primary') && !rules[rule] && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                    validChallenge = false;
                    wrongThings.push('InsidePOH Primary');
                    nonValids[name] = wrongThings;
                    return;
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            if (!!slayerLocked && skill === 'Slayer' && chunkInfo['challenges'][skill][name]['Level'] > slayerLocked['level']) {
                let stillLocked = true;
                if (!!chunkInfo['codeItems']['slayerTasks'] && chunkInfo['codeItems']['slayerTasks'].hasOwnProperty(slayerLocked['monster'])) {
                    (!!chunkInfo['codeItems']['slayerTasks'][slayerLocked['monster']] && Object.keys(chunkInfo['codeItems']['slayerTasks'][slayerLocked['monster']]).filter((monster) => { return !!baseChunkData['monsters'] && baseChunkData['monsters'].hasOwnProperty(monster) }).length > 0) && (stillLocked = false);
                }
                if (stillLocked) {
                    validChallenge = false;
                    wrongThings.push('Slayer Locked');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (!doneTempSkillItems && chunkInfo['challenges'][skill][name].hasOwnProperty('Description')) {
                Object.keys(tempItemSkill[skill]).forEach(item => {
                    if (rules["Highest Level"]) {
                        !!items[item] && tempItemSkill[skill][item].forEach(name => {
                            valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                        });
                    } else {
                        let lowestItem;
                        let lowestName;
                        !!items[item] && tempItemSkill[skill][item].forEach(name => {
                            let challenge = chunkInfo['challenges'][skill][name];
                            if (!!challenge && !!challenge['Output']) {
                                if (!extraOutputItems[skill]) {
                                    extraOutputItems[skill] = {};
                                }
                                extraOutputItems[skill][name] = challenge['Output'];
                            }
                            if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                                lowestItem = challenge;
                                lowestName = name;
                            } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                                lowestItem = challenge;
                                lowestName = name;
                            }
                        });
                        !!lowestName && (valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level']);
                    }
                });
                doneTempSkillItems = true;
            }
            !!chunkInfo['challenges'][skill][name]['Chunks'] && chunkInfo['challenges'][skill][name]['Chunks'].forEach(chunkId => {
                if (chunkId.includes('+')) {
                    if (chunkId.includes('+x')) {
                        let xNum = parseInt(chunkId.split('+x')[1]);
                        let xResults = 0;
                        let xChunkId = chunkId.split('+x')[0] + '+';
                        if (!chunksPlus[xChunkId]) {
                            validChallenge = false;
                            wrongThings.push(xChunkId);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                            return;
                        } else {
                            let tempValid = false;
                            Object.keys(chunks).forEach(cName => {
                                if (chunksPlus[xChunkId].filter((plus) => { return plus === cName }).length > 0) {
                                    tempValid = true;
                                }
                                xResults += chunksPlus[xChunkId].filter((plus) => { return plus === cName }).length;
                            });
                            if (!tempValid || xResults < xNum) {
                                validChallenge = false;
                                wrongThings.push(xChunkId);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                                return;
                            } else {
                                chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                            }
                        }
                    } else {
                        if (!chunksPlus[chunkId]) {
                            validChallenge = false;
                            wrongThings.push(chunkId);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                            return;
                        } else {
                            let tempValid = false;
                            Object.keys(chunks).forEach(cName => {
                                if (chunksPlus[chunkId].filter((plus) => { return plus === cName }).length > 0) {
                                    tempValid = true;
                                }
                            });
                            if (!tempValid) {
                                validChallenge = false;
                                wrongThings.push(chunkId);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                                return;
                            } else {
                                chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                            }
                        }
                    }
                } else {
                    let tempValid = false;
                    Object.keys(chunks).filter((cName) => { return chunkId === cName }).forEach(cName => {
                        tempValid = true;
                    });
                    if (!tempValid) {
                        validChallenge = false;
                        wrongThings.push(chunkId);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            let missingItems = [];
            let savedValid = validChallenge;
            let savedSecondary = tempSecondary;
            let staffItems = {};
            !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach(item => {
                let secondary = item.includes('*');
                if (item.replaceAll(/\*/g, '').includes('+')) {
                    if (item.includes('+x')) {
                        let xNum = parseInt(item.split('+x')[1]);
                        let xResults = 0;
                        let xItem = item.split('+x')[0] + '+';
                        if (!itemsPlus[xItem.replaceAll(/\*/g, '')]) {
                            validChallenge = false;
                            wrongThings.push(xItem);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            return;
                        } else {
                            let tempValid = false;
                            let tempTempValid = false;
                            let multiValid = false;
                            itemsPlus[xItem.replaceAll(/\*/g, '')].forEach(plus => {
                                if (!!items[plus] && (!chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][name]['NonShop'] || !onlyShop(items[plus]))) {
                                    tempValid = true;
                                    xResults++;
                                    Object.keys(items[plus]).forEach(source => {
                                        if (xItem.includes('*')) {
                                            if (!items[plus][source].includes('secondary-') || (items[plus][source].includes('primary-') && (!items[plus][source].includes('-Farming') || rules['Farming Primary'])) || items[plus][source] === 'shop') {
                                                secondary = false;
                                            } else if (xItem === 'Air rune+*') {
                                                if (!!items['Staff of air']) {
                                                    secondary = false;
                                                }
                                            }
                                        }
                                    });
                                    if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                                        (Object.keys(items[plus]).filter((source) => { return !items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer' }).length > 0) && (tempTempValid = true);
                                    } else {
                                        tempTempValid = true;
                                    }
                                }
                                if (rules['Multi Step Processing']) {
                                    if (!items[plus] || Object.keys(items[plus]).filter(source => !items[plus][source].includes('-') || items[plus][source].split('-')[0] !== 'multi').length > 0 || ((!combatSkills.includes(skill) || chunkInfo['challenges'][skill][name].hasOwnProperty('Not Equip')) && skill !== 'Extra')) {
                                        multiValid = true;
                                    }
                                }
                            });
                            !tempTempValid && (tempValid = false);
                            if (!tempValid || xResults < xNum) {
                                validChallenge = false;
                                wrongThings.push(item);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                                return;
                            } else {
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            }
                            if (!multiValid && rules['Multi Step Processing']) {
                                validChallenge = false;
                                wrongThings.push('multi');
                                nonValids[name] = wrongThings;
                                return;
                            }
                        }
                    } else {
                        if (!itemsPlus[item.replaceAll(/\*/g, '')]) {
                            validChallenge = false;
                            wrongThings.push(item);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            return;
                        } else {
                            let tempValid = false;
                            let tempTempValid = false;
                            let multiValid = false;
                            itemsPlus[item.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] && (!chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][name]['NonShop'] || !onlyShop(items[plus])) }).forEach(plus => {
                                tempValid = true;
                                item.includes('*') && Object.keys(items[plus]).forEach(source => {
                                    if (!items[plus][source].includes('secondary-') || (items[plus][source].includes('primary-') && (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary'])) || items[plus][source] === 'shop') {
                                        secondary = false;
                                    } else if (item === 'Air rune+*') {
                                        if (!!items['Staff of air']) {
                                            secondary = false;
                                        }
                                    }
                                });
                                if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                                    (Object.keys(items[plus]).filter((source) => { return !items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer' }).length > 0) && (tempTempValid = true);
                                } else {
                                    tempTempValid = true;
                                }
                                if (rules['Multi Step Processing']) {
                                    if (!items[plus] || Object.keys(items[plus]).filter(source => !items[plus][source].includes('-') || items[plus][source].split('-')[0] !== 'multi').length > 0 || ((!combatSkills.includes(skill) || chunkInfo['challenges'][skill][name].hasOwnProperty('Not Equip')) && skill !== 'Extra')) {
                                        multiValid = true;
                                    }
                                }
                            });
                            !tempTempValid && (tempValid = false);
                            if (!tempValid) {
                                validChallenge = false;
                                wrongThings.push(item);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                                return;
                            } else {
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            }
                            if (!multiValid && rules['Multi Step Processing']) {
                                validChallenge = false;
                                wrongThings.push('multi');
                                nonValids[name] = wrongThings;
                                return;
                            }
                        }
                    }
                    if ((skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) || ((skill === 'Quest' || skill === 'Diary') && (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills') && chunkInfo['challenges'][skill][name]['Skills'].hasOwnProperty('Magic')) && (chunkInfo['challenges'][skill][name]['Items'].some(e => /.+ rune\+/g.test(e))))) {
                        missingItems.push(item);
                    }
                } else {
                    if ((!items[item.replaceAll(/\*/g, '')] && (!items[item.replaceAll(/\*/g, '') + '*'] || combatSkills.includes(skill))) || (chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') && chunkInfo['challenges'][skill][name]['NonShop'] && onlyShop(items[item.replaceAll(/\*/g, '')]))) {
                        validChallenge = false;
                        wrongThings.push(item);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                        return;
                    } else {
                        let tempItem = item.replaceAll(/\*/g, '');
                        if (items.hasOwnProperty(item.replaceAll(/\*/g, '') + '*') && !combatSkills.includes(skill)) {
                            tempItem += '*';
                        }
                        chunkInfo['challenges'][skill][name]['ItemsDetails'].push(tempItem);
                        if (item.includes('*') && !!items[tempItem]) {
                            (Object.keys(items[tempItem]).filter((source) => { return (!items[tempItem][source].includes('-Farming') || rules['Farming Primary']) && (!items[tempItem][source].includes('secondary-') || (items[tempItem][source].includes('primary-') && !processingSkill[items[tempItem][source].split('-')[1]]) || items[tempItem][source] === 'shop' )}).length > 0) && (secondary = false);
                        }
                        if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                            let tempTempValid = false;
                            Object.keys(items[tempItem]).forEach(source => {
                                if (!items[tempItem][source].includes('-') || !skillNames.includes(items[tempItem][source].split('-')[1]) || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[tempItem][source].split('-')[1] === 'Slayer') {
                                    tempTempValid = true;
                                } else if (chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks')) {
                                    let questDiaryValid = false;
                                    (Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).filter((subTask) => { return subTask.split('--').length > 1 && subTask.split('--')[0] === name && (subTask.split('--')[1] === 'Quest' || subTask.split('--')[1] === 'Diary') }).length > 0) && (questDiaryValid = true);
                                    questDiaryValid && (tempTempValid = true);
                                }
                            });
                            !tempTempValid && (validChallenge = false);
                            !tempTempValid && (wrongThings.push(item));
                            if (!tempTempValid) {
                                nonValids[name] = wrongThings;
                                return;
                            };
                        }
                        if (rules['Multi Step Processing']) {
                            if (!!items[tempItem] && Object.keys(items[tempItem]).filter(source => !items[tempItem][source].includes('-') || items[tempItem][source].split('-')[0] !== 'multi').length === 0 && (((combatSkills.includes(skill) && !chunkInfo['challenges'][skill][name].hasOwnProperty('Not Equip')) || skill === 'Extra') || (chunkInfo['challenges'][skill][name]['Level'] < chunkInfo['challenges'][items[tempItem][Object.keys(items[tempItem]).filter(source => items[tempItem][source].includes('-') && items[tempItem][source].split('-')[0] === 'multi')[0]].split('-')[1]][Object.keys(items[tempItem]).filter(source => items[tempItem][source].includes('-') && items[tempItem][source].split('-')[0] === 'multi')[0]]['Level']))) {
                                validChallenge = false;
                                wrongThings.push('multi');
                                nonValids[name] = wrongThings;
                                return;
                            }
                        }
                    }
                    if ((skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) || ((skill === 'Quest' || skill === 'Diary') && (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills') && chunkInfo['challenges'][skill][name]['Skills'].hasOwnProperty('Magic')) && (chunkInfo['challenges'][skill][name]['Items'].some(e => /.+ rune\+/g.test(e))))) {
                        missingItems.push(item);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            if (missingItems.length > 0) {
                let potentialValid = true;
                let potentialSecondary = false;
                let missingRunes = [];
                missingItems.forEach(it => {
                    let itSecondary = true;
                    if (it.replaceAll(/\*/g, '').includes('+')) {
                        if (!itemsPlus[it.replaceAll(/\*/g, '')]) {
                            if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                missingRunes.push(it);
                            } else {
                                potentialValid = false;
                            }
                        } else {
                            let tempValid = false;
                            itemsPlus[it.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] }).forEach(plus => {
                                tempValid = true;
                                if (it.includes('*')) {
                                    (Object.keys(items[plus]).filter((source) => { return !items[plus][source].includes('secondary-') || items[plus][source].includes('primary-') || items[plus][source] === 'shop' }).length > 0) && (itSecondary = false);
                                }
                            });
                            if (!tempValid) {
                                if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                    missingRunes.push(it);
                                } else {
                                    potentialValid = false;
                                }
                            }
                        }
                    } else {
                        if (!items[it.replaceAll(/\*/g, '')]) {
                            if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                missingRunes.push(it);
                            } else {
                                potentialValid = false;
                            }
                        } else {
                            if (it.includes('*')) {
                                (Object.keys(items[it.replaceAll(/\*/g, '')]).filter((source) => { return !items[it.replaceAll(/\*/g, '')][source].includes('secondary-') || items[it.replaceAll(/\*/g, '')][source].includes('primary-') || items[it.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0) && (itSecondary = false);
                            }
                        }
                    }
                    itSecondary && (potentialSecondary = true);
                });
                if (missingRunes.length === 1) {
                    let rune = missingRunes[0].replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                    let foundStaff = false;
                    Object.keys(elementalStaves).filter((staff) => { return elementalStaves[staff].includes(rune) && !!items[staff] && !foundStaff }).forEach(staff => {
                        staffItems[rune] = {};
                        staffItems[rune][staff] =  'primary-staff';
                        foundStaff = true;
                        if (staff !== 'Staff of air') {
                            potentialSecondary = true;
                        }
                    });
                    if (!foundStaff) {
                        potentialValid = false;
                        potentialSecondary = true;
                    }
                } else if (missingRunes.length === 2) {
                    let foundStaff = false;
                    Object.keys(elementalStaves).forEach(staff => {
                        let matchingStaff = true;
                        missingRunes.forEach(rune => {
                            rune = rune.replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                            if (!elementalStaves[staff].includes(rune)) {
                                matchingStaff = false;
                            }
                        });
                        if (matchingStaff && !!items[staff] && !foundStaff) {
                            missingRunes.forEach(rune => {
                                staffItems[rune] = {};
                                staffItems[rune][staff] =  'primary-staff';
                            });
                            foundStaff = true;
                        }
                    });
                    if (!foundStaff) {
                        potentialValid = false;
                        potentialSecondary = true;
                    }
                }
                !potentialValid ? (validChallenge = false) : (validChallenge = savedValid);
                !potentialValid && wrongThings.push('potentialValid');
                potentialSecondary ? (tempSecondary = true) : (tempSecondary = savedSecondary);
                if (!potentialValid) {
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Objects'] && chunkInfo['challenges'][skill][name]['Objects'].forEach(object => {
                let secondary = true;
                if (object.includes('+')) {
                    if (!objectsPlus[object]) {
                        validChallenge = false;
                        wrongThings.push(object);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        return;
                    } else {
                        let tempValid = false;
                        objectsPlus[object].filter((plus) => { return !!objects[plus] }).forEach(plus => {
                            tempValid = true;
                            (Object.keys(objects[plus.replaceAll(/\*/g, '')]).filter((source) => { return !source.includes('secondary-') }).length > 0) && (secondary = false);
                        });
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(object);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        }
                    }
                } else {
                    if (!objects[object]) {
                        validChallenge = false;
                        wrongThings.push(object);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        (Object.keys(objects[object]).filter((source) => { return !source.includes('secondary-') }).length > 0) && (secondary = false);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Monsters'] && chunkInfo['challenges'][skill][name]['Monsters'].forEach(monster => {
                if (monster.includes('+')) {
                    if (!monstersPlus[monster]) {
                        if (monster !== 'Monster+') {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return;
                        } else if (!monsters || Object.keys(monsters).length <= 0) {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return;
                        }
                    } else {
                        let tempValid = false;
                        monstersPlus[monster].filter((plus) => { return !!monsters[plus] }).length > 0 && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                        }
                    }
                } else {
                    if (!monsters[monster]) {
                        validChallenge = false;
                        wrongThings.push(monster);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['NPCs'] && chunkInfo['challenges'][skill][name]['NPCs'].forEach(npc => {
                if (npc.includes('+')) {
                    if (!npcsPlus[npc]) {
                        validChallenge = false;
                        wrongThings.push(npc);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        return;
                    } else {
                        let tempValid = false;
                        npcsPlus[npc].filter((plus) => { return !!npcs[plus] }).length > 0 && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(npc);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        }
                    }
                } else {
                    if (!npcs[npc]) {
                        validChallenge = false;
                        wrongThings.push(npc);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Mix'] && chunkInfo['challenges'][skill][name]['Mix'].forEach(mix => {
                if (mix.includes('+')) {
                    if (!mixPlus[mix]) {
                        validChallenge = false;
                        wrongThings.push(mix);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        return;
                    } else {
                        let tempValid = false;
                        mixPlus[mix].filter((plus) => { return !!monsters[plus] || !!npcs[plus] }).length > 0 && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(mix);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        }
                    }
                } else {
                    if (!monsters[mix] && !npcs[mix]) {
                        validChallenge = false;
                        wrongThings.push(mix);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            chunkInfo['challenges'][skill][name]['Secondary'] = tempSecondary;
            chunkInfo['challenges'][skill][name]['forcedPrimary'] && chunkInfo['challenges'][skill][name]['Secondary'] && (validChallenge = false);
            chunkInfo['challenges'][skill][name]['ManualValid'] && (validChallenge = true);
            if (validChallenge) {
                delete nonValids[name];
                if (!processingSkill.hasOwnProperty(skill) || !processingSkill[skill] || !chunkInfo['challenges'][skill][name]['Items'] || chunkInfo['challenges'][skill][name]['Items'].filter(item => { return !tools[item.replaceAll(/\*/g, '')] }).length === 0 || (chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).filter((subChallenge) => { return subChallenge.includes('--') }).length > 0) || chunkInfo['challenges'][skill][name]['ManualNonProcessing']) {
                    if (skill !== 'Quest' && skill !== 'Diary') {
                        valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'] || chunkInfo['challenges'][skill][name]['Label'] || true;
                    } else {
                        valids[skill][name] = true;
                    }
                } else {
                    let itemList = [];
                    !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach(item => {
                        itemList.push(item);
                    });
                    !!staffItems && Object.keys(staffItems).forEach(item => {
                        if (!tempItemSkill[skill][item]) {
                            tempItemSkill[skill][item] = [];
                        }
                        tempItemSkill[skill][item].push(name);
                    });
                    let index = 0;
                    let listDone = false;
                    let thingsAdded = false;
                    let nonskillGlobalTracker = {};
                    while (!listDone) {
                        let item = itemList[index++];
                        if (item.replaceAll(/\*/g, '').includes('+')) {
                            !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] && (!Object.values(items[plus]).includes('primary-Farming') || rules['Farming Primary']) && !tools[plus] && (skill !== 'Magic' || !magicTools[plus]) }).forEach(plus => {
                                let nonskill = {};
                                let tempNonValid = true;
                                let tempValidHard = false;
                                !!items[plus] && Object.keys(items[plus]).filter(source => !nonskillGlobalTracker.hasOwnProperty(plus) || !nonskillGlobalTracker[plus].hasOwnProperty(source)).forEach(source => {
                                    if (items[plus][source].includes('Nonskill') && !source.includes('*')) {
                                        if (!nonskill['Nonskill']) {
                                            nonskill['Nonskill'] = {};
                                        }
                                        nonskill['Nonskill'][source] = true;
                                    } else if ((!skillNames.includes(items[plus][source].split('-')[1])) && processingSkill[skill] && !source.includes('*') && processingSkill[items[plus][source].split('-')[1]]) {
                                        if (!nonskill[items[plus][source].split('-')[1]]) {
                                            nonskill[items[plus][source].split('-')[1]] = {};
                                        }
                                        nonskill[items[plus][source].split('-')[1]][source] = true;
                                    }
                                    if ((!processingSkill[items[plus][source].split('-')[1]] || rules['Multi Step Processing']) && (!items[plus][source].includes('-Farming') || rules['Farming Primary'])) {
                                        tempNonValid = false;
                                        if (!nonskill.hasOwnProperty('Nonskill') || !nonskill['Nonskill'].hasOwnProperty(source)) {
                                            tempValidHard = true;
                                        }
                                    } else if (!items[plus][source].includes('-Farming') || rules['Farming Primary']) {
                                        tempMultiStepSkill[skill][name] = true;
                                    }
                                });
                                if (Object.keys(nonskill).length > 0 && !tempValidHard) {
                                    !!nonskill && Object.keys(nonskill).filter((skill) => { return !!nonskill[skill] }).forEach(skill => {
                                        Object.keys(nonskill[skill]).filter((src) => { return !!chunkInfo['challenges'][skill][src] && !!chunkInfo['challenges'][skill][src]['Items'] }).forEach(src => {
                                            chunkInfo['challenges'][skill][src]['Items'].forEach(it => {
                                                itemList.push(it);
                                                if (!nonskillGlobalTracker[plus]) {
                                                    nonskillGlobalTracker[plus] = {};
                                                }
                                                nonskillGlobalTracker[plus][src] = true;
                                            });
                                        });
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][plus]) {
                                        tempItemSkill[skill][plus] = [];
                                    }
                                    tempItemSkill[skill][plus].push(name);
                                    thingsAdded = true;
                                }
                            });
                        } else {
                            if (!!items && !tools[item.replaceAll(/\*/g, '')] && !!items[item.replaceAll(/\*/g, '')] && (skill !== 'Magic' || !magicTools[item.replaceAll(/\*/g, '')])) {
                                let nonskill = {};
                                let tempNonValid = true;
                                let tempValidHard = false;
                                !!items[item.replaceAll(/\*/g, '')] && Object.keys(items[item.replaceAll(/\*/g, '')]).filter(source => !nonskillGlobalTracker.hasOwnProperty(item) || !nonskillGlobalTracker[item].hasOwnProperty(source)).forEach(source => {
                                    if (items[item.replaceAll(/\*/g, '')][source].includes('-') && items[item.replaceAll(/\*/g, '')][source].split('-')[0] === 'multi') {
                                        return;
                                    }
                                    if (items[item.replaceAll(/\*/g, '')][source].includes('Nonskill') && !source.includes('*')) {
                                        if (!nonskill['Nonskill']) {
                                            nonskill['Nonskill'] = {};
                                        }
                                        nonskill['Nonskill'][source] = true;
                                    } else if ((!skillNames.includes(items[item.replaceAll(/\*/g, '')][source].split('-')[1])) && processingSkill[skill] && !source.includes('*') && processingSkill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]]) {
                                        if (!nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]]) {
                                            nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]] = {};
                                        }
                                        nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]][source] = true;
                                    }
                                    if ((!processingSkill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Multi Step Processing']) && (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary'])) {
                                        tempNonValid = false;
                                        if (!nonskill.hasOwnProperty('Nonskill') || !nonskill['Nonskill'].hasOwnProperty(source)) {
                                            tempValidHard = true;
                                        }
                                    } else if (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary']) {
                                        tempMultiStepSkill[skill][name] = true;
                                    }
                                });
                                if (Object.keys(nonskill).length > 0 && !tempValidHard) {
                                    !!nonskill && Object.keys(nonskill).filter((skill) => { return !!nonskill[skill] }).forEach(skill => {
                                        Object.keys(nonskill[skill]).filter((src) => { return !!chunkInfo['challenges'][skill][src] && !!chunkInfo['challenges'][skill][src]['Items'] }).forEach(src => {
                                            chunkInfo['challenges'][skill][src]['Items'].forEach(it => {
                                                itemList.push(it);
                                                if (!nonskillGlobalTracker[item]) {
                                                    nonskillGlobalTracker[item] = {};
                                                }
                                                nonskillGlobalTracker[item][src] = true;
                                            });
                                        });
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][item.replaceAll(/\*/g, '')]) {
                                        tempItemSkill[skill][item.replaceAll(/\*/g, '')] = [];
                                    }
                                    tempItemSkill[skill][item.replaceAll(/\*/g, '')].push(name);
                                    thingsAdded = true;
                                }
                            }
                        }
                        listDone = itemList.length <= index;
                    };
                    if (!thingsAdded) {
                        //valids[skill][name] = false;
                    }
                }
            } else {
                nonValids[name] = wrongThings;
                if (chunkInfo['challenges'][skill][name].hasOwnProperty('Output') && items.hasOwnProperty(chunkInfo['challenges'][skill][name]['Output'])) {
                    Object.keys(items[chunkInfo['challenges'][skill][name]['Output']]).filter((source) => { return source === name }).forEach(source => {
                        delete items[chunkInfo['challenges'][skill][name]['Output']][source];
                    });
                    if (Object.keys(items[chunkInfo['challenges'][skill][name]['Output']]).length < 1) {
                        delete items[chunkInfo['challenges'][skill][name]['Output']];
                    }
                }
            }
        });
    });
    let tempStorage = [];
    !!tempItemSkill && Object.keys(tempItemSkill).forEach(skill => {
        !!tempItemSkill[skill] && Object.keys(tempItemSkill[skill]).forEach(item => {
            tempStorage = [];
            if (rules["Highest Level"]) {
                !!items[item] && tempItemSkill[skill][item].forEach(name => {
                    valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                });
            } else {
                let lowestItem;
                let lowestName;
                rules['Multi Step Processing'] && !!items[item] && tempItemSkill[skill][item].length > 1 && tempItemSkill[skill][item].forEach(Xname => {
                    if (skill === 'Fletching' && chunkInfo['challenges'][skill].hasOwnProperty(Xname) && chunkInfo['challenges'][skill][Xname].hasOwnProperty('Items')) {
                        chunkInfo['challenges'][skill][Xname]['Items'].filter(tempItem => !!items[tempItem]).forEach(tempItem => {
                            if (Object.values(items[tempItem]).filter(src => !src.includes('multi-')).length === 0 && tempItemSkill[skill][item].filter(yName => yName !== Xname).length > 0) {
                                tempItemSkill[skill][item] = tempItemSkill[skill][item].filter(yName => yName !== Xname);
                            }
                        });
                    }
                });
                !!items[item] && tempItemSkill[skill][item].forEach(name => {
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (!!challenge && challenge['AlwaysValid']) {
                        tempStorage.push(name);
                    }
                    if (!!challenge && !!challenge['Output']) {
                        if (!extraOutputItems[skill]) {
                            extraOutputItems[skill] = {};
                        }
                        extraOutputItems[skill][name] = challenge['Output'];
                    }
                    if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                        lowestItem = challenge;
                        lowestName = name;
                    } else if (lowestItem['Level'] === challenge['Level'] && (!lowestItem['Primary'] || lowestItem['Secondary']) && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem.hasOwnProperty('Priority'))) {
                        lowestItem = challenge;
                        lowestName = name;
                    }
                });
                if (!!lowestName) {
                    valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level'];
                    if (!tempAlwaysGlobal[skill]) {
                        tempAlwaysGlobal[skill] = {};
                    }
                    if (!tempAlwaysGlobal[skill][lowestName]) {
                        tempAlwaysGlobal[skill][lowestName] = {};
                    }
                    !!tempStorage && tempStorage.forEach(tempName => {
                        tempAlwaysGlobal[skill][lowestName][tempName] = chunkInfo['challenges'][skill][tempName]['Level'];
                    });
                }
            }
        });
        doneTempSkillItems = true;
    });
    // Kill X
    if (rules['Kill X']) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        Object.keys(monsters).filter((monster) => { return (!chunkInfo['slayerMonsters'].hasOwnProperty(monster) || (checkPrimaryMethod('Slayer', valids, baseChunkData) && (!slayerLocked || (chunkInfo['slayerMonsters'][monster] <= slayerLocked['level']))) || (!!passiveSkill && passiveSkill.hasOwnProperty('Slayer') && passiveSkill['Slayer'] >= chunkInfo['slayerMonsters'][monster])) && (!backlog['Extra'] || !backlog['Extra']['Kill X ~|' + monster + '|~']) }).sort().forEach(monster => {
            valids['Extra']['Kill X ~|' + monster + '|~'] = 'Kill X';
            if (!chunkInfo['challenges']['Extra']) {
                chunkInfo['challenges']['Extra'] = {};
            }
            chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~'] = {
                'Category': ['Kill X'],
                'Monsters': [monster],
                'MonstersDetails': [monster],
                'Label': 'Kill X',
                'Permanent': false
            }
            if (!!valids['Slayer'] && Object.keys(chunkInfo['challenges']['Slayer']).filter(name => chunkInfo['challenges']['Slayer'][name].hasOwnProperty('Output') && chunkInfo['challenges']['Slayer'][name]['Output'] === monster).length === 1) {
                chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~']['Tasks'] = {};
                chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~']['Tasks'][Object.keys(chunkInfo['challenges']['Slayer']).filter(name => chunkInfo['challenges']['Slayer'][name].hasOwnProperty('Output') && chunkInfo['challenges']['Slayer'][name]['Output'] === monster)[0]] = 'Slayer';
            }
        });
    }
    // Every Drop
    if (rules['Every Drop']) {
        let drops = {};
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!completedChallenges['Extra'] && Object.keys(completedChallenges['Extra']).filter((line) => { return line.match(/.*: ~\|.*\|~ \(.*\)/) }).forEach(line => {
            drops[line.split('|')[1]] = true;
        });
        Object.keys(items).filter((item) => { return !!items[item] }).sort().forEach(item => {
            !drops[item] && Object.keys(items[item]).filter((source) => { return (items[item][source].includes('-drop') || items[item][source].includes('-Slayer') || items[item][source].includes('-Thieving')) }).forEach(source => {
                let realSource = source.replaceAll('#', '%2F').replaceAll('.', '%2E');
                if (source.includes('Slay ')) {
                    let monster = chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    realSource = chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    Object.keys(chunkInfo['skillItems']['Slayer'][monster]).forEach(drop => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                                Object.keys(dropTables[drop]).filter((item) => { return (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) }).forEach(item => {
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(dropTables[drop][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('/')[1].split('@')[0]), drop.includes('GeneralSeedDropTable'));
                                });
                            });
                        } else {
                            !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster))) {
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][drop] = (chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                                }
                            });
                        }
                    });
                }
                if (items[item][source].includes('-Thieving') && chunkInfo['challenges']['Thieving'].hasOwnProperty(source.replaceAll('#', '%2F').replaceAll('.', '%2E')) && chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')].hasOwnProperty('Output')) {
                    let monster = chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    realSource = chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    !!chunkInfo['skillItems']['Thieving'][monster] && Object.keys(chunkInfo['skillItems']['Thieving'][monster]).forEach(drop => {
                        !!chunkInfo['skillItems']['Thieving'][monster][drop] && Object.keys(chunkInfo['skillItems']['Thieving'][monster][drop]).forEach(quantityDrop => {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) {
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                }
                if (!drops[item] && !!dropRatesGlobal[realSource] && !!dropRatesGlobal[realSource][item] && !dropTables.hasOwnProperty(item) && !item.includes('^')) {
                    drops[item] = true;
                    valids['Extra'][realSource.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + dropRatesGlobal[realSource][item].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = 'Every Drop';
                    if (!chunkInfo['challenges']['Extra']) {
                        chunkInfo['challenges']['Extra'] = {};
                    }
                    chunkInfo['challenges']['Extra'][realSource.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + dropRatesGlobal[realSource][item].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = {
                        'Category': ['Every Drop'],
                        'Items': [item],
                        'ItemsDetails': [item],
                        'Label': 'Every Drop',
                        'Permanent': false
                    }
                }
            });
        });
    }
    // All Droptables
    if (rules['All Droptables']) {
        let drops = {};
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!completedChallenges['Extra'] && Object.keys(completedChallenges['Extra']).filter((line) => { return line.match(/.*: .+ ~\|.*\|~ \(.*\) \(.*\)/) }).forEach(line => {
            if (!drops[line.split(':')[0]]) {
                drops[line.split(':')[0]] = {};
            }
            if (!drops[line.split(':')[0]][line.split('|')[1]]) {
                drops[line.split(':')[0]][line.split('|')[1]] = {};
            }
            drops[line.split(':')[0]][line.split('|')[1]][line.split(' ~')[0].split(': ')[1]] = true;
        });
        Object.keys(items).filter((item) => { return !!items[item] }).sort().forEach(item => {
            Object.keys(items[item]).filter((source) => { return items[item][source].includes('-Slayer') }).forEach(source => {
                let monster = chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                Object.keys(chunkInfo['skillItems']['Slayer'][monster]).forEach(drop => {
                    if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                        !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                            Object.keys(dropTables[drop]).filter((item) => { return (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) }).forEach(item => {
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][item]) {
                                    dropTablesGlobal[monster][item] = {};
                                }
                                !!dropTables[drop][item] && Object.keys(dropTables[drop][item]).forEach(quantity => {
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(dropTables[drop][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item][quantity].split('/')[1]), drop.includes('GeneralSeedDropTable'));
                                });
                            });
                        });
                    } else {
                        !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster))) {
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantityDrop] = (chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    }
                });
            });
            Object.keys(items[item]).filter((source) => { return items[item][source].includes('-Thieving') && chunkInfo['challenges']['Thieving'].hasOwnProperty(source.replaceAll('#', '%2F').replaceAll('.', '%2E')) && chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')].hasOwnProperty('Output') }).forEach(source => {
                let monster = chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                !!chunkInfo['skillItems']['Thieving'][monster] && Object.keys(chunkInfo['skillItems']['Thieving'][monster]).forEach(drop => {
                    !!chunkInfo['skillItems']['Thieving'][monster][drop] && Object.keys(chunkInfo['skillItems']['Thieving'][monster][drop]).forEach(quantityDrop => {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) {
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantityDrop] = (chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            });
        });
        Object.keys(dropTablesGlobal).forEach(monster => {
            dropTablesGlobal.hasOwnProperty(monster) && Object.keys(dropTablesGlobal[monster]).filter(item => { return !item.includes('^') }).forEach(item => {
                dropTablesGlobal[monster].hasOwnProperty(item) && Object.keys(dropTablesGlobal[monster][item]).forEach(quantity => {
                    if ((!drops[monster] || !drops[monster][item] || !drops[monster][item][quantity]) && !!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item] && !!dropTablesGlobal[monster][item][quantity] && !dropTables.hasOwnProperty(item)) {
                        if (!drops[monster]) {
                            drops[monster] = {};
                        }
                        if (!drops[monster][item]) {
                            drops[monster][item] = {};
                        }
                        drops[monster][item][quantity] = true;
                        valids['Extra'][monster.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = 'All Droptables';
                        if (!chunkInfo['challenges']['Extra']) {
                            chunkInfo['challenges']['Extra'] = {};
                        }
                        chunkInfo['challenges']['Extra'][monster.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = {
                            'Category': ['All Droptables'],
                            'Items': [item],
                            'ItemsDetails': [item],
                            'Monsters': [monster],
                            'MonstersDetails': [monster],
                            'Label': 'All Droptables',
                            'Permanent': false
                        }
                    }
                });
            });
        });
    }

    // All Shops
    if (rules['All Shops']) {
        !!baseChunkData['items'] && Object.keys(baseChunkData['items']).filter(item => { return Object.values(baseChunkData['items'][item]).includes('shop') && !item.includes('^^') }).forEach(item => {
            !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return baseChunkData['items'][item][source] === 'shop' }).forEach(source => {
                if (source.includes('~|') && source.includes('|~')) {
                    source = source.split('~|')[1].split('|~')[0];
                }
                valids['Extra'][source.replaceAll('#', '%2F').replaceAll('.', '%2E') + ': ~|' + item.replaceAll('*', '').replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~'] = 'All Shops';
                if (!chunkInfo['challenges']['Extra']) {
                    chunkInfo['challenges']['Extra'] = {};
                }
                chunkInfo['challenges']['Extra'][source.replaceAll('#', '%2F').replaceAll('.', '%2E') + ': ~|' + item.replaceAll('*', '').replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~'] = {
                    'Category': ['All Shops'],
                    'Items': [item],
                    'ItemsDetails': [item],
                    'Label': 'All Shops',
                    'Permanent': false
                }
            });
        });
    }

    //console.log(JSON.parse(JSON.stringify(tempItemSkill)));
    //console.log(JSON.parse(JSON.stringify(valids)));
    return [valids, tempItemSkill, tempMultiStepSkill];
}

// Checks if skill has primary training
let checkPrimaryMethod = function(skill, valids, baseChunkData) {
    let valid = false;
    let tempValid = false;
    !!universalPrimary[skill] && universalPrimary[skill].forEach(line => {
        let tempTempValid = true;
        if (line === 'Primary+') {
            let primaryValid = !!valids[skill] && Object.keys(valids[skill]).filter((challenge) => { return (((chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'])) && (chunkInfo['challenges'][skill][challenge]['Level'] === 1 || (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && chunkInfo['challenges'][skill][challenge]['Level'] <= passiveSkill[skill]) || ((!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && chunkInfo['challenges'][skill][challenge]['Level'] <= skillQuestXp[skill]['level']))) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || chunkInfo['challenges'][skill][challenge]['Manual']) && (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil') || baseChunkData['objects'].hasOwnProperty('Rusted anvil')) }).length > 0;
            !primaryValid && (tempTempValid = false);
        } else if (line === 'Monster+') {
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!monsterExists) {
                tempTempValid = false;
            }
        } else if (line === 'Bones+') {
            let bonesExists = !!baseChunkData['items'] && boneItems.filter((bone) => { return !!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(bone) }).length > 0;
            if (!bonesExists) {
                tempTempValid = false;
            }
        } else if (line === 'Combat+') {
            let combatExists = combatSkills.filter((skill2) => { return checkPrimaryMethod(skill2, valids, baseChunkData) }).length > 0;
            if (!combatExists) {
                tempTempValid = false;
            }
        } else if (line === 'Ranged+') {
            let validRanged = false;
            !!baseChunkData['items'] && Object.keys(chunkInfo['codeItems']['ammoTools']).every(ammoItem => {
                if (validRanged) {
                    return false;
                }
                let tempItem = ammoItem + '*';
                let ammoValid = true;
                if (ammoItem === 'No ammo') {
                    //
                } else {
                    if (tempItem.replaceAll(/\*/g, '').includes('+')) {
                        if (!itemsPlus[tempItem.replaceAll(/\*/g, '')]) {
                            ammoValid = false;
                            return;
                        } else {
                            let tempSecondary = true;
                            itemsPlus[tempItem.replaceAll(/\*/g, '')].filter((plus) => { return !!baseChunkData['items'][plus] }).forEach(plus => {
                                if (!!baseChunkData['items'][plus.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][plus.replaceAll(/\*/g, '')]).filter((source) => { return (!baseChunkData['items'][plus.replaceAll(/\*/g, '')][source].includes('secondary-') && (!processingSkill[baseChunkData['items'][plus.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || (baseChunkData['items'][plus.replaceAll(/\*/g, '')][source]['primary-'] && (!processingSkill[baseChunkData['items'][plus.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || baseChunkData['items'][plus.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0) {
                                    tempSecondary = false;
                                }
                            });
                            tempSecondary && (ammoValid = false);
                        }
                    } else {
                        if (!!baseChunkData['items'] && !Object.keys(baseChunkData['items']).includes(tempItem.replaceAll(/\*/g, ''))) {
                            ammoValid = false;
                        } else {
                            let tempSecondary = !(!!baseChunkData['items'][tempItem.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][tempItem.replaceAll(/\*/g, '')]).filter((source) => { return (!baseChunkData['items'][tempItem.replaceAll(/\*/g, '')][source].includes('secondary-') && (!processingSkill[baseChunkData['items'][tempItem.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || (baseChunkData['items'][tempItem.replaceAll(/\*/g, '')][source]['primary-'] && (!processingSkill[baseChunkData['items'][tempItem.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || baseChunkData['items'][tempItem.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0);
                            tempSecondary && (ammoValid = false);
                        }
                    }
                }
                if (ammoValid) {
                    let innerValid = false;
                    Object.keys(chunkInfo['codeItems']['ammoTools'][ammoItem]).every(item => {
                        if (!!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(item.replaceAll(/\*/g, ''))) {
                            if (rangedItems.hasOwnProperty(item.replaceAll(/\*/g, '')) && (rangedItems[item.replaceAll(/\*/g, '')] === 1 || (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill['Ranged'] > 1 && rangedItems[item.replaceAll(/\*/g, '')] <= passiveSkill['Ranged']) || ((!!skillQuestXp && skillQuestXp.hasOwnProperty('Ranged') && rangedItems[item.replaceAll(/\*/g, '')] <= skillQuestXp['Ranged']['level'])))) {
                                if (item.includes('*')) {
                                    let tempSecondary = !(!!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).filter((source) => { return (!baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('secondary-') && (!processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || (baseChunkData['items'][item.replaceAll(/\*/g, '')][source]['primary-'] && (!processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0);
                                    !tempSecondary && (innerValid = true);
                                } else {
                                    innerValid = true;
                                }
                            }
                        }
                        if (innerValid) {
                            validRanged = true;
                            return false;
                        }
                        return true;
                    });
                }
                return true;
            });
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!validRanged || !monsterExists) {
                tempTempValid = false;
            }
        } else {
            tempTempValid = false;
        }
        if (tempTempValid) {
            tempValid = true;
        }
    });
    !universalPrimary[skill] && (tempValid = true);
    if (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0) {
        Object.keys(manualTasks[skill]).forEach(challenge => {
            let primaryValid = false;
            if (((chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || (chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Manual'])) {
                if (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil') || baseChunkData['objects'].hasOwnProperty('Rusted anvil')) {
                    primaryValid = true;
                }
            }
            primaryValid && (tempValid = true);
        });
    }
    valid = tempValid;
    return valid;
}

// Calcs the BIS gear
let calcBIS = function() {
    let combatStyles = ['Melee', 'Ranged', 'Magic'];
    let primarySkill = {};
    skillNames.forEach(skill => {
        primarySkill[skill] = checkPrimaryMethod(skill, globalValids, baseChunkData) || (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0);
    });
    if (rules['Show Best in Slot Prayer Tasks']) {
        combatStyles.push('Prayer');
    }
    if (rules['Show Best in Slot Defensive Tasks']) {
        combatStyles.push('Melee Tank');
        combatStyles.push('Ranged Tank');
        combatStyles.push('Magic Tank');
    }
    if (rules['Show Best in Slot Weight Tasks']) {
        combatStyles.push('Weight Reducing');
    }
    if (rules['Show Best in Slot Melee Style Tasks']) {
        combatStyles.splice(combatStyles.indexOf('Melee'), 1, 'Stab', 'Slash', 'Crush');
    }
    if (!globalValids['BiS']) {
        globalValids['BiS'] = {};
    }
    let completedEquipment = {};
    !!completedChallenges['BiS'] && Object.keys(completedChallenges['BiS']).forEach(equipLine => {
        let equip = equipLine.split('|')[1].charAt(0).toUpperCase() + equipLine.split('|')[1].slice(1);
        completedEquipment[equip.replaceAll(/\%2J/g, '+')] = chunkInfo['equipment'][equip.replaceAll(/\%2J/g, '+')];
    });
    !!checkedChallenges['BiS'] && Object.keys(checkedChallenges['BiS']).forEach(equipLine => {
        let equip = equipLine.split('|')[1].charAt(0).toUpperCase() + equipLine.split('|')[1].slice(1);
        completedEquipment[equip.replaceAll(/\%2J/g, '+')] = chunkInfo['equipment'][equip.replaceAll(/\%2J/g, '+')];
    });
    if (Object.keys(chunks).length > 0) {
        baseChunkData['items']['Unarmed'] = {'Built-in': 'secondary-Nonskill'};
    }
    let notFresh = {};
    highestOverall = {};
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    combatStyles.forEach(skill => {
        let bestEquipment = {};
        let bestEquipmentAlts = {};
        let bestAmmoSaved = {
            'main hand weapon': null,
            '2h weapon': null
        };
        let savedWeaponBis = {};
        Object.keys({...completedEquipment, ...chunkInfo['equipment']}).filter(equip => { return !!baseChunkData['items'][equip] }).forEach(equip => {
            if (!!!chunkInfo['equipment'][equip]) {
                console.error(equip + " doesn't exist in data.");
                return;
            }
            let validWearable = true;
            !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                if ((rules['Skiller'] && chunkInfo['equipment'][equip].requirements[skill] > 1) || (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                }
            });
            !!chunkInfo['taskUnlocks'] && chunkInfo['taskUnlocks']['Items'].hasOwnProperty(equip) && chunkInfo['taskUnlocks']['Items'][equip].forEach(task => {
                if (!globalValids || !globalValids[Object.values(task)[0]] || !globalValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) {
                    validWearable = false;
                }
            });
            if ((!chunkInfo['equipment'][equip].hasOwnProperty('accuracy') || chunkInfo['equipment'][equip].accuracy === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('ability_damage') || chunkInfo['equipment'][equip].ability_damage === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('auto_damage') || chunkInfo['equipment'][equip].auto_damage === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('strength') || chunkInfo['equipment'][equip].strength === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('ranged') || chunkInfo['equipment'][equip].ranged === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('magic') || chunkInfo['equipment'][equip].magic === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('armour') || chunkInfo['equipment'][equip].armour === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('lp') || chunkInfo['equipment'][equip].lp === 0) &&
            (!chunkInfo['equipment'][equip].hasOwnProperty('prayer') || chunkInfo['equipment'][equip].prayer === 0)) {
                validWearable = false;
            }
            if (validWearable) {
                if (skill === 'Melee' && (chunkInfo['equipment'][equip].class === 'melee' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && ((chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0) || equip === 'Unarmed')) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && ((chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0) || equip === 'Unarmed')) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if (chunkInfo['equipment'][equip].strength >= 0) {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) && (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Stab' && (chunkInfo['equipment'][equip].class === 'melee' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].speed > 0) {
                        if (chunkInfo['equipment'][equip].style === 'stab' && (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && (chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (chunkInfo['equipment'][equip].style === 'stab' && (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && (chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if (chunkInfo['equipment'][equip].strength >= 0) {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) && (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Slash' && (chunkInfo['equipment'][equip].class === 'melee' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].speed > 0) {
                        if (chunkInfo['equipment'][equip].style === 'slash' && (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && (chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (chunkInfo['equipment'][equip].style === 'slash' && (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && (chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if (chunkInfo['equipment'][equip].strength >= 0) {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) && (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Crush' && (chunkInfo['equipment'][equip].class === 'melee' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].speed > 0) {
                        if (chunkInfo['equipment'][equip].style === 'crush' && (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && (chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (chunkInfo['equipment'][equip].style === 'crush' && (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && (chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if (chunkInfo['equipment'][equip].strength >= 0) {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) && (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].strength) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Ranged' && (chunkInfo['equipment'][equip].class === 'ranged' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].speed > 1) {
                        let bestAmmo = null;
                        Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) }).forEach(ammo => {
                            if (ammo === 'No ammo') {
                                //
                            } else {
                                if (ammo.replaceAll(/\*/g, '').includes('+')) {
                                    !!itemsPlus[ammo.replaceAll(/\*/g, '')] && itemsPlus[ammo.replaceAll(/\*/g, '')].filter((plus) => { return !!baseChunkData['items'][plus] }).forEach(plus => {
                                        if (bestAmmo === null || chunkInfo['equipment'][plus].ability_damage > chunkInfo['equipment'][bestAmmo].ability_damage) {
                                            let tempTempValidAmmo = false;
                                            !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).forEach(source => {
                                                if (!baseChunkData['items'][plus][source].includes('-') || !processingSkill[baseChunkData['items'][plus][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][plus][source].split('-')[1] === 'Slayer') {
                                                    tempTempValidAmmo = true;
                                                }
                                            });
                                            let articleAmmo = vowels.includes(plus.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                            articleAmmo = (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === 's' || (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === ')' && plus.toLowerCase().split('(')[0].trim().charAt(plus.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                            tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + plus.toLowerCase() + '|~')) && (bestAmmo = plus);
                                        } else if (chunkInfo['equipment'][plus].ability_damage === chunkInfo['equipment'][bestAmmo].ability_damage) {
                                            let tempTempValidAmmo = false;
                                            !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).forEach(source => {
                                                if (!baseChunkData['items'][plus][source].includes('-') || !processingSkill[baseChunkData['items'][plus][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][plus][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][plus][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][plus][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][plus][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                                    tempTempValidAmmo = true;
                                                }
                                            });
                                            let articleAmmo = vowels.includes(plus.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                            articleAmmo = (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === 's' || (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === ')' && plus.toLowerCase().split('(')[0].trim().charAt(plus.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                            if (tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + plus.toLowerCase() + '|~'))) {
                                                if (!bestEquipmentAlts[chunkInfo['equipment'][plus].slot]) {
                                                    bestEquipmentAlts[chunkInfo['equipment'][plus].slot] = {};
                                                }
                                                bestEquipmentAlts[chunkInfo['equipment'][plus].slot][plus] = bestAmmo;
                                            }
                                        }
                                    });
                                } else if (chunkInfo['equipment'].hasOwnProperty(ammo)) {
                                    if (bestAmmo === null || chunkInfo['equipment'][ammo].ability_damage > chunkInfo['equipment'][bestAmmo].ability_damage) {
                                        let tempTempValidAmmo = false;
                                        !!baseChunkData['items'][ammo] && Object.keys(baseChunkData['items'][ammo]).forEach(source => {
                                            if (!baseChunkData['items'][ammo][source].includes('-') || !processingSkill[baseChunkData['items'][ammo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][ammo][source].split('-')[1] === 'Slayer') {
                                                tempTempValidAmmo = true;
                                            }
                                        });
                                        let articleAmmo = vowels.includes(ammo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === 's' || (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === ')' && ammo.toLowerCase().split('(')[0].trim().charAt(ammo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                        tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase() + '|~')) && (bestAmmo = ammo);
                                    } else if (chunkInfo['equipment'][ammo].ability_damage === chunkInfo['equipment'][bestAmmo].ability_damage) {
                                        let tempTempValidAmmo = false;
                                        !!baseChunkData['items'][ammo] && Object.keys(baseChunkData['items'][ammo]).forEach(source => {
                                            if (!baseChunkData['items'][ammo][source].includes('-') || !processingSkill[baseChunkData['items'][ammo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][ammo][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][ammo][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][ammo][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][ammo][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                                tempTempValidAmmo = true;
                                            }
                                        });
                                        let articleAmmo = vowels.includes(ammo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === 's' || (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === ')' && ammo.toLowerCase().split('(')[0].trim().charAt(ammo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                        if (tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase() + '|~'))) {
                                            if (!bestEquipmentAlts[chunkInfo['equipment'][ammo].slot]) {
                                                bestEquipmentAlts[chunkInfo['equipment'][ammo].slot] = {};
                                            }
                                            bestEquipmentAlts[chunkInfo['equipment'][ammo].slot][ammo] = bestAmmo;
                                        }
                                    }
                                }
                            }
                        });
                        if (!(Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) }).length > 0) || bestAmmo !== null || (Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) }).length === 1 && Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) })[0] === 'No ammo')) {
                            if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage + (!!bestAmmo ? chunkInfo['equipment'][bestAmmo].ability_damage : 0)) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage + (!!bestAmmoSaved[chunkInfo['equipment'][equip].slot] ? chunkInfo['equipment'][bestAmmoSaved[chunkInfo['equipment'][equip].slot]].ability_damage : 0)))) && chunkInfo['equipment'][equip].ability_damage > 0) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                                if (!!bestAmmo && tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    let tempTempValidAmmo = false;
                                    Object.keys(baseChunkData['items'][bestAmmo]).forEach(source => {
                                        if (!baseChunkData['items'][bestAmmo][source].includes('-') || !processingSkill[baseChunkData['items'][bestAmmo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][bestAmmo][source].split('-')[1] === 'Slayer') {
                                            tempTempValidAmmo = true;
                                        }
                                    });
                                    let articleAmmo = vowels.includes(bestAmmo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                    articleAmmo = (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === 's' || (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === ')' && bestAmmo.toLowerCase().split('(')[0].trim().charAt(bestAmmo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                    tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase() + '|~')) && (bestAmmoSaved[chunkInfo['equipment'][equip].slot] = bestAmmo);
                                } else if (bestEquipment[chunkInfo['equipment'][equip].slot] === equip) {
                                    delete bestAmmoSaved[chunkInfo['equipment'][equip].slot];
                                }
                            } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage + (!!bestAmmo ? chunkInfo['equipment'][bestAmmo].ability_damage : 0)) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage + (!!bestAmmoSaved[chunkInfo['equipment'][equip].slot] ? chunkInfo['equipment'][bestAmmoSaved[chunkInfo['equipment'][equip].slot]].ability_damage : 0)))) && chunkInfo['equipment'][equip].ability_damage > 0) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                    if (!!bestAmmo) {
                                        let tempTempValidAmmo = false;
                                        Object.keys(baseChunkData['items'][bestAmmo]).forEach(source => {
                                            if (!baseChunkData['items'][bestAmmo][source].includes('-') || !processingSkill[baseChunkData['items'][bestAmmo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][bestAmmo][source].split('-')[1] === 'Slayer') {
                                                tempTempValidAmmo = true;
                                            }
                                        });
                                        let articleAmmo = vowels.includes(bestAmmo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === 's' || (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === ')' && bestAmmo.toLowerCase().split('(')[0].trim().charAt(bestAmmo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                        if (tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase() + '|~'))) {
                                            if (!bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot]) {
                                                bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot] = {};
                                            }
                                            bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot][bestAmmo] = bestAmmoSaved[chunkInfo['equipment'][equip].slot];
                                        }
                                    } else {
                                        delete bestEquipmentAlts['ammo'];
                                    }
                                }
                            }
                        }
                    } else {
                        if (chunkInfo['equipment'][equip].ranged >= 0 && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].ranged > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged) && (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Magic' && (chunkInfo['equipment'][equip].class === 'magic' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && ((chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0) || equip === 'Unarmed')) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].accuracy + chunkInfo['equipment'][equip].ability_damage) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].accuracy + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ability_damage))) && ((chunkInfo['equipment'][equip].accuracy > 0 && chunkInfo['equipment'][equip].ability_damage > 0) || equip === 'Unarmed')) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if (chunkInfo['equipment'][equip].magic >= 0) {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic) && (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic) &&
                            (chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                            (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Prayer') {
                    if (chunkInfo['equipment'][equip].prayer > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].prayer > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].prayer)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (chunkInfo['equipment'][equip].slot === 'ammo') && (bestAmmoSaved['weapon'] = equip);
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (chunkInfo['equipment'][equip].slot === 'ammo') && (bestAmmoSaved['2h'] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].prayer === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].prayer)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Melee Tank' && (chunkInfo['equipment'][equip].class === 'melee' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].strength >= 0 && (chunkInfo['equipment'][equip].armour + chunkInfo['equipment'][equip].lp) > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                        (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                        (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Ranged Tank' && (chunkInfo['equipment'][equip].class === 'ranged' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].strength >= 0 && (chunkInfo['equipment'][equip].armour + chunkInfo['equipment'][equip].lp) > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                        (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                        (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Magic Tank' && (chunkInfo['equipment'][equip].class === 'magic' || chunkInfo['equipment'][equip].class === 'hybrid' || chunkInfo['equipment'][equip].class === 'all' || chunkInfo['equipment'][equip].class === 'none')) {
                    if (chunkInfo['equipment'][equip].strength >= 0 && (chunkInfo['equipment'][equip].armour + chunkInfo['equipment'][equip].lp) > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].armour > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                        (chunkInfo['equipment'][equip].lp > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((chunkInfo['equipment'][equip].armour === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].armour) &&
                        (chunkInfo['equipment'][equip].lp === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].lp)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Weight Reducing') {
                    if (chunkInfo['equipment'][equip].hasOwnProperty('weight')) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].weight < chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].weight)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].weight === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].weight)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                }
            }
        });
        let twoHPower = 0;
        let weaponShieldPower = 0;
        let offHandPower = 0;
        let shieldPower = 0;
        if (skill === 'Melee') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].accuracy + chunkInfo['equipment'][bestEquipment['2h weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy) / 2) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].accuracy;
            }
        } else if (skill === 'Stab') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].accuracy + chunkInfo['equipment'][bestEquipment['2h weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy) / 2) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].accuracy;
            }
        } else if (skill === 'Slash') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].accuracy + chunkInfo['equipment'][bestEquipment['2h weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy) / 2) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].accuracy;
            }
        } else if (skill === 'Crush') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].accuracy + chunkInfo['equipment'][bestEquipment['2h weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy) / 2) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].accuracy;
            }
        } else if (skill === 'Ranged') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].accuracy + chunkInfo['equipment'][bestEquipment['2h weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy) / 2) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].accuracy;
            }
        } else if (skill === 'Magic') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].accuracy + chunkInfo['equipment'][bestEquipment['2h weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy) / 2) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['main hand weapon']].ability_damage;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].accuracy + chunkInfo['equipment'][bestEquipment['off-hand weapon']].ability_damage;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].accuracy;
            }
        } else if (skill === 'Prayer') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].prayer;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].prayer + chunkInfo['equipment'][bestEquipment['off-hand weapon']].prayer;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].prayer;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].prayer;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].prayer;
            }
        } else if (skill === 'Melee Tank') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].armour + chunkInfo['equipment'][bestEquipment['2h weapon']].lp;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['main hand weapon']].armour + chunkInfo['equipment'][bestEquipment['off-hand weapon']].armour) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].lp + chunkInfo['equipment'][bestEquipment['off-hand weapon']].lp);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].armour + chunkInfo['equipment'][bestEquipment['main hand weapon']].lp;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].armour + chunkInfo['equipment'][bestEquipment['off-hand weapon']].lp;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].armour + chunkInfo['equipment'][bestEquipment['off-hand']].lp;
            }
        } else if (skill === 'Ranged Tank') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].armour + chunkInfo['equipment'][bestEquipment['2h weapon']].lp;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['main hand weapon']].armour + chunkInfo['equipment'][bestEquipment['off-hand weapon']].armour) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].lp + chunkInfo['equipment'][bestEquipment['off-hand weapon']].lp);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].armour + chunkInfo['equipment'][bestEquipment['main hand weapon']].lp;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].armour + chunkInfo['equipment'][bestEquipment['off-hand weapon']].lp;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].armour + chunkInfo['equipment'][bestEquipment['off-hand']].lp;
            }
        } else if (skill === 'Magic Tank') {
            if (bestEquipment.hasOwnProperty('2h weapon')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h weapon']].armour + chunkInfo['equipment'][bestEquipment['2h weapon']].lp;
            }
            if (bestEquipment.hasOwnProperty('main hand weapon')) {
                if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['main hand weapon']].armour + chunkInfo['equipment'][bestEquipment['off-hand weapon']].armour) + (chunkInfo['equipment'][bestEquipment['main hand weapon']].lp + chunkInfo['equipment'][bestEquipment['off-hand weapon']].lp);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['main hand weapon']].armour + chunkInfo['equipment'][bestEquipment['main hand weapon']].lp;
                }
            }
            if (bestEquipment.hasOwnProperty('off-hand weapon')) {
                offHandPower = chunkInfo['equipment'][bestEquipment['off-hand weapon']].armour + chunkInfo['equipment'][bestEquipment['off-hand weapon']].lp;
            }
            if (bestEquipment.hasOwnProperty('off-hand')) {
                shieldPower = chunkInfo['equipment'][bestEquipment['off-hand']].armour + chunkInfo['equipment'][bestEquipment['off-hand']].lp;
            }
        }
        if (twoHPower > weaponShieldPower) {
            if (rules['Show Best in Slot 1H and 2H']) {
                savedWeaponBis['main hand weapon'] = bestEquipment['main hand weapon'];
                savedWeaponBis['off-hand weapon'] = bestEquipment['off-hand weapon'];
            }
            delete bestEquipment['main hand weapon'];
            delete bestEquipment['off-hand weapon'];
            bestEquipment['ammo'] = bestAmmoSaved['2h weapon'];
        } else {
            if (rules['Show Best in Slot 1H and 2H']) {
                savedWeaponBis['2h weapon'] = bestEquipment['2h weapon'];
            }
            delete bestEquipment['2h weapon'];
            bestEquipment['ammo'] = bestAmmoSaved['main hand weapon'];
        }
        if (shieldPower > offHandPower) {
            if (rules['Show Best in Slot Shield']) {
                savedWeaponBis['off-hand weapon'] = bestEquipment['off-hand weapon'];
            }
            delete bestEquipment['off-hand weapon'];
            bestEquipment['ammo'] = bestAmmoSaved['off-hand'];
        } else {
            if (rules['Show Best in Slot Shield']) {
                savedWeaponBis['off-hand'] = bestEquipment['off-hand'];
            }
            delete bestEquipment['off-hand'];
            bestEquipment['ammo'] = bestAmmoSaved['off-hand weapon'];
        }
        if (!bestEquipment['ammo'] || bestEquipment['ammo'] === null || bestEquipment['ammo'] === undefined) {
            delete bestEquipment['ammo'];
        }
        let bestDps = -1;
        let resultingAdditions = {};
        let validWearable;
        let tempEquipment;
        if (skill === 'Melee') {
            // Non-set DPS
            let equipment_bonus = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
            if (bestDps === -1) {
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 });
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.05;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Superior Void Melee
            validWearable = true;
            tempEquipment = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.07;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Stab') {
            // Non-set DPS
            let equipment_bonus = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
            if (bestDps === -1) {
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 });
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.05;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Superior Void Melee
            validWearable = true;
            tempEquipment = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.07;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Slash') {
            // Non-set DPS
            let equipment_bonus = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
            if (bestDps === -1) {
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 });
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.05;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Superior Void Melee
            validWearable = true;
            tempEquipment = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.07;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Crush') {
            // Non-set DPS
            let equipment_bonus = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
            if (bestDps === -1) {
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 });
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void knight melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.05;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Superior Void Melee
            validWearable = true;
            tempEquipment = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.07;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Ranged') {
            // Non-set DPS
            let equipment_bonus = { 'accuracy': 0, 'ability_damage': 0, 'ranged': 0 };
            if (bestDps === -1) {
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].ranged || 0 });
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void knight ranger helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void knight ranger helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'ranged': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].ranged || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['ranged'] += chunkInfo['equipment'][item].ranged || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.05;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['ranged'] > equipment_bonus['ranged'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Superior Void Melee
            validWearable = true;
            tempEquipment = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.07;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Magic') {
            // Non-set DPS
            let equipment_bonus = { 'accuracy': 0, 'ability_damage': 0, 'magic': 0 };
            if (bestDps === -1) {
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus['magic'] += chunkInfo['equipment'][bestEquipment[slot]].magic || 0 });
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void knight mage helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void knight mage helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'magic': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['magic'] += chunkInfo['equipment'][bestEquipment[slot]].magic || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['magic'] += chunkInfo['equipment'][item].magic || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.05;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['magic'] > equipment_bonus['magic'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Superior Void Melee
            validWearable = true;
            tempEquipment = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Superior void knight melee helm', 'Superior void knight top', 'Superior void knight robe', 'Superior void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_set = { 'accuracy': 0, 'ability_damage': 0, 'strength': 0 };
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][bestEquipment[slot]].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][bestEquipment[slot]].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][bestEquipment[slot]].strength || 0 } });
                    itemList.forEach(item => { equipment_bonus_set['accuracy'] += chunkInfo['equipment'][item].accuracy || 0; equipment_bonus_set['ability_damage'] += chunkInfo['equipment'][item].ability_damage || 0; equipment_bonus_set['strength'] += chunkInfo['equipment'][item].strength || 0 });
                    equipment_bonus_set['accuracy'] *= 1.03;
                    equipment_bonus_set['ability_damage'] *= 1.07;
                    if ((equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] > equipment_bonus['accuracy'] + equipment_bonus['ability_damage']) || (equipment_bonus_set['accuracy'] + equipment_bonus_set['ability_damage'] === equipment_bonus['accuracy'] + equipment_bonus['ability_damage'] && equipment_bonus_set['strength'] > equipment_bonus['strength'])) {
                        bestDps = 1;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        }
        Object.keys(resultingAdditions).forEach(slot => {
            bestEquipment[slot] = resultingAdditions[slot];
            delete bestEquipmentAlts[slot];
        });
        rules['Show Best in Slot 1H and 2H'] && !!savedWeaponBis && Object.keys(savedWeaponBis).filter(slot => !!savedWeaponBis[slot]).forEach(slot => {
            bestEquipment[slot] = savedWeaponBis[slot];
        });
        rules['Show Best in Slot Shield'] && !!savedWeaponBis && Object.keys(savedWeaponBis).filter(slot => !!savedWeaponBis[slot]).forEach(slot => {
            bestEquipment[slot] = savedWeaponBis[slot];
        });
        Object.keys(bestEquipment).forEach(slot => {
            if (slot === '2h weapon' && !rules['Show Best in Slot 1H and 2H']) {
                highestOverall[skill.replaceAll(' ', '_') + '-main hand weapon'] = bestEquipment[slot];
                highestOverall[skill.replaceAll(' ', '_') + '-off-hand weapon'] = 'N/A';
            } else {
                highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = bestEquipment[slot];
            }
            if (slot === 'off-hand' && !rules['Show Best in Slot Shield']) {
                highestOverall[skill.replaceAll(' ', '_') + '-off-hand weapon'] = bestEquipment[slot];
            } else {
                highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = bestEquipment[slot];
            }
            let article = vowels.includes(bestEquipment[slot].toLowerCase().charAt(0)) ? ' an ' : ' a ';
            article = (bestEquipment[slot].toLowerCase().charAt(bestEquipment[slot].toLowerCase().length - 1) === 's' || (bestEquipment[slot].toLowerCase().charAt(bestEquipment[slot].toLowerCase().length - 1) === ')' && bestEquipment[slot].toLowerCase().split('(')[0].trim().charAt(bestEquipment[slot].toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
            if (!!globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']) {
                globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = skill + '/​' + globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'];
            } else {
                globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = skill + ' BiS ' + slot;
            }
            if (!chunkInfo['challenges']['BiS']) {
                chunkInfo['challenges']['BiS'] = {};
            }
            if (!!chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] && notFresh['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']) {
                chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = {
                    'ItemsDetails': [bestEquipment[slot]],
                    'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span>/​' + chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']['Label']
                }
            } else {
                chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = {
                    'ItemsDetails': [bestEquipment[slot]],
                    'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span> BiS ' + slot
                }
                notFresh['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = true;
            }
        });
        Object.keys(bestEquipmentAlts).forEach(slot => {
            Object.keys(bestEquipmentAlts[slot]).forEach(item => {
                if (!!altChallenges['BiS']) {
                    if ((slot === '2h weapon' && altChallenges['BiS'].hasOwnProperty(skill.replaceAll(' ', '_') + '-main hand weapon') && altChallenges['BiS'][skill.replaceAll(' ', '_') + '-main hand weapon'] === item.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) || (altChallenges['BiS'].hasOwnProperty(skill.replaceAll(' ', '_') + '-' + slot) && altChallenges['BiS'][skill.replaceAll(' ', '_') + '-' + slot] === item.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))) {
                        if (slot === '2h weapon' && !rules['Show Best in Slot 1H and 2H']) {
                            highestOverall[skill.replaceAll(' ', '_') + '-main hand weapon'] = item;
                            highestOverall[skill.replaceAll(' ', '_') + '-off-hand weapon'] = 'N/A';
                        } else {
                            highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = item;
                        }
                    }
                    if ((slot === 'off-hand' && altChallenges['BiS'].hasOwnProperty(skill.replaceAll(' ', '_') + '-off-hand weapon') && altChallenges['BiS'][skill.replaceAll(' ', '_') + '-off-hand weapon'] === item.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) || (altChallenges['BiS'].hasOwnProperty(skill.replaceAll(' ', '_') + '-' + slot) && altChallenges['BiS'][skill.replaceAll(' ', '_') + '-' + slot] === item.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))) {
                        if (slot === 'off-hand' && !rules['Show Best in Slot Shield']) {
                            highestOverall[skill.replaceAll(' ', '_') + '-off-hand weapon'] = item;
                        } else {
                            highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = item;
                        }
                    }
                }
                if (bestEquipmentAlts[slot][item] === bestEquipment[slot]) {
                    let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                    article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                    if (type === 'current') {
                        if (!!globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~']) {
                            globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = skill + '/​' + globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'];
                            if (Object.values(highestOverall).includes(item)) {
                                if (slot === '2h weapon' && !rules['Show Best in Slot 1H and 2H']) {
                                    highestOverall[skill.replaceAll(' ', '_') + '-main hand weapon'] = item;
                                    highestOverall[skill.replaceAll(' ', '_') + '-off-hand weapon'] = 'N/A';
                                } else if (slot === 'off-hand' && !rules['Show Best in Slot Shield']) {
                                        highestOverall[skill.replaceAll(' ', '_') + '-off-hand weapon'] = item;
                                } else {
                                    highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = item;
                                }
                            }
                        } else {
                            globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = skill + ' BiS ' + slot;
                        }
                    }
                    if (!chunkInfo['challenges']['BiS']) {
                        chunkInfo['challenges']['BiS'] = {};
                    }
                    if (!!chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] && notFresh['Obtain' + article + '~|' + item.toLowerCase() + '|~']) {
                        chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = {
                            'ItemsDetails': [item],
                            'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span>/​' + chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~']['Label']
                        }
                    } else {
                        chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = {
                            'ItemsDetails': [item],
                            'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span> BiS ' + slot
                        }
                        notFresh['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = true;
                    }
                }
            });
        });
        !!bestEquipment && Object.keys(bestEquipment).forEach(slot => {
            !!bestEquipmentAlts && bestEquipmentAlts.hasOwnProperty(slot) && Object.keys(bestEquipmentAlts[slot]).filter(itTemp => bestEquipmentAlts[slot][itTemp] === bestEquipment[slot]).forEach(itTemp => {
                if (!bestEquipmentAltsGlobal.hasOwnProperty(skill + ' BiS ' + slot)) {
                    bestEquipmentAltsGlobal[skill + ' BiS ' + slot] = [];
                }
                bestEquipmentAltsGlobal[skill + ' BiS ' + slot].push(itTemp);
            });
            if (bestEquipmentAltsGlobal.hasOwnProperty(skill + ' BiS ' + slot)) {
                bestEquipmentAltsGlobal[skill + ' BiS ' + slot].unshift(bestEquipment[slot]);
            }
        });
        //console.log(bestEquipment);
    });
}

// Calcs the current challenges to be displayed
let calcCurrentChallenges2 = function() {
    let tempChallengeArr = {};
    let highestChallenge = {};
    let highestChallengeLevelArr = {};
    let realLevel = {};

    Object.keys(globalValids).forEach(skill => {
        realLevel[skill] = [];
        if (skill !== 'Extra' && skill !== 'Quest' && skill !== 'Diary' && skill !== 'BiS') {
            highestChallengeLevelArr[skill] = 0;
            !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
                if (chunkInfo['challenges'][skill].hasOwnProperty(name) && chunkInfo['challenges'][skill][name]['Level'] > highestChallengeLevelArr[skill]) {
                    if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoBoost')) {
                        let bestBoost = 0;
                        let ownsCrystalSaw = false;
                        Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                            if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                if (boost !== 'Crystal saw') {
                                    if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                                        let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                        let possibleBoost = Math.floor(globalValids[skill][name] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        possibleBoost = Math.floor((globalValids[skill][name] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        if (possibleBoost > bestBoost) {
                                            bestBoost = possibleBoost;
                                        }
                                    } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                        bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                    }
                                } else if (skill === 'Construction') {
                                    if (chunkInfo['challenges'][skill][name].hasOwnProperty('Items') && chunkInfo['challenges'][skill][name]['Items'].includes('Saw+')) {
                                        ownsCrystalSaw = true;
                                    }
                                }
                            }
                        });
                        highestChallengeLevelArr[skill] = chunkInfo['challenges'][skill][name]['Level'] - (bestBoost + (ownsCrystalSaw ? 3 : 0));
                        highestOverall[skill] = name + `{${(bestBoost + (ownsCrystalSaw ? 3 : 0))}}`;
                    } else {
                        highestChallengeLevelArr[skill] = chunkInfo['challenges'][skill][name]['Level'];
                        highestOverall[skill] = name;
                    }
                }
            });
            let isPrimary = true || checkPrimaryMethod(skill, globalValids, baseChunkData);
            Object.keys(globalValids[skill]).forEach(challenge => {
                realLevel[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
                if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost')) {
                    let bestBoost = 0;
                    let ownsCrystalSaw = false;
                    Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                        if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                            if (boost !== 'Crystal saw') {
                                if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                                    let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                    let possibleBoost = Math.floor(globalValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    possibleBoost = Math.floor((globalValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    if (possibleBoost > bestBoost) {
                                        bestBoost = possibleBoost;
                                    }
                                } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                    bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                }
                            } else if (skill === 'Construction') {
                                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw+')) {
                                    ownsCrystalSaw = true;
                                }
                            }
                        }
                    });
                    realLevel[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'] - (bestBoost + (ownsCrystalSaw ? 3 : 0));
                }
                if (isPrimary || (manualTasks.hasOwnProperty(skill) && manualTasks[skill].hasOwnProperty(challenge))) {
                    if (globalValids[skill][challenge] !== false && (realLevel[skill][challenge] > highestChallengeLevelArr[skill]) && !chunkInfo['challenges'][skill][challenge]['NeverShow'] && (!completedChallenges[skill] || !completedChallenges[skill].hasOwnProperty(challenge))) {
                        if ((!highestChallenge[skill] || (realLevel[skill][challenge] > realLevel[skill][highestChallenge[skill]])) || ((!highestChallenge[skill] || (realLevel[skill][challenge] === realLevel[skill][highestChallenge[skill]])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'] || (!!chunkInfo['challenges'][skill][challenge]['Priority'] && chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])))) {
                            if (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) {
                                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                                    let tempValid = true;
                                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                        if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][challenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                            tempValid = false;
                                        }
                                    });
                                    if (tempValid) {
                                        highestChallenge[skill] = challenge;
                                    }
                                } else {
                                    highestChallenge[skill] = challenge;
                                }
                            } else if (tempAlwaysGlobal.hasOwnProperty(skill) && tempAlwaysGlobal[skill].hasOwnProperty(challenge)) {
                                Object.keys(tempAlwaysGlobal[skill][challenge]).sort((a, b) => { return a['Level'] - b['Level'] }).forEach(tempChallenge => {
                                    if (!backlog[skill] || !backlog[skill].hasOwnProperty(tempChallenge)) {
                                        if (!!chunkInfo['challenges'][skill][tempChallenge]['Skills']) {
                                            let tempValid = true;
                                            Object.keys(chunkInfo['challenges'][skill][tempChallenge]['Skills']).forEach(subSkill => {
                                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][tempChallenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                                    tempValid = false;
                                                }
                                            });
                                            if (tempValid) {
                                                highestChallenge[skill] = tempChallenge;
                                            }
                                        } else {
                                            highestChallenge[skill] = tempChallenge;
                                        }
                                    }
                                });
                            }
                        } else if ((!highestChallenge[skill] || (realLevel[skill][challenge] === realLevel[skill][highestChallenge[skill]])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Priority') || !chunkInfo['challenges'][skill][highestChallenge[skill]].hasOwnProperty('Priority') || (chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])) && chunkInfo['challenges'][skill][challenge]['Primary']) {
                            if (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) {
                                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                                    let tempValid = true;
                                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                        if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][challenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                            tempValid = false;
                                        }
                                    });
                                    if (tempValid) {
                                        highestChallenge[skill] = challenge;
                                    }
                                } else {
                                    highestChallenge[skill] = challenge;
                                }
                            } else if (tempAlwaysGlobal.hasOwnProperty(skill) && tempAlwaysGlobal[skill].hasOwnProperty(challenge)) {
                                Object.keys(tempAlwaysGlobal[skill][challenge]).sort((a, b) => { return a['Level'] - b['Level'] }).forEach(tempChallenge => {
                                    if (!backlog[skill] || !backlog[skill].hasOwnProperty(tempChallenge)) {
                                        if (!!chunkInfo['challenges'][skill][tempChallenge]['Skills']) {
                                            let tempValid = true;
                                            Object.keys(chunkInfo['challenges'][skill][tempChallenge]['Skills']).forEach(subSkill => {
                                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][tempChallenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                                    tempValid = false;
                                                }
                                            });
                                            if (tempValid) {
                                                highestChallenge[skill] = tempChallenge;
                                            }
                                        } else {
                                            highestChallenge[skill] = tempChallenge;
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            });
            (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]] || (realLevel[skill][highestChallenge[skill]] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary'])) && (highestChallenge[skill] = undefined);
            tempChallengeArr[skill] = highestChallenge[skill];
            highestCurrent[skill] = highestChallenge[skill];
            if (!!highestChallenge[skill] && !!chunkInfo['challenges'][skill][highestChallenge[skill]] && !!chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']) {
                Object.keys(chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']).forEach(subSkill => {
                    if ((!highestChallenge[subSkill] || chunkInfo['challenges'][subSkill][highestChallenge[subSkill]]['Level'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill]) && Object.keys(chunkInfo['challenges'][subSkill]).length > 0 && chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill] > highestChallengeLevelArr[subSkill]) {
                        highestChallenge[subSkill] = highestChallenge[skill];
                        tempChallengeArr[subSkill] = highestChallenge[subSkill];
                        highestCurrent[subSkill] = highestChallenge[subSkill];
                    }
                });
            }
        } else {
            Object.keys(globalValids[skill]).forEach(challenge => {
                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                    let tempValid = true;
                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                        let bestBoost = 0;
                        let ownsCrystalSaw = false;
                        if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(subSkill) && !chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('NoBoost') && (!completedChallenges[subSkill] || !completedChallenges[subSkill].hasOwnProperty(challenge))) {
                            Object.keys(chunkInfo['codeItems']['boostItems'][subSkill]).forEach(boost => {
                                if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                    if (boost !== 'Crystal saw') {
                                        if (typeof chunkInfo['codeItems']['boostItems'][subSkill][boost] === 'string') {
                                            let stringSplit = chunkInfo['codeItems']['boostItems'][subSkill][boost].split('%+');
                                            let possibleBoost = Math.floor(globalValids[subSkill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                            possibleBoost = Math.floor((globalValids[subSkill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                            if (possibleBoost > bestBoost) {
                                                bestBoost = possibleBoost;
                                            }
                                        } else if (chunkInfo['codeItems']['boostItems'][subSkill][boost] > bestBoost) {
                                            bestBoost = chunkInfo['codeItems']['boostItems'][subSkill][boost];
                                        }
                                    } else if (subSkill === 'Construction') {
                                        if (chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][subSkill][challenge]['Items'].includes('Saw+')) {
                                            ownsCrystalSaw = true;
                                            chunkInfo['challenges'][subSkill][challenge]['ItemsDetails'].push('Crystal saw');
                                        }
                                    }
                                }
                            });
                        }
                        if ((!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - (bestBoost + (ownsCrystalSaw ? 3 : 0))))) || (subSkill === 'Slayer' && !!slayerLocked && (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - (bestBoost + (ownsCrystalSaw ? 3 : 0))) > slayerLocked['level'])) {
                            tempValid = false;
                        }
                    });
                    if (!tempValid) {
                        delete globalValids[skill][challenge];
                    }
                }
            });
        }
    });
    Object.keys(tempChallengeArr).forEach(skill => {
        let challenge = tempChallengeArr[skill] || highestOverall[skill];
        !!challenge && (challenge = challenge.split('{')[0]);
        if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost') && (!completedChallenges[skill] || !completedChallenges[skill].hasOwnProperty(challenge))) {
            let bestBoost = 0;
            let bestBoostSource;
            let ownsCrystalSaw = false;
            Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                    if (boost !== 'Crystal saw') {
                        if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                            let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                            let possibleBoost = Math.floor(globalValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                            possibleBoost = Math.floor((globalValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                            if (possibleBoost > bestBoost) {
                                bestBoost = possibleBoost;
                                bestBoostSource = boost;
                            }
                        } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                            bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                            bestBoostSource = boost;
                        }
                    } else if (skill === 'Construction') {
                        if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw+')) {
                            ownsCrystalSaw = true;
                            chunkInfo['challenges'][skill][challenge]['ItemsDetails'].push('Crystal saw');
                        }
                    }
                }
            });
            if (bestBoost > 0) {
                let foundBetter = false;
                Object.keys(globalValids[skill]).forEach(name => {
                    if (chunkInfo['challenges'][skill].hasOwnProperty(name) && chunkInfo['challenges'][skill][name].hasOwnProperty('NoBoost') && chunkInfo['challenges'][skill][name]['Level'] > (globalValids[skill][challenge] - (bestBoost + (ownsCrystalSaw ? 3 : 0))) && (!backlog[skill] || !backlog[skill].hasOwnProperty(name))) {
                        tempChallengeArr[skill] = name;
                        foundBetter = true;
                    }
                });
                if (!foundBetter) {
                    if (highestOverall[skill] !== challenge) {
                        if (!chunkInfo['challenges'][skill][challenge].hasOwnProperty((bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details')) {
                            chunkInfo['challenges'][skill][challenge][(bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details'] = [];
                        }
                        chunkInfo['challenges'][skill][challenge][(bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details'].push(bestBoostSource.replaceAll(/\*/g, ''));
                        tempChallengeArr[skill] = challenge + `{${(bestBoost + (ownsCrystalSaw ? 3 : 0))}}`;
                    }
                    highestOverall[skill] = challenge + `{${(bestBoost + (ownsCrystalSaw ? 3 : 0))}}`;
                } else if (!!tempChallengeArr[skill]) {
                    highestOverall[skill] = tempChallengeArr[skill];
                    if (!!completedChallenges[skill] && completedChallenges[skill].hasOwnProperty(tempChallengeArr[skill])) {
                        tempChallengeArr[skill] = null;
                    }
                }
            } else if (!!tempChallengeArr[skill]) {
                highestOverall[skill] = tempChallengeArr[skill];
            }
        } else if (!!tempChallengeArr[skill]) {
            highestOverall[skill] = tempChallengeArr[skill];
        }
    });
    let didAddTasks = false;
    rules['Multi Step Processing'] && !!highestOverall && Object.keys(highestOverall).filter(skill => skillNames.includes(skill)).forEach(skill => {
        if (!!chunkInfo['challenges'][skill] && chunkInfo['challenges'][skill].hasOwnProperty(highestOverall[skill]) && chunkInfo['challenges'][skill][highestOverall[skill]].hasOwnProperty('Items')) {
            chunkInfo['challenges'][skill][highestOverall[skill]]['Items'].filter(item => multiTasks.hasOwnProperty(item) && (!baseChunkData['items'].hasOwnProperty(item) || Object.keys(baseChunkData['items'][item]).length === 0)).forEach(item => {
                Object.keys(multiTasks[item]).forEach(subSkill => {
                    Object.keys(multiTasks[item][subSkill]).forEach(subTask => {
                        baseChunkData['items'][item] = {};
                        baseChunkData['items'][item][subTask] = 'multi-' + subSkill;
                        if (!globalValids[subSkill]) {
                            globalValids[subSkill] = {};
                        }
                        globalValids[subSkill][subTask] = chunkInfo['challenges'][subSkill][subTask].hasOwnProperty('Level') ? chunkInfo['challenges'][subSkill][subTask]['Level'] : true;
                        didAddTasks = true;
                    });
                });
            });
        }
    });
    if (didAddTasks) {
        return calcCurrentChallenges2();
    }
    !!outputTasks && Object.keys(outputTasks).forEach(skill => {
        !!outputTasks[skill] && Object.keys(outputTasks[skill]).filter(challenge => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Level') && !!highestOverall[skill] && chunkInfo['challenges'][skill].hasOwnProperty(highestOverall[skill].split('{')[0]) && chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]].hasOwnProperty('Level') && chunkInfo['challenges'][skill][challenge]['Level'] <= chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]]['Level'] }).forEach(challenge => {
            let stillValid = true;
            chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                if (!globalValids.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || !globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                    stillValid = false;
                }
            });
            if (stillValid) {
                if (!globalValids.hasOwnProperty(skill)) {
                    globalValids[skill] = {};
                }
                globalValids[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
            }
        });
    });
    return tempChallengeArr;
}

// Finds gcd
let gcd = function(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, Math.floor(a % b));
}

// Finds even fraction
let findFraction = function(fraction, isRoundedDenominator) {
    if (isNaN(fraction)) {
        return fraction;
    } else {
        var len = fraction.toString().length - 2;

        var denominator = Math.pow(10, len);
        var numerator = fraction * denominator;

        var divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        if (isRoundedDenominator) {
            return 1 + '/' + (+(Math.floor(Math.round((denominator/numerator) + "e+2")  + "e-2"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
            return 1 + '/' + (+(Math.round((denominator/numerator) + "e+2")  + "e-2")).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
}

// Gathers item/object info on all chunk ids passed in
let gatherChunksInfo = function(chunks) {
    let items = {};
    let objects = {};
    let monsters = {};
    let npcs = {};
    let shops = {};

    !!randomLoot && Object.keys(randomLoot).forEach(item => {
        if (!items[item]) {
            items[item] = {};
        }
        items[item]['Random Event Loot'] = 'secondary-drop';
    });

    !!manualEquipment && Object.keys(manualEquipment).forEach(item => {
        if (!items[item]) {
            items[item] = {};
        }
        items[item]['Manually Added Equipment'] = 'secondary-drop';
    });

    Object.keys(chunks).forEach(num => {
        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Sections'] && Object.keys(chunkInfo['chunks'][num]['Sections']).filter(section => !!unlockedSections[num] && unlockedSections[num][section]).forEach(section => {
            if (rules['Puro-Puro'] || num !== 'Puro-Puro') {
                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Monster']).forEach(monster => {
                    !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT']) && drop !== 'GemDropTableLegends+') {
                                Object.keys(dropTables[drop]).forEach(item => {
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!items[item]) {
                                            items[item] = {};
                                        }
                                        if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                            items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                        } else {
                                            items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : (dropTables[drop][item].split('@')[1].includes('-') ? dropTables[drop][item].split('@')[1] : dropTables[drop][item].split('@')[1] * quantity)] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!items[drop]) {
                                    items[drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                            if (!!dropTables[drop] && ((drop === 'RareDropTable+' || drop === 'GemDropTable+'|| drop === 'GemDropTableLegends+') && rules['RDT'])) {
                                if (!items[drop]) {
                                    items[drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            } 
                        });
                    });
                });

                !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach(monster => {
                    !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach(item => {
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!items[item]) {
                                            items[item] = {};
                                        }
                                        if (chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always' || (((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'))) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))) {
                                            items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                        } else {
                                            items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!items[drop]) {
                                    items[drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                });

                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Shop']).forEach(shop => {
                    !!chunkInfo['shopItems'][shop] && (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) && Object.keys(chunkInfo['shopItems'][shop]).forEach(item => {
                        if ((!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!items[item]) {
                                items[item] = {};
                            }
                            items[item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                        }
                    });
                });

                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Spawn'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Spawn']).forEach(spawn => {
                    if (!backloggedSources['items'] || !backloggedSources['items'][spawn]) {
                        if (!items[spawn]) {
                            items[spawn] = {};
                        }
                        items[spawn][num] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                    }
                });

                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Object'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Object']).forEach(object => {
                    if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
                        if (!objects[object]) {
                            objects[object] = {};
                        }
                        objects[object][num] = true;
                    }
                });

                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Monster']).forEach(monster => {
                    if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
                        if (!monsters[monster]) {
                            monsters[monster] = {};
                        }
                        monsters[monster][num] = true;
                    }
                });

                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['NPC'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['NPC']).forEach(npc => {
                    if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
                        if (!npcs[npc]) {
                            npcs[npc] = {};
                        }
                        npcs[npc][num] = true;
                    }
                });

                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Shop']).forEach(shop => {
                    if (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) {
                        if (!shops[shop]) {
                            shops[shop] = {};
                        }
                        shops[shop][num] = true;
                    }
                });
            }
        });
        if (rules['Puro-Puro'] || num !== 'Puro-Puro') {
            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach(monster => {
                !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT']) && drop !== 'GemDropTableLegends+') {
                            Object.keys(dropTables[drop]).forEach(item => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!items[item]) {
                                        items[item] = {};
                                    }
                                    if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                    } else {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : (dropTables[drop][item].split('@')[1].includes('-') ? dropTables[drop][item].split('@')[1] : dropTables[drop][item].split('@')[1] * quantity)] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                        if (!!dropTables[drop] && ((drop === 'RareDropTable+' || drop === 'GemDropTable+'|| drop === 'GemDropTableLegends+') && rules['RDT'])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        } 
                    });
                });
            });

            !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach(monster => {
                !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach(item => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!items[item]) {
                                        items[item] = {};
                                    }
                                    if (chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always' || (((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'))) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))) {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                    } else {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach(shop => {
                !!chunkInfo['shopItems'][shop] && (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) && Object.keys(chunkInfo['shopItems'][shop]).forEach(item => {
                    if ((!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!items[item]) {
                            items[item] = {};
                        }
                        items[item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                    }
                });
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Spawn'] && Object.keys(chunkInfo['chunks'][num]['Spawn']).forEach(spawn => {
                if (!backloggedSources['items'] || !backloggedSources['items'][spawn]) {
                    if (!items[spawn]) {
                        items[spawn] = {};
                    }
                    items[spawn][num] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Object'] && Object.keys(chunkInfo['chunks'][num]['Object']).forEach(object => {
                if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
                    if (!objects[object]) {
                        objects[object] = {};
                    }
                    objects[object][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach(monster => {
                if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
                    if (!monsters[monster]) {
                        monsters[monster] = {};
                    }
                    monsters[monster][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['NPC'] && Object.keys(chunkInfo['chunks'][num]['NPC']).forEach(npc => {
                if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
                    if (!npcs[npc]) {
                        npcs[npc] = {};
                    }
                    npcs[npc][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach(shop => {
                if (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) {
                    if (!shops[shop]) {
                        shops[shop] = {};
                    }
                    shops[shop][num] = true;
                }
            });
        }
    });

    !!manualMonsters && !!manualMonsters['Items'] && Object.keys(manualMonsters['Items']).forEach(item => {
        if (!backloggedSources['items'] || !backloggedSources['items'][item]) {
            if (!items[item]) {
                items[item] = {};
            }
            items[item]['Manually Added*'] = 'primary-Nonskill';
        }
    });

    !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach(monster => {
        if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
            if (!monsters[monster]) {
                monsters[monster] = {};
            }
            monsters[monster]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['NPCs'] && Object.keys(manualMonsters['NPCs']).forEach(npc => {
        if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
            if (!npcs[npc]) {
                npcs[npc] = {};
            }
            npcs[npc]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['Objects'] && Object.keys(manualMonsters['Objects']).forEach(object => {
        if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
            if (!objects[object]) {
                objects[object] = {};
            }
            objects[object]['Manually Added*'] = true;
        }
    });
    return {items: items, objects: objects, monsters: monsters, npcs: npcs, shops: shops};
}

// Gets all possible chunk areas
let getAllChunkAreas = function(chunks) {
    let i = 0;
    let temp = {};
    let temp2 = {};
    let tempChunks = JSON.parse(JSON.stringify(chunks));
    while (i < Object.keys(tempChunks).length) {
        !!chunkInfo['chunks'][Object.keys(tempChunks)[i]] && !!chunkInfo['chunks'][Object.keys(tempChunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(tempChunks)[i]]['Connect']).forEach(id => {
            if (chunkInfo['chunks'][parseInt(id)].hasOwnProperty('Name') && !!chunkInfo['chunks'][parseInt(id)]['Name'] && typeof chunkInfo['chunks'][parseInt(id)]['Name'] === 'string') {
                tempChunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                temp[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] || false;
                if (!!tempChunks[Object.keys(tempChunks)[i]]) {
                    if (!temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                        temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = {};
                    }
                    temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')][Object.keys(tempChunks)[i]] = true;
                }
            }
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && !tempChunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                if (!chunkInfo['challenges']['Nonskill'] || !chunkInfo['challenges']['Nonskill'][chunkInfo['chunks'][parseInt(id)]['Name']] || Object.keys(chunkInfo['challenges']['Nonskill'][chunkInfo['chunks'][parseInt(id)]['Name']]).length <= 1) {
                    if (temp2.hasOwnProperty(chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')) && Object.keys(temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]).filter(subArea => { chunks.hasOwnProperty(subArea) }).length > 1) {
                        chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                    }
                }
            }
        });
        i++;
    }
    possibleAreas = temp;
    areasStructure = temp2;

    !!manualAreas && Object.keys(manualAreas).forEach(area => {
        if (manualAreas[area]) {
            chunks[area] = true;
        } else if (chunks.hasOwnProperty(area)) {
            delete chunks[area];
        }
    });

    return chunks;
}