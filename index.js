/*
 * Created by Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Ids and Amehzyn for smoother zooming/url decoding
 * 02/19/2024
 */

let onMobile = false;                                                           // Is user on a mobile device
let viewOnly = false;                                                           // View only mode active
let isPicking = false;                                                          // Has the user just rolled 2 chunks and is currently picking
let autoSelectNeighbors = false;                                                // Toggle state for select neighbors button
let autoRemoveSelected = false;                                                 // Toggle state for remove selected button
let showChunkIds = false;                                                       // Toggle state for show chunk ids button
let clicked = false;                                                            // Is mouse being held down
let screenshotMode = false;                                                     // Is screenshot mode on
let testMode = false;                                                           // Is test mode on
let settingsOpen = false;                                                       // Is the settings menu open
let roll2On = false;                                                            // Is the roll2 button enabled
let unpickOn = false;                                                           // Is the unpick button enabled
let recentOn = false;                                                           // Is the recent chunks section enabled
let chunkInfoOn = false;                                                        // Is the chunk info panel enabled
let chunkTasksOn = false;                                                       // Is the chunk tasks panel enabled
let topButtonsOn = false;                                                       // Are the top buttons enabled
let infoCollapse = false;                                                       // Is the chunk info panel collapsed
let highscoreEnabled = false;                                                   // Is highscore tracking enabled
let highVisibilityMode = false;                                                 // Is high visibility mode enabled
let theme = 'light';                                                            // Theme value
let recent = [];                                                                // Recently picked chunks
let recentTime = [];                                                            // Recently picked chunks time
let chunkOrder = [];                                                            // Full picked chunks order
let zoom = 350;                                                                 // Starting zoom value
let fontZoom = 16;                                                              // Font size zoom
let labelZoom = 96;                                                             // Selected label font size zoom
let scale = 30;                                                                 // Amount zoomed every 'zoom' action
let fullSize = 1254;                                                            // Amount of chunks present
let rowSize = 38;                                                               // Amount of chunks per row
let scrollLeft = 0;                                                             // Amount the board is scrolled left offscreen
let prevScrollLeft = 0;                                                         // Amount the board was previously scrolled left offscreen
let scrollTop = 0;                                                              // Amount the board is scrolled up offscreen
let prevScrollTop = 0;                                                          // Amount the board was previously scrolled up offscreen
let clickX;                                                                     // Spot clicked x-value
let clickY;                                                                     // Spot clicked y-value
let chunkInfo = {};                                                             // Data of all chunk info
let infoLockedId = -1;                                                          // Id of chunk locked for info
let userName = '';                                                              // Runescape Username of user

let ratio = 4217 / 4868;                                                        // Image ratio
let movedNum = 0;                                                               // Amount of times mouse is moved while dragging
let selectedNum = 1;                                                            // Current index of selected chunks
let unlockedChunks = 0;                                                         // Number of unlocked chunks
let selectedChunks = 0;                                                         // Number of selected chunks
let startingIndex = 7495;                                                       // Index to start chunk numbering at
let skip = 218;                                                                 // Number of indices to skip between columns for chunk numbering

let prevValueMid = '';                                                          // Previous value of map id at login
let prevValuePinNew = '';                                                       // Previous value of pin at signup
let prevValuePinOld = '';                                                       // Previous value of pin at login
let prevValueLockPin = '';                                                      // Previous value of pin at map login
let prevValueMid2 = '';                                                         // Previous value of map id at pin change
let prevValuePinOld2 = '';                                                      // Previous value of pin at pin change
let prevValuePinOld2Second = '';                                                // Previous valye of pin 2 at pin change
let prevValueMidFriend = '';                                                    // Previous value of map id at friend change
let prevStartingChunkValue = '';                                                // Previous value of starting chunk id
let prevValueLevelInput = {
    'Combat': 3,
    'Slayer': 1,
    'ignoreCombatLevel': false,
    'krystiliaSlayerCreatures': false,
    'ClueSteps': 0,
};                                                                              // Previous values of combat and slayer level inputs, related checkboxes, and clue steps
let checkedAllTasks = {};                                                       // Checked tasks from the all tasks list
let mid;                                                                        // Current value of map id
let pin;                                                                        // Current value of pin
let savedPin;                                                                   // Pin saved off from entry

let midGood = false;                                                            // Is the map id valid
let pinGood = true;                                                             // Is the pin valid
let mid2Good = false;                                                           // Is the map id valid (change pin)
let pin2Good = false;                                                           // Is the pin valid (change pin)
let pin2SecondGood = false;                                                     // Is the pin 2 valid (change pin)
let midFriendGood = false;                                                      // Is the map id valid (friend)
let nameFriendGood = false;                                                     // Is the name valid (friend)
let atHome;                                                                     // Is the user on the homepage
let locked;                                                                     // Is the user not logged in
let lockBoxOpen = false;                                                        // Is the lock box open
let inEntry = false;                                                            // Is the entry menu open
let importMenuOpen = false;                                                     // Is the import menu open
let highscoreMenuOpen = false;                                                  // Is the highscores menu open
let helpMenuOpen = false;                                                       // Is the help menu open
let helpMenuOpenSoon = false;                                                   // Will the help menu be opened once logged in
let patchNotesOpen = false;                                                     // Are the patch notes open
let patchNotesOpenSoon = false;                                                 // Will the patch notes be opened once logged in
let mapIntroOpen = false;                                                       // Is the map intro modal open
let mapIntroOpenSoon = false;                                                   // Will the map intro be opened once logged in
let xpRewardOpen = false;
let signedIn = false;                                                           // Is the user signed in
let filterByChecked = false;                                                    // Are we filtering by checked only
let filterByCheckedEquipment = false;                                           // Are we filtering equipment by checked only
let filterByCheckedSources = false;                                             // Are we filtering sources by checked only
let filterByCheckedMonsters = false;                                            // Are we filtering monsters by checked only
let filterByUnlockedManualAreas = false;                                        // Are we filtering manual areas by unlocked only
let filterByLockedManualAreas = false;                                          // Are we filtering manual areas by locked only
let extraOutputItems = {};                                                      // List of extra items obtainable from skill output
let baseChunkData = {};                                                         // Chunk data global list

let activeContextMenuChallenge = null;                                          // Challenge saved of active ellipsis
let activeContextMenuSkill = null;                                              // Skill saved of active ellipsis
let activeContextMenuChallengeOld = null;                                       // Challenge saved of active ellipsis old
let activeContextMenuSkillOld = null;                                           // Skill saved of active ellipsis old

let backlogContextMenuChallenge = null;                                          // Challenge saved of backlog ellipsis
let backlogContextMenuSkill = null;                                              // Skill saved of backlog ellipsis
let backlogContextMenuChallengeOld = null;                                       // Challenge saved of backlog ellipsis old
let backlogContextMenuSkillOld = null;                                           // Skill saved of backlog ellipsis old

let infoPanelVis = {
    monsters: false,
    npcs: false,
    spawns: false,
    shops: false,
    features: false,
    quests: false,
    clues: false,
    connections: false,
    challenges: false
};                                                                              // JSON showing state of which chunk info panels are open/closed

let challengePanelVis = {
    active: false,
    areas: false,
    backlog: false,
    completed: false
};                                                                              // JSON showing state of which challenge panels are open/closed

let rulesPanelVis = {
    visibletasks: false,
    overallskill: false,
    agility: false,
    combat: false,
    construction: false,
    farming: false,
	fishing: false,
    herblore: false,
    hunter: false,
    magic: false,
    prayer: false,
	ranged: false,
    runecraft: false,
    slayer: false,
    smithing: false,
	thieving: false,
    itemsources: false,
    miscellaneous: false
};

let activeSubTabs = {
    skill: true,
    bis: true,
    quest: true,
    diary: true,
    extra: true
};

let databaseRef = firebase.database().ref();                                    // Firebase database reference
let myRef;                                                                      // Firebase database reference for this map ID

let BASE10 = "0123456789";                                                      // Base 10 alphabet
let BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";  // Base 62 alphabet

const skillNames = [
    "Slayer",
    "Thieving",
    "Attack",
    "Defence",
    "Strength",
    "Constitution",
    "Ranged",
    "Prayer",
    "Magic",
    "Farming",
    "Herblore",
    "Hunter",
    "Cooking",
    "Woodcutting",
    "Firemaking",
    "Fletching",
    "Fishing",
    "Mining",
    "Runecrafting",
    "Smithing",
    "Crafting",
    "Agility",
    "Construction",
    "Combat",
    "Divination",
    "Archaeology",
    "Dungeoneering",
    "Summoning",
    "Invention",
	"Necromancy"
];                                                                              // Names of all skills
const combatSkills = [
    'Attack',
    'Strength',
    'Defence',
    'Constitution',
    'Ranged',
    'Magic',
    'Prayer',
    'Summoning',
	'Necromancy'
];                                                                              // Names of all combat skills
const f2pSkills = [
    'Attack',
    'Strength',
    'Defence',
    'Ranged',
    'Prayer',
    'Magic',
    'Runecrafting',
    'Constitution',
    'Crafting',
    'Mining',
    'Smithing',
    'Fishing',
    'Cooking',
    'Firemaking',
    'Woodcutting',
	'Fletching'
];                                                                              // Names of all f2p skills
const skillNamesXp = [
    'Attack',
    'Strength',
    'Ranged',
    'Magic',
    'Defence',
    'Constitution',
    'Prayer',
    'Agility',
    'Herblore',
    'Thieving',
    'Crafting',
    'Runecrafting',
    'Slayer',
    'Farming',
    'Mining',
    'Smithing',
    'Fishing',
    'Cooking',
    'Firemaking',
    'Woodcutting',
    'Fletching',
    'Construction',
    'Hunter',
	'Summoning',
	'Dungeoneering',
	'Divination',
	'Invention',
	'Archaeology',
	'Necromancy'
];                                                                              // Names of all lampable skills
const clueTiers = [
    'Easy',
    'Medium',
    'Hard',
    'Elite',
    'Master'
];
const clueStepAmounts = {
    'Easy': {
        '3': 0.33,
        '4': 0.34,
        '5': 0.33
    },
    'Medium': {
        '4': 0.33,
        '5': 0.34,
        '6': 0.33
    },
    'Hard': {
        '5': 0.33,
        '6': 0.34,
        '7': 0.33
    },
    'Elite': {
        '5': 0.33,
        '6': 0.34,
        '7': 0.33
    },
    'Master': {
        '6': 0.33,
        '7': 0.34,
        '8': 0.33
    }
};

let selectedOverlayClues = {
    'Easy': false,
    'Medium': false,
    'Hard': false,
    'Elite': false,
    'Master': false
};

// Imported data
let boneItems = [];
let rangedItems = [];
let elementalRunes = [];
let itemsPlus = {};
let objectsPlus = {};
let chunksPlus = {};
let monstersPlus = {};
let npcsPlus = {};
let mixPlus = {};
let tasksPlus = {};
let tools = {};
let magicTools = {};
let dropTables = {};
let elementalStaves = {};
let bossLogs = {};
let bossMonsters = {};
let minigameShops = {};
let slayerTasks = {};

let questLastStep = {};

let rules = {
    "Skillcape": false,
    "Rare Drop": false,
    "Pouch": false,
    "InsidePOH": false,
    "InsidePOH Primary": false,
    "Construction Milestone": false,
    "Boss": false,
    "Slayer Equipment": false,
    "Normal Farming": false,
    "Raking": false,
    "Kill X": false,
    "Sorceress's Garden": false,
    "Spells": false,
    "Show Skill Tasks": false,
    "Show Quest Tasks": false,
    "Show Diary Tasks": false,
    "Show Best in Slot Tasks": false,
    "Show Best in Slot Prayer Tasks": false,
    "Show Best in Slot Defensive Tasks": false,
    "Show Best in Slot Melee Style Tasks": false,
    "Show Best in Slot 1H and 2H": false,
    "Show Best in Slot Shield": false,
    "Show Quest Tasks Complete": false,
    "Show Diary Tasks Complete": false,
    "Show Diary Tasks Any": false,
    "Highest Level": false,
    "BIS Skilling": false,
    "Collection Log": false,
	"Slayer Collection Log": false,
    "Minigame": false,
    "Shortcut Task": false,
    "Shortcut": false,
    "Wield Crafted Items": false,
    "Multi Step Processing": false,
    "Puro-Puro": false,
    "Extra implings": false,
    "Farming Primary": false,
    "Wandering implings": false,
    "Secondary Primary": false,
    "Secondary Primary Amount": "1",
    "RDT": false,
    "Untracked Uniques": false,
    "Combat and Teleport Spells": false,
    "Primary Spawns": false,
    "Smithing by Smelting": false,
    "Pets": false,
    "Stuffables": false,
    "Kill X Amount": "1",
    "Rare Drop Amount": "1000",
    "Manually Complete Tasks": false,
    "Every Drop": false,
    "HigherLander": false,
    "Starting Items": false,
    "Secondary MTA": false,
    "PVP-Only Spells": false,
    "Skilling Pets": false,
    "Money Unlockables": false,
    "Prayers": false,
    "All Droptables": false,
    "All Droptables Nest": false,
    "Skiller": false,
    "Fill Stash": false,
    "All Shops": false,
    "Quest Skill Reqs": false,
    "Boosting": false,
	"Token": false,
	"Master skillcape": false,
	"Golden fish egg": false,
	"Cleaning herbs": false,
	"Swordy": false,
	"Vinesweeper": false,
	"Ogleroot": false,
	"Gnomeball": false,
	"Daemonheim training": false,
	"Daemonheim tasks": false,
	"PortSkills": false,
	"Champion Challenge": false,
	"Titles": false,
	"DnD": false,
	"Uncharted": false,
	"Arc Log": false,
	"Achievement": false,
	"Multiple Pickpockets": false,
    "F2P": false,
};                                                                              // List of rules and their on/off state

let ruleNames = {
    "Skillcape": "Must obtain skillcapes <span class='rule-asterisk noscroll'>*</span>",
    "Rare Drop": "Chunk tasks only use drops more common than 1/X (set to 0 to include all drops)",
    "Pouch": "Using Runecrafting pouches count as chunk tasks",
    "InsidePOH": "Crafting furniture inside a POH can count as a chunk task",
    "InsidePOH Primary": "Crafting furniture inside a POH counts as a primary training method for Construction",
    "Construction Milestone": "Miscellaneous Construction milestones (e.g. House style, servants, etc) can count for chunk tasks",
    "Boss": "Killing a boss can be used for a chunk task (item on droptable, Slayer level to kill, etc.)",
    "Slayer Equipment": "Using Slayer equipment can count for chunk tasks",
    "Normal Farming": "Allow normal farming to count as a primary method for training Farming",
    "Raking": "Allow raking patches to count as a primary method for training Farming <span class='rule-asterisk noscroll'>*</span>",
    "Kill X": "Kill X-amount of every new, unique monster you encounter",
    "Sorceress's Garden": "Allow Sorceress's Garden to count as primary training for training Farming<span class='rule-asterisk noscroll'>*</span>",
    "Spells": "Spells count as a way to process runes via Magic, and therefore can count as chunk tasks",
    "Show Skill Tasks": "Show Skill Tasks (e.g. Get 43 Crafting to cut a diamond)",
    "Show Quest Tasks": "Show Quest Tasks",
    "Show Diary Tasks": "Show Diary Tasks",
    "Show Best in Slot Tasks": "Show Best in Slot (Accuracy + Strength, or secondarily Defence) Tasks",
    "Show Best in Slot Prayer Tasks": "Show Best in Slot Tasks for Prayer-boosting gear",
    "Show Best in Slot Defensive Tasks": "Show Best in Slot Tasks for Tank gear (highest defence-only)",
    "Show Best in Slot Melee Style Tasks": "Show Best in Slot Tasks for stab/slash/crush instead of overall melee",
    "Show Best in Slot 1H and 2H": "Show Best in Slot Tasks for both 2-handed and 1-handed/shield, rather than just the better of the two",
    "Show Best in Slot Shield": "Show Best in Slot Tasks for both off-hand weapons and shields, rather than just the better of the two",
    "Show Quest Tasks Complete": "Show Quest Tasks only when the whole quest is completable",
    "Show Diary Tasks Complete": "Show Diary Tasks only when the whole diary tier (easy, medium, etc.) is completable",
    "Show Diary Tasks Any": "Show all diary tasks possible, regardless of tier <span class='rule-asterisk noscroll'>*</span>",
    "Highest Level": "Require processing skill tasks to be the highest level of processing, rather than the lowest (e.g. must craft black dragonhide leather fully into a dragonhide shield rather than just into vambraces) <span class='rule-asterisk noscroll'>*</span>",
    "BIS Skilling": "Must obtain items that are best-in-slot/add quality-of-life for skilling (e.g. Dragon Pickaxe, Angler Outfit, wieldable saw, etc.)",
    "Collection Log": "Must obtain items from the boss collection log",
	"Slayer Collection Log": "Must obtain items from the slayer collection log",
    "Minigame": "Allow items obtained from minigame rewards to count towards chunk tasks",
    "Shortcut Task": "Allow agility shortcuts to count as an Agility skill task",
    "Shortcut": "Allow agility shortcuts to count as a primary method for training Agility",
    "Wield Crafted Items": "Crafted items (e.g. bows, metal armour/weapons, etc.) can count as BiS gear <span class='rule-asterisk noscroll'>*</span>",
    "Multi Step Processing": "Allow higher level processing of resources to enable other processing tasks <span class='rule-asterisk noscroll'>*</span>",
    "Puro-Puro": "Allow implings from Puro-Puro & their drops to count towards chunk tasks",
    "Extra implings": "Include implings that have non-guaranteed spawns in Puro-Puro or the Al Kharid Resource Dungeon as chunk tasks",
    "Farming Primary": "Farming products (herbs, vegetables, etc.) can count as primary item sources for chunk tasks <span class='rule-asterisk noscroll'>*</span>",
    "Wandering implings": "Allow implings that randomly wander the world & their drops to count towards chunk tasks <span class='rule-asterisk noscroll'>*</span>",
    "Secondary Primary": "Allow secondary training methods with drops/methods more common than 1/X (set to 0 to include all drops) to count as primary training methods (e.g. allow a 1/50 drop for a bronze bar be your required way to train Smithing) <span class='rule-asterisk noscroll'>*</span>",
    "RDT": "Allow items from the Rare Drop Table and the Gem Drop Table to count towards chunk tasks",
    "Untracked Uniques": "Must obtain extra uniques that are untracked on the collection log (e.g. Swordy McSwordface)",
    "Combat and Teleport Spells": "Allow all spells to count as possible Magic skill tasks (otherwise only 'utility' spells like High Alchemy or Telegrab will count)",
    "Primary Spawns": "Item spawns count as primary access to an item, and can be used as a primary way to train a skill if needed <span class='rule-asterisk noscroll'>*</span>",
    "Smithing by Smelting": "Smelting ores into bars counts as a primary method for training Smithing",
    "Pets": "Obtaining pets is included in the collection log tasks <span class='rule-asterisk noscroll'>*</span>",
    "Stuffables": "Must obtain stuffable items that can be mounted in the POH (big fish, slayer heads) <span class='rule-asterisk noscroll'>*</span>",
    "Manually Complete Tasks": "<b class='noscroll'>For maps that allow manually choosing new chunks</b>, allow the ability to manually move completed active tasks",
    "Every Drop": "Must obtain every unique item drop from monsters (items that are dropped by multiple monsters only need to be obtained once)",
    "HigherLander": "Accessing the intermediate and veteran landers for Pest Control are required tasks (only novice lander is required otherwise)",
    "Starting Items": "Do not count toolbelt items WIP",
    "Secondary MTA": "Allow MTA to be required with secondary sources of nature/law/cosmic runes",
    "PVP-Only Spells": "Require spells that can only be cast on PVP Worlds/in the Wilderness (Teleother/Teleblock)",
    "Skilling Pets": "Require skilling pets be obtained as soon as the relevant skill is trainable <span class='rule-asterisk noscroll'>†</span>",
    "Money Unlockables": "Require permanently unlockable options be unlocked (angelic gravestone, additional bank space, infinitely charged lyre, etc.) <span class='rule-asterisk noscroll'>†</span>",
    "Prayers": "Must be able to activate all prayers possible <span class='rule-asterisk noscroll'>†</span>",
    "All Droptables": "Must obtain every drop from every unique monster's droptable (duplicates included, all quantities) <span class='rule-asterisk noscroll'>†</span>",
    "All Droptables Nest": "Must include every drop from bird nests <span class='rule-asterisk noscroll'>†</span>",
    "Skiller": "Restrict tasks to only those doable on a level 3 skiller",
    "Fill Stash": "Must build and fill S.T.A.S.H. units as soon as you're able to",
    "All Shops": "Must buy every item from every shop within your chunks once <span class='rule-asterisk noscroll'>⁺</span>",
    "Quest Skill Reqs": "Must get Quest skill requirements, regardless of if the Quest is startable or not <span class='rule-asterisk noscroll'>⁺</span>",
	"Boosting": "Allow skill boosts to be considered for skill tasks",
    "Token": "Allow token xp drops to count as a primary training method<span class='rule-asterisk noscroll'>*</span>",
	"Master skillcape": "Must obtain master skillcapes for all skills <span class='rule-asterisk noscroll'>†</span>",
	"Golden fish egg": "Must obtain all available golden fish eggs <span class='rule-asterisk noscroll'>*</span>",
	"Cleaning herbs": "Cleaning herbs counts as primary herblore training <span class='rule-asterisk noscroll'>*</span>",
	"Swordy": "Must obtain Swordy McSwordFace from Bossy McBossFace in The Shadow Reef <span class='rule-asterisk noscroll'>*</span>",
	"Vinesweeper": "Allow Vinesweeper to count as primary training for training Farming <span class='rule-asterisk noscroll'>*</span>",
	"Ogleroot": "Allow Vinesweeper to count as primary training for training hunter",
	"Gnomeball": "Allow playing gnomeball to count as a primary training method for agility and ranged",
	"Daemonheim training": "Allow training methods in Daemonheim to count as primary training methods<span class='rule-asterisk noscroll'>*</span>",
	"Daemonheim tasks": "Allows activities and items in Daemonheim, excluding doors and puzzles, to create skilling tasks<span class='rule-asterisk noscroll'>*</span>",
	"PortSkills": "Require all trainable port skills to be trained up to 90<span class='rule-asterisk noscroll'>*</span>",
	"Champion Challenge": "Require all champions in the champion guild to be defeated when able<span class='rule-asterisk noscroll'>*</span>",
	"Titles": "Require all special titles that aren't connected to other content to be obtained when able<span class='rule-asterisk noscroll'>*</span>",
	"DnD": "Allow distractions and diversion to create skilling tasks<span class='rule-asterisk noscroll'>*</span>",
	"Uncharted": "Allow resources only available on uncharted islands to create skilling tasks<span class='rule-asterisk noscroll'>*</span>",
	"Arc Log": "Require completion of the Arc Journal<span class='rule-asterisk noscroll'>*</span>",
	"Achievement": "Require all achievements that can be obtained within your ruleset excluding level up achievements",
	"Multiple Pickpockets": "Require the agility and thieving levels to quadruple pickpocket<span class='rule-asterisk noscroll'>*</span>",
    "F2P": "Restrict to F2P skills/items/tasks only",
};                                                                              // List of rule definitions

let rulePresets = {
    "Vanilla Chunker": {
        "Rare Drop": true,
        "Boss": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Best in Slot Tasks": true,
        "Show Best in Slot Prayer Tasks": true,
        "Minigame": true,
        "Shortcut Task": true,
        "Shortcut": true,
        "Puro-Puro": true,
        "Spells": true,
        "Combat and Teleport Spells": true,
        "PVP-Only Spells": true,
        "Smithing by Smelting": true,
        "Rare Drop Amount": "0",
        "Secondary Primary Amount": "1",
		"Ogleroot": true,
		"Gnomeball": true,
		"Achievement": true,
    },
    "Xtreme Chunker": {
        "Skillcape": true,
        "Rare Drop": true,
        "Pouch": true,
        "InsidePOH": true,
        "InsidePOH Primary": true,
        "Construction Milestone": true,
        "Boss": true,
        "Slayer Equipment": true,
        "Normal Farming": true,
        "Raking": true,
        "Sorceress's Garden": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Diary Tasks Any": true,
        "Show Best in Slot Tasks": true,
        "Show Best in Slot Prayer Tasks": true,
        "Highest Level": true,
        "Minigame": true,
        "Shortcut Task": true,
        "Shortcut": true,
        "Wield Crafted Items": true,
        "Multi Step Processing": true,
        "Puro-Puro": true,
        "Extra implings": true,
        "Farming Primary": true,
        "Wandering implings": true,
        "Secondary Primary": true,
        "Secondary Primary Amount": "0",
        "Collection Log": true,
		"Slayer Collection Log": true,
        "Untracked Uniques": true,
        "Smithing by Smelting": true,
        "Pets": true,
        "Rare Drop Amount": "0",
        "HigherLander": true,
        "Secondary MTA": true,
        "Primary Spawns": true,
        "Spells": true,
		"Token": true,
		"Golden fish egg": true,
		"Cleaning herbs": true,
		"Stuffables": true,
		"Swordy": true,
		"Vinesweeper": true,
		"Ogleroot": true,
		"Gnomeball": true,
		"Daemonheim training": true,
		"Daemonheim tasks": true,
		"PortSkills": true,
		"Champion Challenge": true,
		"Titles": true,
		"DnD": true,
		"Uncharted": true,
		"Arc Log": true,
		"Achievement": true,
		"Multiple Pickpockets": true,
    },
    "Supreme Chunker": {
        "Skillcape": true,
        "Rare Drop": true,
        "Pouch": true,
        "InsidePOH": true,
        "InsidePOH Primary": true,
        "Construction Milestone": true,
        "Boss": true,
        "Slayer Equipment": true,
        "Normal Farming": true,
        "Raking": true,
        "Sorceress's Garden": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Diary Tasks Any": true,
        "Show Best in Slot Tasks": true,
        "Show Best in Slot Prayer Tasks": true,
        "Highest Level": true,
        "Minigame": true,
        "Shortcut Task": true,
        "Shortcut": true,
        "Wield Crafted Items": true,
        "Multi Step Processing": true,
        "Puro-Puro": true,
        "Extra implings": true,
        "Farming Primary": true,
        "Wandering implings": true,
        "Secondary Primary": true,
        "Secondary Primary Amount": "0",
        "Collection Log": true,
		"Slayer Collection Log": true,
        "Untracked Uniques": true,
        "Smithing by Smelting": true,
        "Pets": true,
        "Rare Drop Amount": "0",
        "HigherLander": true,
        "Secondary MTA": true,
        "Spells": true,
        "Combat and Teleport Spells": true,
        "PVP-Only Spells": true,
        "Skilling Pets": true,
        "Primary Spawns": true,
        "Money Unlockables": true,
        "Prayers": true,
        "All Droptables": ["All Droptables Nest"],
		"Token": true,
		"Master skillcape": true,
		"Golden fish egg": true,
		"Cleaning herbs": true,
		"Stuffables": true,
		"Swordy": true,
		"Vinesweeper": true,
		"Ogleroot": true,
		"Gnomeball": true,
		"Daemonheim training": true,
		"Daemonheim tasks": true,
		"PortSkills": true,
		"Champion Challenge": true,
		"Titles": true,
		"DnD": true,
		"Uncharted": true,
		"Arc Log": true,
		"Achievement": true,
		"Multiple Pickpockets": true,
    }
};                                                                              // List of rules that are part of each preset

let rulePresetFlavor = {
    "Vanilla Chunker": "AKA the original ruleset",
    "Xtreme Chunker": "AKA Limpwurt's ruleset",
    "Supreme Chunker": "AKA Buz's ruleset"
};                                                                              // Preset flavour text

let ruleStructure = {
    "Visible Tasks": {
        "Show Skill Tasks": true,
		"Achievement": true,
        "Show Quest Tasks": ["Show Quest Tasks Complete"],
        "Show Diary Tasks": ["Show Diary Tasks Complete", "Show Diary Tasks Any"],
        "Show Best in Slot Tasks": ["Show Best in Slot Prayer Tasks", "Show Best in Slot Defensive Tasks", "Show Best in Slot Melee Style Tasks", "Show Best in Slot 1H and 2H", "Show Best in Slot Shield"]
    },
    "Overall Skill": {
        "Starting Items": false,
        "Skillcape": ["Master skillcape"],
        "Highest Level": true,
        "Multi Step Processing": true,
        "Wield Crafted Items": true,
        "Secondary Primary": true,
        "Quest Skill Reqs": true,
        "Boosting": true,
		"Daemonheim training": true,
		"Daemonheim tasks": true,
		"PortSkills": true,
		"Token": true,
		"DnD": true,
		"Uncharted": true
    },
    "Agility": {
        "Shortcut": true,
        "Shortcut Task": true
    },
    "Combat": {
        "HigherLander": true
    },
    "Construction": {
        "InsidePOH Primary": true,
        "InsidePOH": true,
        "Construction Milestone": true
    },
    "Farming": {
        "Normal Farming": true,
        "Raking": true,
        "Sorceress's Garden": true,
        "Farming Primary": true,
		"Vinesweeper": true
    },
	"Fishing": {
		"Golden fish egg": true
	},
    "Herblore": {
		"Cleaning herbs": true
    },
    "Hunter": {
        "Puro-Puro": ["Extra implings"],
        "Wandering implings": true,
		"Ogleroot": true
    },
    "Magic": {
        "Spells": ["Combat and Teleport Spells", "PVP-Only Spells"],
        "Secondary MTA": true
    },
    "Prayer": {
        "Prayers": true
    },
	"Ranged": {
		"Gnomeball": true
	},
    "Runecrafting": {
        "Pouch": true
    },
    "Slayer": {
        "Slayer Equipment": true
    },
    "Smithing": {
        "Smithing by Smelting": true
    },
	"Thieving": {
		"Multiple Pickpockets": true
	},
    "Item Sources": {
        "Boss": true,
        "Rare Drop": true,
        "RDT": true,
        "Primary Spawns": true
    },
    "Miscellaneous": {
        "Minigame": true,
        "Kill X": true,
        "BIS Skilling": true,
        "Collection Log": ["Slayer Collection Log", "Pets", "Arc Log"],
        "Untracked Uniques": true,
		"Champion Challenge": true,
        "Skilling Pets": true,
        "Stuffables": true,
        "Fill Stash": true,
        "Money Unlockables": true,
        "Manually Complete Tasks": true,
        "Every Drop": true,
        "All Droptables": true,
        "All Shops": true,
		"Swordy": true,
        "Skiller": true,
		"Titles": true,
        "F2P": true
    }
};                                                                              // Structure of rules

let subRuleDefault = {
    "Show Quest Tasks": false,
    "Show Diary Tasks": false,
    "Show Best in Slot Tasks": false,
    "Collection Log": true,
    "Puro-Puro": false,
    "Spells": false,
    "All Droptables": false,
};                                                                              // Default value of sub-rule when parent is checked

let taskGeneratingRules = {
    "Kill X": true,
    "Show Skill Tasks": true,
    "Show Quest Tasks": true,
    "Show Diary Tasks": true,
    "Show Best in Slot Tasks": true,
    "Show Best in Slot Prayer Tasks": true,
    "Show Best in Slot Defensive Tasks": true,
    "Show Best in Slot Weight Tasks": true,
    "Show Best in Slot Melee Style Tasks": true,
    "Show Best in Slot 1H and 2H": true,
    "Show Best in Slot Shield": true,
    "Show Quest Tasks Complete": true,
    "Show Diary Tasks Complete": true,
    "Show Diary Tasks Any": true,
    "Collection Log Bosses": true,
    "Collection Log Raids": true,
    "Collection Log Clues": true,
    "Collection Log Minigames": true,
    "Collection Log Other": true,
    "Untracked Uniques": true,
    "Pets": true,
    "Jars": true,
    "Stuffables": true,
    "Every Drop": true,
    "Skilling Pets": true,
    "Money Unlockables": true,
    "All Droptables": true,
    "Fill Stash": true,
    "Fill POH": true,
    "All Shops": true,
};                                                                              // List of rule that generate tasks

let settings = {
    "highvis": false,
    "neighbors": true,
    "remove": false,
    "roll2": false,
    "unpick": false,
    "recent": true,
    "info": true,
    "chunkTasks": true,
    "topButtons": true,
    "completedTaskColor": '#0D8219',
    "completedTaskStrikethrough": true,
    "randomStartAlways": false,
    "theme": 'light',
    "defaultStickerColor": '#FFFFFF',
    "walkableRollable": true,
    "autoWalkableRollable": false,
    "cinematicRoll": true,
    "taskSidebar": false,
    "allTasks": false,
    "hideChecked": false,
    "ids": false,
    "startingChunk": '',
    "numTasksPercent": false,
    "newTasks": false,
    "shiftUnlock": false,
    "rollWarning": false,
    "optOutSections": false,
};                                                                              // Current state of all settings

let settingNames = {
    "highvis": "Display the chunk map with higher visibility, allowing you to see better into locked chunks, with thinner chunk borders, more see-through chunk coloring, and more",
    "neighbors": "After a new chunk is rolled, automatically mark neighbouring chunks as rollable",
    "remove": "After a new chunk is rolled, mark all locked chunks as not-rollable",
    "roll2": "Enable the roll 2 button, allowing you to roll two chunks and pick between the two",
    "unpick": "Enable the unpick chunk button, allowing you to unpick, and therefore re-lock, a randomly selected unlocked chunk (useful for forfeits)",
    "recent": "<b class='noscroll'>[Recent Chunks]</b> The recent chunks panel shows you the 5 most recently rolled chunks on your map, the dates you rolled them, how long it's been (in days) since your last roll, and more",
    "info": "<b class='noscroll'>[Chunk Info]</b> The chunk info panel shows you an array of information on every chunk in the game (monsters, npcs, item spawns, shops, and more). Hint: Right-click a chunk to bring up info on that chunk",
    "chunkTasks": "<b class='noscroll'>[Chunk Tasks]</b> The chunk tasks panel shows you an automatically made list of active tasks you need to do to finish your chunk. This is essential for any Chunker to keep track of what needs to get done",
    "topButtons": "<b class='noscroll'>[Current BIS & Activity Info]</b> These buttons allow access to many miscellaneous pieces of information and crucial functionality for locking slayer and seeing best-in-slot gear",
    "completedTaskColor": "Change the color of checked-off chunk tasks",
    "completedTaskStrikethrough": "Cross-off chunk tasks as you complete them",
    "randomStartAlways": "Change the 'Pick Chunk' button to always be a 'Random Start' button; every chunk roll picks a random walkable chunk (that isn't already unlocked)",
    "theme": "Set <b class='noscroll'>Theme</b>",
    "defaultStickerColor": "Change the default color of chunk stickers",
    "walkableRollable": "Only automatically mark <b class='noscroll'>walkable</b> chunks",
    "autoWalkableRollable": "Automatically mark all accessible chunks across the whole map after rolling (doesn't include disconnected chunks)",
    "cinematicRoll": "Enable fancier rolling of chunks",
    "taskSidebar": "Expand the task panel into a large sidebar, to show more tasks at once",
    "allTasks": "Generate a list of all intermediate-level skill tasks to be shown in the Activity Info window",
    "hideChecked": "Automatically hide checked-off tasks from the Active Chunk Tasks panel, with a button at the top of the panel to temporarily show the checked-off tasks",
    "ids": "Show an overlay of Chunk IDs for each chunk",
    "startingChunk": "Starting Chunk",
    "numTasksPercent": "Show Active Task number as a percentage instead of a fraction",
    "newTasks": "In addition to adding new tasks to the Active Chunk Tasks list, also show new chunk tasks in a popup window after every chunk roll",
    "shiftUnlock": "Prevent click-to-unlock chunks unless holding down the Shift-key (or long-pressing on mobile)",
    "rollWarning": "Show a confirmation window after clicking the Pick Chunk or Roll 2 button",
    "optOutSections": "Always assume all chunks are entirely accessible (opt out of chunk sections)",
};                                                                              // Descriptions of the settings

let settingStructure = {
    "Chunk Rolling Alternatives": {
        "roll2": true,
        "unpick": true,
        "randomStartAlways": true
    },
    "Chunk Neighbours": {
        "neighbors": ["walkableRollable", "autoWalkableRollable"],
        "remove": true
    },
    "Information Panels": {
        "recent": true,
        "info": true,
        "chunkTasks": ["taskSidebar", "hideChecked"],
        "topButtons": ["allTasks"]
    },
    "Warnings": {
        "shiftUnlock": true,
        "rollWarning": true
    },
    "Customization": {
        "theme": true,
        "startingChunk": true,
        "ids": true,
        "cinematicRoll": true,
        "optOutSections": true,
        "newTasks": true,
        "highvis": true,
        "numTasksPercent": true,
        "completedTaskStrikethrough": true,
        "completedTaskColor": true,
        "defaultStickerColor": true
    }
};                                                                              // Structure of the settings

let subSettingDefault = {
    "neighbors": true,
    "chunkTasks": false
};                                                                              // Default value of sub-setting when parent is checked

let settingsStructureConflict = {
    "neighbors": ["remove"],
    "remove": ["neighbors"],
    "taskSidebar": ["recent"]
};                                                                              // Rules that conflict with each other and can't both be checked

let maybePrimary = [
    "Normal Farming",
    "Shortcut",
    "InsidePOH Primary",
	"Token",
	"Cleaning herbs"
];                                                                              // Methods that are only primary if their respective rule is checked

let randomLootChoices = [
    "Acorn",
    "Adamant javelin",
    "Agility potion(4)",
    "Air rune",
    "Antipoison(4)",
    "Apple tree seed",
    "Attack potion(4)",
    "Banana tree seed",
    "Beer",
    "Bird nest",
    "Bird's egg",
    "Body rune",
    "Bronze arrow",
    "Bucket",
    "Cabbage",
    "Calquat tree seed",
    "Casket",
    "Celastrus seed",
    "Chaos rune",
    "Chaos talisman",
    "Chocolate bar",
    "Clue scroll (easy)",
    "Clue scroll (hard)",
    "Clue scroll (medium)",
    "Coal",
    "Coins",
    "Cosmic talisman",
    "Curry tree seed",
    "Death rune",
    "Defence potion(4)",
    "Diamond",
    "Diamond ring",
    "Dragon med helm",
    "Dragon spear",
    "Dragonfruit tree seed",
    "Dragonstone",
    "Earth rune",
    "Emerald",
    "Emerald ring",
    "Energy potion(4)",
    "Feather",
    "Fire rune",
    "Flax",
    "Flyer",
    "Gold bar",
    "Gold necklace",
    "Gold ore",
    "Gold ring",
    "Grimy snapdragon",
    "Grimy toadflax",
    "Iron arrow",
    "Kebab",
    "Law rune",
    "Loop half of key",
    "Magic potion(4)",
    "Magic seed",
    "Mahogany seed",
    "Maple seed",
    "Meat pie",
    "Mithril arrowtips",
    "Mithril bar",
    "Mithril ore",
    "Mithril scimitar",
    "Nature rune",
    "Nature talisman",
    "Old boot",
    "Onion",
    "Orange tree seed",
    "Palm tree seed",
    "Papaya tree seed",
    "Pineapple seed",
    "Redwood tree seed",
    "Restore potion(4)",
    "Ruby",
    "Ruby ring",
    "Rune 2h sword",
    "Rune arrow",
    "Rune battleaxe",
    "Rune javelin",
    "Rune kiteshield",
    "Rune spear",
    "Rune sq shield",
    "Runite bar",
    "Sapphire",
    "Sapphire ring",
    "Shield left half",
    "Silver ore",
    "Spinach roll",
    "Spirit seed",
    "Stale baguette",
    "Stamina potion(4)",
    "Steel arrow",
    "Steel bar",
    "Steel platebody",
    "Strength potion(4)",
    "Super attack(4)",
    "Super defence(4)",
    "Super energy(4)",
    "Super restore(4)",
    "Super strength(4)",
    "Teak seed",
    "Tooth half of key",
    "Uncut diamond",
    "Uncut emerald",
    "Uncut ruby",
    "Uncut sapphire",
    "Water rune",
    "Willow seed",
    "Yew seed"
];                                                                              // List of random event and other loot item options

// Tasks structure
let randomLoot = {};
let friends = {};
let friendsAlt = {};
let globalValids = {};
let challengeArr = [];
let checkedChallenges = {};
let backlog = {};
let completedChallenges = {};
let possibleAreas = {};
let manualAreas = {};
let manualSections = {};
let areasStructure = {};
let highestCurrent = {};
let savedChunks = {};
let chunkNotes = null;

let universalPrimary = {
    "Slayer": ["Primary[+]"],
    "Thieving": ["Primary[+]"],
    "Attack": ["Monster[+]"],
    "Defence": ["Monster[+]"],
    "Strength": ["Monster[+]"],
    "Constitution": ["Monster[+]"],
    "Ranged": ["Ranged[+]"],
    "Prayer": ["Primary[+]", "Bones[+]"],
    "Runecrafting": ["Primary[+]"],
    "Magic": ["Primary[+]"],
    "Farming": ["Primary[+]"],
    "Herblore": ["Primary[+]"],
    "Hunter": ["Primary[+]"],
    "Cooking": ["Primary[+]"],
    "Woodcutting": ["Primary[+]"],
    "Firemaking": ["Primary[+]"],
    "Fletching": ["Primary[+]"],
    "Fishing": ["Primary[+]"],
    "Mining": ["Primary[+]"],
    "Smithing": ["Primary[+]"],
    "Crafting": ["Primary[+]"],
    "Agility": ["Primary[+]"],
    "Construction": ["Primary[+]"],
    "Combat": ["Combat[+]"],
    "Divination": ["Primary[+]"],
    "Archaeology": ["Primary[+]"],
    "Dungeoneering": ["Primary[+]"],
    "Summoning": ["Primary[+]"],
    "Invention": ["Primary[+]"],
	"Necromancy": ["Primary[+]"]
};                                                                                  // What is the primary way to train each skill

let processingSkill = {
    "Slayer": false,
    "Thieving": false,
    "Attack": false,
    "Defence": false,
    "Strength": false,
    "Constitution": false,
    "Ranged": false,
    "Prayer": false,
    "Runecrafting": true,
    "Magic": true,
    "Farming": false,
    "Herblore": true,
    "Hunter": false,
    "Cooking": true,
    "Woodcutting": false,
    "Firemaking": true,
    "Fletching": true,
    "Fishing": false,
    "Mining": false,
    "Smithing": true,
    "Crafting": true,
    "Agility": false,
    "Construction": true,
    "Combat": true,
    "Quest": false,
    "Diary": false,
    "Nonskill": false,
    "Extra": false,
    "BiS": false,
    "Divination": true,
    "Archaeology": true,
    "Dungeoneering": false,
    "Summoning": true,
    "Invention": true,
	"Necromancy": true
};                                                                                  // Is each skill a processing skill

let diaryTierAbr = {
    'Easy': 'EA',
    'Medium': 'MD',
    'Hard': 'HD',
    'Elite': 'EL',
    'Master': 'MS',
    'Grandmaster': 'GM',
    'Museum Camp': 'MC',
    'Northern Reaches': 'NR',
    'Southern Swamps': 'SS',
    'Mountainous East': 'ME'
};                                                                                  // Abbreviations for diary tiers

let taskSections = [
    'skill',
    'bis',
    'quest',
    'diary',
    'extra'
];

// Misc. modal and task variables
let monsterExists = false;
let questChunks = [];
let manualModalOpen = false;
let manualTasks = {};
let manualEquipment = {};
let backloggedSources = {};
let fullChallengeArr = {};
let manualMonsters = {};
let slayerLocked = null;
let passiveSkill = {};
let detailsModalOpen = false;
let notesModalOpen = false;
let notesChallenge = null;
let notesSkill = null;
let rulesModalOpen = false;
let presetWarningModalOpen = false;
let exitSandboxWarningModalOpen = false;
let mobileMenuOpen = false;
let mobileTasksOpen = false;
let pickChunkWarningModalOpen = false;
let roll2ChunkWarningModalOpen = false;
let settingsModalOpen = false;
let chunkHistoryModalOpen = false;
let challengeAltsModalOpen = false;
let overlaysModalOpen = false;
let randomModalOpen = false;
let randomListModalOpen = false;
let statsErrorModalOpen = false;
let searchModalOpen = false;
let searchDetailsModalOpen = false;
let highestModalOpen = false;
let highest2ModalOpen = false;
let methodsModalOpen = false;
let completeModalOpen = false;
let addEquipmentModalOpen = false;
let stickerModalOpen = false;
let backlogSourcesModalOpen = false;
let manualOuterModalOpen = false;
let monsterModalOpen = false;
let slayerLockedModalOpen = false;
let passiveSkillModalOpen = false;
let rollChunkModalOpen = false;
let questStepsModalOpen = false;
let friendsListModalOpen = false;
let friendsAddModalOpen = false;
let manualAreasModalOpen = false;
let chunkSectionsModalOpen = false;
let chunkSectionPickerModalOpen = false;
let slayerMasterInfoModalOpen = false;
let doableClueStepsModalOpen = false;
let clueChunksModalOpen = false;
let clipboardModalOpen = false;
let notesOpen = false;
let notesEditing = false;
let newTasksOpen = false;
let workerOut = 0;
let gotData = false;
let questPointTotal = 0;
let oldChallengeArr = {};
let futureChunkData = {};
let futureUnlockedSections = {};
let highestOverall = {};
let savedBox = null;
let stickered = {};
let stickeredNotes = {};
let stickeredColors = {};
let stickerChoices = ['unset', 'skull', 'skull-crossbones', 'bomb', 'exclamation-circle', 'dice', 'poo', 'frown', 'grin-alt', 'heart', 'star', 'gem', 'award', 'crown', 'flag', 'asterisk', 'clock', 'hourglass', 'link', 'map-marker-alt', 'radiation-alt', 'shoe-prints', 'thumbs-down', 'thumbs-up', 'crow', 'utensil-spoon'];
let stickerChoicesRS3 = ['attack', 'hitpoints', 'mining', 'strength', 'agility', 'smithing', 'defence', 'herblore', 'fishing', 'ranged', 'thieving', 'cooking', 'prayer', 'fletching', 'firemaking', 'magic', 'crafting', 'woodcutting', 'runecraft', 'slayer', 'farming', 'construction', 'hunter', 'quest', 'diary'];
let stickerChoicesNumbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let savedStickerId;
let savedStickerSticker;
let altChallenges = {};
let numClueTasks = {
    'easy': 0,
    'medium': 0,
    'hard': 0,
    'elite': 0,
    'master': 0
};
let numClueTasksPossible = {
    'easy': 0,
    'medium': 0,
    'hard': 0,
    'elite': 0,
    'master': 0
};
let possibleClueTasks = {
    'easy': [],
    'medium': [],
    'hard': [],
    'elite': [],
    'master': []
};
let starRegionsPossible = {
    "Asgarnia": 0,
    "Crandor and Karamja": 0,
    "Feldip Hills and the Isle of Souls": 0,
    "Fossil Island and Mos Le'Harmless": 0,
    "Fremennik Lands and Lunar Isle": 0,
    "Great Kourend": 0,
    "Kandarin": 0,
    "Kebos Lowlands": 0,
    "Kharidian Desert": 0,
    "Misthalin": 0,
    "Morytania": 0,
    "Piscatoris and the Gnome Stronghold": 0,
    "Tirannwn": 0,
    "Wilderness": 0
};
let starRegions = {
    "Asgarnia": 0,
    "Crandor and Karamja": 0,
    "Feldip Hills and the Isle of Souls": 0,
    "Fossil Island and Mos Le'Harmless": 0,
    "Fremennik Lands and Lunar Isle": 0,
    "Great Kourend": 0,
    "Kandarin": 0,
    "Kebos Lowlands": 0,
    "Kharidian Desert": 0,
    "Misthalin": 0,
    "Morytania": 0,
    "Piscatoris and the Gnome Stronghold": 0,
    "Tirannwn": 0,
    "Wilderness": 0
};
let pickedNum;
let highestTab;
let highestTab2;
let dropRatesGlobal = {};
let dropTablesGlobal = {};
let bestEquipmentAltsGlobal = {};
let unlockedSections = {};
let questProgress = {};
let diaryProgress = {};
let skillQuestXp = {};
let tempChallengeArrSaved = {};
let oldSavedChallengeArr = [];
let assignedXpRewards = {};
let introRollSelected = false;
let introFancySelected = false;
let introDarkSelected = false;
let questFilterType = 'all';
let tempXpArr = null;
let tempXpChoices = [];
let tempSkillChoice = null;
let modalOutsideTime = 0;
let readyToExitModal = false;
let assignableSlayerTasks = {};
let slayerTasksCalculated = false;
let savedNotesType = null;
let savedNotesEl = null;
let chunkJustRolled = false;
let activeContextMenuOpen = false;
let activeContextMenuOpenTime = 0;
let backlogContextMenuOpen = false;
let actuallyHideChecked = true;
let onlyInitialData = true;
let hasUpdate = false;
let recentlyTestMode = false;
let selectedOverlay = 'None';
let imagesPreloaded = {};
let isPreloading = false;
let sectionChunkId;
let sectionMainUrl;
let sectionUrls = {};
let hoveredNumSection = '-1';
let selectedSections = {};
let sectionImgMain;
let sectionImgs = [];
let canvasSection;
let contextSection;
let chunkSectionCalculateAfter = false;
let signInAttempts = 0;
let expandChallengeStr = '';
let detailsStack = [];
let touchTime = 0;

let currentVersion = '6.2.2.1';
let patchNotesVersion = '6.0.0';

// Patreon Test Server Data
let onTestServer = false;
let patreonMaps = {
    'test': true, // testing
    'temp': true, // testing
    'dev': true, // testing
    'yvl': true, // testing
};

let roll5Mid = '';
let diary2Tier = '';
let unChunkMid = '';
let manualAreasOnly = 'ujt'; //Reel Booty

let contentCreators = {
};

// ----------------------------------------------------------

// Event Listeners

// ----------------------------------------------------------

let canvas;
let ctx;
let cw;
let ch;
let mapImg = new Image();
let imgW;
let imgH;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let dragTotalX = 0;
let dragTotalY = 0;
let mouseDown = false;
let totalZoom = 0.5;
let zoomAmount = 0.15;
let maxZoom = 3.5;
let minZoom = 0.225;
let futureMoveX = 0;
let futureMoveY = 0;
let moveAmountX = 0;
let moveAmountY = 0;
let tempChunks = {};
let tempSelectedChunks = [];
let recentChunks = {};
let animCount = 0;
let removedRecent = 0;
let controlChunk = 0;
let stickerChunk = 0;
let isHoveringBlacklist = false;
let isHoveringSticker = false;
let hoveredOverlayIds = [];
let selectedOverlayIds = [];
let selectedOverlayId = -1;
let selectedOverlayIndex = 0;
let overlayCloseLocation = -1;
let overlayLeftLocation = -1;
let overlayRightLocation = -1;
let overlayMenuLocation = -1;
let isHoveringClose = false;
let isHoveringLeft = false;
let isHoveringRight = false;
let isHoveringOverlayMenu = false;
let manualMouseMoveCheck = false;
let unlockedOverlayOnly = false;
let stickerChoicesContent = {'tag': '\uf02b', 'skull': '\uf54c', 'skull-crossbones': '\uf714', 'bomb': '\uf1e2', 'exclamation-circle': '\uf06a', 'dice': '\uf522', 'poo': '\uf2fe', 'frown': '\uf119', 'grin-alt': '\uf581', 'heart': '\uf004', 'star': '\uf005', 'gem': '\uf3a5', 'award': '\uf559', 'crown': '\uf521', 'flag': '\uf024', 'asterisk': '\uf069', 'clock': '\uf017', 'hourglass': '\uf254', 'link': '\uf0c1', 'map-marker-alt': '\uf3c5', 'radiation-alt': '\uf7ba', 'shoe-prints': '\uf54b', 'thumbs-down': '\uf165', 'thumbs-up': '\uf164', 'crow': '\uf520', 'utensil-spoon': '\uf2e5'};
let rs3Stickers = {};
let numberStickers = {'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'};
let chosenFromCinematic = null;
let imgNotLoaded = false;
let hoveredChunk = 0;
let colorBox = "rgba(150, 150, 150, 0.6)";
let colorBoxLight = "rgba(150, 150, 150, 0.4)";
let readyToDrawImage = false;
let readyToDrawIcons = stickerChoicesRS3.length;
let pageReady = false;
let lastRegain = 0;
let lastUpdated = 0;
let wildySlayerChunks = ['11835', '11836', '12090', '12091', '12345', '12347', '12601', '12605', '12857', '12858', '13115', '13116', '13368', 'Edgeville Dungeon', 'Forinthry Dungeon'];

let hintTexts = [
    "Join the ClanChat: 'Chunksters'!",
    "Join the Chunk Chat Discord!",
    "Celebrating over 4 years of Chunk Picking!",
    "Check out our OSRS Sister-site!",
    "Now with Custom Themes!"
];
let hintNum = Math.floor(Math.random() * hintTexts.length);
$('.loading-hint-2').text(hintTexts[hintNum]);

function escapeRegExp(string) {
    return string.replace(/[.*+?\^${}()|\[\]\\]/g, '\\$&');
}

function replaceAll(str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), ()=>replacement);
}

// Load rs3 sticker images
stickerChoicesRS3.forEach((sticker) => {
    rs3Stickers[sticker] = new Image;
    rs3Stickers[sticker].src = "resources/SVG/" + sticker + "-osrs.svg";
    rs3Stickers[sticker].addEventListener("load", e => {
        readyToDrawIcons--;
        if (readyToDrawImage && readyToDrawIcons === 0 && pageReady) {
            drawCanvas();
        }
    });
});

// Load map image
mapImg.addEventListener("load", e => {
    imgW = mapImg.width;
    imgH = mapImg.height;
    readyToDrawImage = true;
    if (readyToDrawImage && readyToDrawIcons === 0 && pageReady) {
        centerCanvas('quick');
    }
});
mapImg.src = "runescape_world_map.png?v=6.2.2.1";

// Rounded rectangle
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

// Set offset of canvas from corner
let reOffset = function() {
    let BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
}

// Convert x and y values to chunkId
let convertToChunkNum = function(x, y) {
    return x * (skip + rowSize) - y + startingIndex;
}

// Convert chunkId to x and y values
let convertToXY = function(chunkId) {
    let x = Math.abs(Math.ceil((chunkId - startingIndex) / (skip + rowSize)));
    let y;
    if (chunkId <= startingIndex) {
        y = startingIndex - chunkId;
    } else if ((skip + rowSize) - ((chunkId - startingIndex) % (skip + rowSize)) === skip + rowSize) {
        y = 0;
    } else {
        y = (skip + rowSize) - ((chunkId - startingIndex) % (skip + rowSize));
    }
    return {x: x, y: y};
}

// Converts canvas text into lines
let getLines = function(ctx, text, maxWidth) {
    var words = text.split(' ');
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

// Canvas animation
let drawCanvas = function() {
    if (imgH === undefined) {
        console.warn('Backup image loaded');
        imgW = mapImg.width;
        imgH = mapImg.height;
        dragTotalX = 0;
        dragTotalY = 0;
        setUpSelected();
        drawCanvas();
        return;
    } else {
        window.requestAnimationFrame(drawCanvas);
    }
    fixMapEdgesCanvas();
    updateFutureMove();
    selectedNum = tempSelectedChunks.length;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(mapImg, dragTotalX, dragTotalY, totalZoom * imgW, totalZoom * imgH);

    // Chunks
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = highVisibilityMode ? 1 : 2;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < (fullSize / rowSize); j++) {
            let chunkId = convertToChunkNum(i, j).toString();
            if (!!tempChunks['unlocked'] && tempChunks['unlocked'][chunkId]) {
                if (hoveredChunk === chunkId) {
                    ctx.fillStyle = 'rgba(200, 200, 200, 0.25)';
                    ctx.fillRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                }
                ctx.strokeStyle = 'gray';
                (!highVisibilityMode || totalZoom > 0.3) && ctx.strokeRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
            } else if (!!tempChunks['selected'] && tempChunks['selected'][chunkId]) {
                if (highVisibilityMode) {
                    ctx.fillStyle = 'rgba(100, 255, 100, 0.25)';
                } else if (hoveredChunk === chunkId) {
                    ctx.fillStyle = 'rgba(100, 255, 100, 0.33)';
                } else {
                    ctx.fillStyle = 'rgba(100, 255, 100, 0.5)';
                }
                ctx.strokeStyle = highVisibilityMode ? 'rgba(0, 0, 0, 0.5)' : 'black';
                (!highVisibilityMode || totalZoom > 0.3) && ctx.strokeRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                ctx.fillRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                let heightOff;
                if (tempSelectedChunks.indexOf(chunkId) + 1 > 999) {
                    ctx.font = (totalZoom * (imgW / rowSize) * (1 / 2)) + 'px Calibri, Roboto Condensed, sans-serif';
                    heightOff = 0.65;
                } else if (tempSelectedChunks.indexOf(chunkId) + 1 > 99) {
                    ctx.font = (totalZoom * (imgW / rowSize) * (2 / 3)) + 'px Calibri, Roboto Condensed, sans-serif';
                    heightOff = 0.7;
                } else {
                    ctx.font = (totalZoom * (imgW / rowSize)) + 'px Calibri, Roboto Condensed, sans-serif';
                    heightOff = 0.825;
                }
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText(tempSelectedChunks.indexOf(chunkId) + 1, dragTotalX + (totalZoom * ((i + 0.5) * imgW / rowSize)), dragTotalY + (totalZoom * ((j + heightOff) * imgH / (fullSize / rowSize))));
            } else if (!!tempChunks['potential'] && tempChunks['potential'][chunkId]) {
                if (highVisibilityMode) {
                    ctx.fillStyle = 'rgba(255, 255, 100, 0.25)';
                } else if (hoveredChunk === chunkId) {
                    ctx.fillStyle = 'rgba(255, 255, 100, 0.33)';
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 100, 0.5)';
                }
                ctx.strokeStyle = highVisibilityMode ? 'rgba(0, 0, 0, 0.5)' : 'black';
                (!highVisibilityMode || totalZoom > 0.3) && ctx.strokeRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                ctx.fillRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                let heightOff;
                if (selectedNum + 1 > 999) {
                    ctx.font = (totalZoom * (imgW / rowSize) * (1 / 2)) + 'px Calibri, Roboto Condensed, sans-serif';
                    heightOff = 0.65;
                } else if (selectedNum + 1 > 99) {
                    ctx.font = (totalZoom * (imgW / rowSize) * (2 / 3)) + 'px Calibri, Roboto Condensed, sans-serif';
                    heightOff = 0.7;
                } else {
                    ctx.font = (totalZoom * (imgW / rowSize)) + 'px Calibri, Roboto Condensed, sans-serif';
                    heightOff = 0.825;
                }
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.fillText(++selectedNum, dragTotalX + (totalZoom * ((i + 0.5) * imgW / rowSize)), dragTotalY + (totalZoom * ((j + heightOff) * imgH / (fullSize / rowSize))));
            } else if (!!tempChunks['blacklisted'] && tempChunks['blacklisted'][chunkId]) {
                if (highVisibilityMode) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                } else if (hoveredChunk === chunkId) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                } else {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                }
                ctx.strokeStyle = highVisibilityMode ? 'rgba(0, 0, 0, 0.5)' : 'black';
                (!highVisibilityMode || totalZoom > 0.3) && ctx.strokeRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                ctx.fillRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
            } else {
                if (highVisibilityMode) {
                    ctx.fillStyle = colorBoxLight;
                } else if (hoveredChunk === chunkId) {
                    ctx.fillStyle = colorBoxLight;
                } else {
                    ctx.fillStyle = colorBox;
                }
                ctx.strokeStyle = highVisibilityMode ? 'rgba(0, 0, 0, 0.5)' : 'black';
                (!highVisibilityMode || totalZoom > 0.3) && ctx.strokeRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
                ctx.fillRect(dragTotalX + (totalZoom * (i * imgW / rowSize)), dragTotalY + (totalZoom * (j * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
            }
            if (showChunkIds && !onMobile) {
                ctx.fillStyle = 'white';
                ctx.font = (totalZoom * (imgW / rowSize) * (1 / 5)) + 'px Calibri, Roboto Condensed, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(chunkId, dragTotalX + (totalZoom * ((i) * imgW / rowSize)), dragTotalY + (totalZoom * ((j + 0.15) * imgH / (fullSize / rowSize))));
            }
        }
    }

    // Locked chunk
    if (infoLockedId !== -1) {
        let {x, y} = convertToXY(infoLockedId);
        if (highVisibilityMode) {
            ctx.fillStyle = 'rgba(0, 255, 255, 0.25)';
        } else if (hoveredChunk === infoLockedId) {
            ctx.fillStyle = 'rgba(0, 255, 255, 0.25)';
        } else {
            ctx.fillStyle = 'rgba(0, 255, 255, 0.33)';
        }
        ctx.strokeStyle = 'rgb(0, 170, 170)';
        ctx.fillRect(dragTotalX + (totalZoom * (x * imgW / rowSize)), dragTotalY + (totalZoom * (y * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
        ctx.strokeRect(dragTotalX + (totalZoom * (x * imgW / rowSize)), dragTotalY + (totalZoom * (y * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
        ctx.font = '900 ' + (totalZoom * (imgW / rowSize)) * (0.9) + 'px "Font Awesome 5 Free"';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.75)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.textAlign = 'center';
        ctx.fillText('\uf129', dragTotalX + (totalZoom * ((x + 0.5) * imgW / rowSize)), dragTotalY + (totalZoom * ((y + 0.825) * imgH / (fullSize / rowSize))));
        ctx.strokeText('\uf129', dragTotalX + (totalZoom * ((x + 0.5) * imgW / rowSize)), dragTotalY + (totalZoom * ((y + 0.825) * imgH / (fullSize / rowSize))));
    }

    // Recent chunks
    ctx.save();
    !!recentChunks && !onMobile && Object.keys(recentChunks).forEach((chunkId) => {
        let {x, y} = convertToXY(chunkId);
        ctx.shadowColor = 'white';
        if ((!!tempChunks['unlocked'] && tempChunks['unlocked'][chunkId]) || (!!tempChunks['potential'] && tempChunks['potential'][chunkId])) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        } else if (!!tempChunks['selected'] && tempChunks['selected'][chunkId]) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else if (!!tempChunks['blacklisted'] && tempChunks['blacklisted'][chunkId]) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        }
        ctx.shadowBlur = Math.abs((Math.floor(animCount / 1.5) % 50) - 25) + 5;
        ctx.fillRect(dragTotalX + (totalZoom * (x * imgW / rowSize)), dragTotalY + (totalZoom * (y * imgH / (fullSize / rowSize))), totalZoom * (imgW / rowSize), totalZoom * (imgH / (fullSize / rowSize)));
    });
    ctx.restore();

    // Control chunk
    ctx.save();
    if (controlChunk !== 0 && (!locked || testMode) && !onMobile) {
        let {x, y} = convertToXY(controlChunk);
        let heightOff = 0.55;
        let blacklistText = (!!tempChunks['blacklisted'] && tempChunks['blacklisted'].hasOwnProperty(controlChunk)) ? 'Un-Blacklist' : 'Blacklist';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.roundRect(dragTotalX + (totalZoom * ((x + 0.05) * imgW / rowSize)), dragTotalY + (totalZoom * ((y + 0.375) * imgH / (fullSize / rowSize))), totalZoom * ((0.9) * imgW / rowSize), totalZoom * ((0.25) * imgH / (fullSize / rowSize)), totalZoom * ((0.9) * imgW / rowSize)).fill();
        ctx.font = (totalZoom * (imgW / rowSize) * (1 / 6)) + 'px Calibri, Roboto Condensed, sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(blacklistText, dragTotalX + (totalZoom * ((x + 0.5) * imgW / rowSize)), dragTotalY + (totalZoom * ((y + heightOff) * imgH / (fullSize / rowSize))));
    }
    ctx.restore();

    // Stickered chunks
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.lineWidth = (totalZoom * (imgW / rowSize)) * (0.01);
    !!tempChunks['stickered'] && Object.keys(tempChunks['stickered']).forEach(function(chunkId) {
        let {x, y} = convertToXY(chunkId);
        if (stickerChoices.includes(tempChunks['stickered'][chunkId])) {
            ctx.scale(-1, 1);
            ctx.font = '900 ' + (totalZoom * (imgW / rowSize)) * (0.25) + 'px "Font Awesome 5 Free"';
            ctx.fillStyle = tempChunks['stickeredColors'][chunkId];
            ctx.fillText(stickerChoicesContent[tempChunks['stickered'][chunkId]], -(dragTotalX + (totalZoom * ((x + 0.85) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.25) * imgH / (fullSize / rowSize))));
            if (ctx.fillStyle !== '#000000') {
                ctx.strokeText(stickerChoicesContent[tempChunks['stickered'][chunkId]], -(dragTotalX + (totalZoom * ((x + 0.85) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.25) * imgH / (fullSize / rowSize))));
            }
            ctx.scale(-1, 1);
        } else if (stickerChoicesRS3.includes(tempChunks['stickered'][chunkId])) {
            ctx.drawImage(rs3Stickers[tempChunks['stickered'][chunkId]], (dragTotalX + (totalZoom * ((x + 0.725) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.025) * imgH / (fullSize / rowSize))), (totalZoom * (imgW / rowSize)) * (0.25), (totalZoom * (imgW / rowSize)) * (0.25));
        } else if (stickerChoicesNumbers.includes(tempChunks['stickered'][chunkId])) {
            ctx.font = '900 ' + (totalZoom * (imgW / rowSize) * (1 / 2.75)) + 'px Calibri, Roboto Condensed, sans-serif';
            ctx.fillStyle = tempChunks['stickeredColors'][chunkId];
            ctx.fillText(numberStickers[tempChunks['stickered'][chunkId]], (dragTotalX + (totalZoom * ((x + 0.9) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.25) * imgH / (fullSize / rowSize))));
            if (ctx.fillStyle !== '#000000') {
                ctx.strokeText(numberStickers[tempChunks['stickered'][chunkId]], (dragTotalX + (totalZoom * ((x + 0.9) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.25) * imgH / (fullSize / rowSize))));
            }
        }
    });
    ctx.restore();

    chunkBordersCanvas();

    // Control sticker chunk
    ctx.save();
    if (stickerChunk !== 0) {
        if ((!tempChunks['stickered'] || !tempChunks['stickered'].hasOwnProperty(stickerChunk)) && (!locked || testMode)) {
            let {x, y} = convertToXY(stickerChunk);
            ctx.strokeStyle = 'black';
            ctx.textAlign = 'center';
            ctx.lineWidth = (totalZoom * (imgW / rowSize)) * (0.01);
            ctx.font = '900 ' + (totalZoom * (imgW / rowSize)) * (0.25) + 'px "Font Awesome 5 Free"';
            ctx.fillStyle = 'rgb(201, 209, 217)';
            ctx.scale(-1, 1);
            ctx.fillText(stickerChoicesContent['tag'], -(dragTotalX + (totalZoom * ((x + 0.85) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.25) * imgH / (fullSize / rowSize))));
            ctx.strokeText(stickerChoicesContent['tag'], -(dragTotalX + (totalZoom * ((x + 0.85) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.25) * imgH / (fullSize / rowSize))));
        }
        if (isHoveringSticker && !!tempChunks['stickeredNotes'] && tempChunks['stickeredNotes'].hasOwnProperty(stickerChunk) && tempChunks['stickeredNotes'][stickerChunk] !== '') {
            let {x, y} = convertToXY(stickerChunk);
            ctx.font = (totalZoom * (imgW / rowSize) * (1 / 6)) + 'px Calibri, Roboto Condensed, sans-serif';
            ctx.fillStyle = 'rgb(201, 209, 217)';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fillRect((dragTotalX + (totalZoom * ((x + 1.1) * imgW / rowSize))) - 5, dragTotalY + (totalZoom * ((y + 0.025) * imgH / (fullSize / rowSize))), ctx.measureText(tempChunks['stickeredNotes'][stickerChunk]).width + 10, (totalZoom * (0.25 * imgH / (fullSize / rowSize))));
            ctx.strokeRect((dragTotalX + (totalZoom * ((x + 1.1) * imgW / rowSize))) - 5, dragTotalY + (totalZoom * ((y + 0.025) * imgH / (fullSize / rowSize))), ctx.measureText(tempChunks['stickeredNotes'][stickerChunk]).width + 10, (totalZoom * (0.25 * imgH / (fullSize / rowSize))));
            ctx.fillStyle = 'black';
            ctx.textAlign = 'left';
            ctx.fillText(tempChunks['stickeredNotes'][stickerChunk], (dragTotalX + (totalZoom * ((x + 1.1) * imgW / rowSize))), dragTotalY + (totalZoom * ((y + 0.2) * imgH / (fullSize / rowSize))));
        }
    }
    ctx.restore();

    // Overlays
    ctx.save();
    !!chunkInfo['mapOverlays'] && selectedOverlay !== 'None' && !!chunkInfo['mapOverlays'][selectedOverlay] && chunkInfo['mapOverlays'][selectedOverlay].forEach((overlayEl, i) => {
        if ((selectedOverlay !== 'Clues' || selectedOverlayClues[overlayEl.type]) && (selectedOverlayIds.length === 0 || i !== selectedOverlayId) && overlayEl.x >= 1024 && overlayEl.x <= 3967 && overlayEl.y >= 2496 && overlayEl.y <= 4159 && (!unlockedOverlayOnly || (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(convertToChunkNum(Math.floor((overlayEl.x - 1024)/64), (fullSize / rowSize) - Math.floor((overlayEl.y - 2496)/64) - 1))))) {
            ctx.textAlign = 'center';
            ctx.font = '900 ' + 36 + 'px "Font Awesome 5 Free"';
            ctx.fillStyle = 'white';
            ctx.fillText(stickerChoicesContent['map-marker-alt'], (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 4);
            ctx.font = '900 ' + 32 + 'px "Font Awesome 5 Free"';
            ctx.fillStyle = hoveredOverlayIds.includes(i) && !isHoveringOverlayMenu ? 'black' : overlayEl.color;
            ctx.fillText(stickerChoicesContent['map-marker-alt'], (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 6);
            if (selectedOverlayIds.length !== 0 && selectedOverlayIds.includes(i)) {
                ctx.fillStyle = 'rgba(30, 30, 30, 0.5)';
                ctx.fillText(stickerChoicesContent['map-marker-alt'], (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 6);
            }
            ctx.beginPath();
            ctx.arc((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 22, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    });
    ctx.restore();

    ctx.save();
    if (!!chunkInfo['mapOverlays'] && selectedOverlay !== 'None' && !!chunkInfo['mapOverlays'][selectedOverlay] && selectedOverlayIds.length !== 0) {
        let overlayEl = chunkInfo['mapOverlays'][selectedOverlay][selectedOverlayId];
        ctx.textAlign = 'center';
        ctx.font = '900 ' + 36 + 'px "Font Awesome 5 Free"';
        ctx.fillStyle = 'white';
        ctx.fillText(stickerChoicesContent['map-marker-alt'], (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 4);
        ctx.font = '900 ' + 32 + 'px "Font Awesome 5 Free"';
        ctx.fillStyle = hoveredOverlayIds.includes(selectedOverlayId) && !isHoveringOverlayMenu ? 'black' : overlayEl.color;
        ctx.fillText(stickerChoicesContent['map-marker-alt'], (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 6);
        ctx.fillStyle = 'rgba(200, 200, 200, 0.25)';
        ctx.fillText(stickerChoicesContent['map-marker-alt'], (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 6);
        ctx.beginPath();
        ctx.arc((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))), dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 22, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue('--color1');
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        let topText = `${overlayEl.type} Step`;
        if (overlayEl.hasOwnProperty('img')) {
            ctx.font = 'bold 24px Calibri, Roboto Condensed, sans-serif';
            ctx.fillRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 199, 200, 24);
            ctx.strokeRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 199, 200, 24);
            ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue('--colorText');
            ctx.textAlign = 'left';
            ctx.fillText(topText, (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 22, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180);
            ctx.font = '900 ' + 18 + 'px "Font Awesome 5 Free"';
            selectedOverlayIndex > 0 && selectedOverlayIds.length > 1 && ctx.fillText('\uf053', (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 165, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180);
            selectedOverlayIndex < (selectedOverlayIds.length - 1) && ctx.fillText('\uf054', (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 180, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180);
            ctx.font = '900 ' + 24 + 'px "Font Awesome 5 Free"';
            ctx.fillText('\uf00d', (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 200, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180);
            ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue('--color1');
            ctx.strokeStyle = 'black';
            let overlayImg = new Image();
            overlayImg.src = overlayEl.img;
            ctx.fillRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 175, 200, 200);
            ctx.strokeRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 175, 200, 200);
            ctx.drawImage(overlayImg, (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 25, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 170, 190, 190);
            overlayCloseLocation = [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 200, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180];
            overlayLeftLocation = (selectedOverlayIndex > 0 && selectedOverlayIds.length > 1 ? [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 165, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180] : -1);
            overlayRightLocation = (selectedOverlayIndex < (selectedOverlayIds.length - 1) ? [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 180, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180] : -1);
            overlayMenuLocation = [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 199, (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20 + 200, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 175 + 200];
        } else {
            ctx.font = '18px Calibri, Roboto Condensed, sans-serif';
            let hoverText = `${overlayEl.text}`;
            let hoverTextLines = getLines(ctx, hoverText, 190);
            ctx.font = 'bold 24px Calibri, Roboto Condensed, sans-serif';
            ctx.fillRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 199 + (200 - (hoverTextLines.length * 19 + 10)), 200, 24);
            ctx.strokeRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 199 + (200 - (hoverTextLines.length * 19 + 10)), 200, 24);
            ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue('--colorText');
            ctx.textAlign = 'left';
            ctx.fillText(topText, (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 22, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10)));
            ctx.font = '900 ' + 18 + 'px "Font Awesome 5 Free"';
            selectedOverlayIndex > 0 && selectedOverlayIds.length > 1 && ctx.fillText('\uf053', (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 165, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10)));
            selectedOverlayIndex < (selectedOverlayIds.length - 1) && ctx.fillText('\uf054', (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 180, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10)));
            ctx.font = '900 ' + 24 + 'px "Font Awesome 5 Free"';
            ctx.fillText('\uf00d', (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 200, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10)));
            ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue('--color1');
            ctx.strokeStyle = 'black';
            ctx.font = '18px Calibri, Roboto Condensed, sans-serif';
            ctx.fillRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 175 + (200 - (hoverTextLines.length * 19 + 10)), 200, (hoverTextLines.length * 19 + 10));
            ctx.strokeRect((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 175 + (200 - (hoverTextLines.length * 19 + 10)), 200, (hoverTextLines.length * 19 + 10));
            ctx.fillStyle = getComputedStyle(ctx.canvas).getPropertyValue('--colorText');
            ctx.textAlign = 'left';
            hoverTextLines.forEach((hoverTextLine, i) => {
                ctx.fillText(hoverTextLine, (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 25, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 155 + (19 * i) + (200 - (hoverTextLines.length * 19 + 10)));
            });
            overlayCloseLocation = [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 200, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10))];
            overlayLeftLocation = (selectedOverlayIndex > 0 && selectedOverlayIds.length > 1 ? [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 165, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10))] : -1);
            overlayRightLocation = (selectedOverlayIndex < (selectedOverlayIds.length - 1) ? [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 180, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 180 + (200 - (hoverTextLines.length * 19 + 10))] : -1);
            overlayMenuLocation = [(dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 199 + (200 - (hoverTextLines.length * 19 + 10)), (dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) + 20 + 200, dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 175 + (200 - (hoverTextLines.length * 19 + 10)) + (hoverTextLines.length * 19 + 10)];
        }
    } else {
        overlayCloseLocation = -1;
        overlayLeftLocation = -1;
        overlayRightLocation = -1;
        overlayMenuLocation = -1;
    }
    ctx.restore();


    if (selectedOverlay !== 'None') {
        $('#canvas').css('cursor', (hoveredOverlayIds.length !== 0 && !isHoveringOverlayMenu) || isHoveringClose || isHoveringLeft || isHoveringRight ? 'pointer' : 'auto');
    }

    if (manualMouseMoveCheck) {
        handleMouseMove(manualMouseMoveCheck);
        manualMouseMoveCheck = false;
    }
    animCount++;
}

// Listen for click events on body for clicking out of modals
document.body.addEventListener('mousedown', function (event) {
    let rect;
    let hasSet = false;
    if (searchDetailsModalOpen) {
        rect = $('#myModal11 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (detailsModalOpen) {
        rect = $('#myModal2 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (manualModalOpen) {
        rect = $('#myModal .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (rulesModalOpen) {
        rect = $('#myModal4 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (settingsModalOpen) {
        rect = $('#myModal7 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (randomListModalOpen) {
        rect = $('#myModal8 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (statsErrorModalOpen) {
        rect = $('#myModal9 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (searchModalOpen) {
        rect = $('#myModal10 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (addEquipmentModalOpen) {
        rect = $('#myModal15 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (highestModalOpen) {
        rect = $('#myModal12 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (questStepsModalOpen) {
        rect = $('#myModal25 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (methodsModalOpen) {
        rect = $('#myModal13 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (slayerMasterInfoModalOpen) {
        rect = $('#myModal32 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (doableClueStepsModalOpen) {
        rect = $('#myModal33 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (clueChunksModalOpen) {
        rect = $('#myModal34 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (notesOpen) {
        rect = $('#myModal35 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (highest2ModalOpen) {
        rect = $('#myModal12_2 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (completeModalOpen) {
        rect = $('#myModal14 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (stickerModalOpen) {
        rect = $('#myModal16 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (backlogSourcesModalOpen) {
        rect = $('#myModal17 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (chunkHistoryModalOpen) {
        rect = $('#myModal18 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (challengeAltsModalOpen) {
        rect = $('#myModal19 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (manualOuterModalOpen) {
        rect = $('#myModal20 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (monsterModalOpen) {
        rect = $('#myModal21 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (patchNotesOpen) {
        rect = $('#myModal24 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (friendsListModalOpen) {
        rect = $('#myModal26 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (manualAreasModalOpen) {
        rect = $('#myModal31 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (chunkSectionsModalOpen) {
        rect = $('#myModal42 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (chunkSectionPickerModalOpen) {
        rect = $('#myModal43 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (clipboardModalOpen) {
        rect = $('#myModal38 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (overlaysModalOpen) {
        rect = $('#myModal39 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    }
    // ------
    if (hasSet && !(event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) && (modalOutsideTime + 100 < Date.now())) {
        readyToExitModal = true;
        rect = null;
    } else {
        readyToExitModal = false;
    }
});

// Listen for click events on body for clicking out of modals
document.body.addEventListener('mouseup', function (event) {
    let rect;
    let hasSet = false;
    if (searchDetailsModalOpen) {
        rect = $('#myModal11 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (detailsModalOpen) {
        rect = $('#myModal2 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (manualModalOpen) {
        rect = $('#myModal .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (rulesModalOpen) {
        rect = $('#myModal4 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (settingsModalOpen) {
        rect = $('#myModal7 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (randomListModalOpen) {
        rect = $('#myModal8 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (statsErrorModalOpen) {
        rect = $('#myModal9 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (searchModalOpen) {
        rect = $('#myModal10 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (addEquipmentModalOpen) {
        rect = $('#myModal15 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (highestModalOpen) {
        rect = $('#myModal12 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (questStepsModalOpen) {
        rect = $('#myModal25 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (methodsModalOpen) {
        rect = $('#myModal13 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (slayerMasterInfoModalOpen) {
        rect = $('#myModal32 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (doableClueStepsModalOpen) {
        rect = $('#myModal33 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (clueChunksModalOpen) {
        rect = $('#myModal34 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (notesOpen) {
        rect = $('#myModal35 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (highest2ModalOpen) {
        rect = $('#myModal12_2 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (completeModalOpen) {
        rect = $('#myModal14 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (stickerModalOpen) {
        rect = $('#myModal16 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (backlogSourcesModalOpen) {
        rect = $('#myModal17 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (chunkHistoryModalOpen) {
        rect = $('#myModal18 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (challengeAltsModalOpen) {
        rect = $('#myModal19 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (manualOuterModalOpen) {
        rect = $('#myModal20 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (monsterModalOpen) {
        rect = $('#myModal21 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (patchNotesOpen) {
        rect = $('#myModal24 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (friendsListModalOpen) {
        rect = $('#myModal26 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (manualAreasModalOpen) {
        rect = $('#myModal31 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (chunkSectionsModalOpen) {
        rect = $('#myModal42 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (chunkSectionPickerModalOpen) {
        rect = $('#myModal43 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (clipboardModalOpen) {
        rect = $('#myModal38 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    } else if (overlaysModalOpen) {
        rect = $('#myModal39 .modal-content')[0].getBoundingClientRect();
        hasSet = true;
    }
    // ------
    if (hasSet && !(event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) && (modalOutsideTime + 100 < Date.now()) && readyToExitModal) {
        manualModalOpen && !detailsModalOpen && closeManualAdd();
        highest2ModalOpen && !detailsModalOpen && !methodsModalOpen && !questStepsModalOpen && !slayerMasterInfoModalOpen && !slayerLockedModalOpen && !doableClueStepsModalOpen && !clueChunksModalOpen && !passiveSkillModalOpen && closeHighest2();
        highestModalOpen && !addEquipmentModalOpen && !searchDetailsModalOpen && !detailsModalOpen && closeHighest();
        questStepsModalOpen && !detailsModalOpen && closeQuestSteps();
        methodsModalOpen && !detailsModalOpen && closeMethods();
        searchModalOpen && !searchDetailsModalOpen && !detailsModalOpen && closeSearch();
        detailsModalOpen && !searchDetailsModalOpen && closeChallengeDetails();
        rulesModalOpen && !presetWarningModalOpen && closeRules();
        settingsModalOpen && !mapIntroOpen && closeSettings();
        randomListModalOpen && closeRandomList();
        statsErrorModalOpen && closeStatsError();
        searchDetailsModalOpen && closeSearchDetails();
        completeModalOpen && closeComplete();
        addEquipmentModalOpen && closeAddEquipment();
        stickerModalOpen && closeSticker();
        backlogSourcesModalOpen && closeBacklogSources();
        chunkHistoryModalOpen && closeChunkHistory();
        challengeAltsModalOpen && closeChallengeAlts();
        manualOuterModalOpen && closeOuterAdd();
        monsterModalOpen && closeMonstersAdd();
        patchNotesOpen && dismissPatchNotes();
        friendsListModalOpen && !friendsAddModalOpen && closeFriendsList();
        manualAreasModalOpen && closeManualAreas();
        chunkSectionsModalOpen && !chunkSectionPickerModalOpen && closeChunkSections();
        slayerMasterInfoModalOpen && closeSlayerMasterInfo();
        doableClueStepsModalOpen && closeDoableClueSteps();
        clueChunksModalOpen && closeClueChunks();
        clipboardModalOpen && closeClipboard();
        overlaysModalOpen && closeOverlays();
        notesOpen && !notesEditing && closeChunkNotes();
        rect = null;
    }
});

// Handles mouse down event
let handleMouseDown = function(e) {
    if ((e.button !== 0 && !e.touches) || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || mapIntroOpen || xpRewardOpen || manualAreasModalOpen || chunkSectionsModalOpen || chunkSectionPickerModalOpen || slayerMasterInfoModalOpen || doableClueStepsModalOpen || clueChunksModalOpen || notesOpen || newTasksOpen || clipboardModalOpen || overlaysModalOpen || exitSandboxWarningModalOpen || mobileMenuOpen || mobileTasksOpen) {
        return;
    }
    if (!!e.touches) {
        let touch = e.touches[0];

        startX = touch.clientX - offsetX;
        startY = touch.clientY - offsetY;
    } else {
        e.preventDefault();
        e.stopPropagation();

        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
    }
    mouseDown = true;
    movedNum = 0;
    if (e.type === 'touchstart') {
        touchTime = Date.now();
    }
}

// Handles mouse move event
let handleMouseMove = function(e) {
    if ((e.button !== 0 && !e.touches) || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || mapIntroOpen || xpRewardOpen || manualAreasModalOpen || chunkSectionsModalOpen || chunkSectionPickerModalOpen || slayerMasterInfoModalOpen || doableClueStepsModalOpen || clueChunksModalOpen || notesOpen || newTasksOpen || clipboardModalOpen || overlaysModalOpen || exitSandboxWarningModalOpen || mobileMenuOpen || mobileTasksOpen) {
        return;
    }
    if (!highVisibilityMode && !onMobile) {
        hoveredChunk = convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize))))).toString();
    } else {
        hoveredChunk = 0;
    }

    if (!!e.touches) {
        let touch = e.touches[0];

        currentX = touch.clientX - offsetX;
        currentY = touch.clientY - offsetY;

        // Panning
        if (mouseDown) {
            movedNum++;

            let xMove = currentX - startX;
            let yMove = currentY - startY;
            dragTotalX += xMove;
            dragTotalY += yMove;

            startX = currentX;
            startY = currentY;
        }
    } else {
        let hoverId = 0;

        currentX = e.clientX - offsetX;
        currentY = e.clientY - offsetY;

        // Panning
        if (mouseDown) {
            e.preventDefault();
            e.stopPropagation();

            movedNum++;

            let xMove = currentX - startX;
            let yMove = currentY - startY;
            dragTotalX += xMove;
            dragTotalY += yMove;

            startX = currentX;
            startY = currentY;
        }

        // Recent hover
        if (!!recentChunks && Object.keys(recentChunks).length > 0) {
            if (hoverId === 0) {
                hoverId = convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))));
            }
            if (removedRecent !== hoverId && hoverId !== 0 && removedRecent !== 0) {
                delete recentChunks[removedRecent];
                hoverId = 0;
                removedRecent = 0;
            }
            if (recentChunks.hasOwnProperty(hoverId)) {
                removedRecent = hoverId;
            }
        }

        isHoveringClose = overlayCloseLocation.length === 2 && (overlayCloseLocation[0] - currentX) >= -19 && (overlayCloseLocation[0] - currentX) <= 0 && (overlayCloseLocation[1] - currentY) <= 19 && (overlayCloseLocation[1] - currentY) >= 0;
        isHoveringLeft = overlayLeftLocation.length === 2 && (overlayLeftLocation[0] - currentX) >= -12 && (overlayLeftLocation[0] - currentX) <= 0 && (overlayLeftLocation[1] - currentY) <= 12 && (overlayLeftLocation[1] - currentY) >= 0 && selectedOverlayIndex > 0 && selectedOverlayIds.length > 1;
        isHoveringRight = overlayRightLocation.length === 2 && (overlayRightLocation[0] - currentX) >= -12 && (overlayRightLocation[0] - currentX) <= 0 && (overlayRightLocation[1] - currentY) <= 12 && (overlayRightLocation[1] - currentY) >= 0 && selectedOverlayIndex < (selectedOverlayIds.length - 1);
        isHoveringOverlayMenu = overlayMenuLocation.length === 4 && currentX >= overlayMenuLocation[0] && currentY >= overlayMenuLocation[1] && currentX <= overlayMenuLocation[2] && currentY <= overlayMenuLocation[3];

        // Overlay hover
        if (!!chunkInfo['mapOverlays'] && selectedOverlay !== 'None' && !!chunkInfo['mapOverlays'][selectedOverlay] && false) { // Not implemented
            hoveredOverlayIds = [];
            let lowestDistance = 100;
            e.target.id === 'canvas' && chunkInfo['mapOverlays'][selectedOverlay].forEach((overlayEl, i) => {
                if ((overlayEl.text || overlayEl.img) && (selectedOverlay !== 'Clues' || selectedOverlayClues[overlayEl.type]) && overlayEl.x >= 1024 && overlayEl.x <= 3967 && overlayEl.y >= 2496 && overlayEl.y <= 4159 && (!unlockedOverlayOnly || (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(convertToChunkNum(Math.floor((overlayEl.x - 1024)/64), (fullSize / rowSize) - Math.ceil((overlayEl.y - 2495)/64)))))) {
                    let distance = Math.sqrt(Math.pow((dragTotalX + (totalZoom * (((overlayEl.x/64) - 16) * imgW / rowSize))) - currentX, 2) + Math.pow((dragTotalY + (totalZoom * ((65 - (overlayEl.y/64)) * imgH / (fullSize / rowSize))) - 6 - 15) - currentY, 2));
                    if (distance < 15 && distance < lowestDistance) {
                        hoveredOverlayIds.push(i);
                        distance = distance;
                    }
                }
            });
        }
        
        // Control
        if (controlChunk !== 0 && controlChunk === convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))))) {
            if ((currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) >= 0.05 && (currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) <= 0.95 &&
                ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) >= 0.375 && ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) <= 0.625) {
                isHoveringBlacklist = true;
            } else {
                isHoveringBlacklist = false;
            }
        } else {
            isHoveringBlacklist = false;
        }
        if (stickerChunk !== 0 && stickerChunk === convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))))) {
            if ((currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) >= 0.7 && (currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) <= 0.95 &&
                ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) >= 0.05 && ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) <= 0.3) {
                isHoveringSticker = true;
            } else {
                isHoveringSticker = false;
            }
        } else {
            isHoveringSticker = false;
        }
        if ((isHoveringBlacklist || isHoveringSticker) && (!locked || testMode)) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }
    }
}

// Checks if chunk is locked
let checkIfGray = function(chunkId) {
    return (!tempChunks['unlocked'] || !tempChunks['unlocked'].hasOwnProperty(chunkId)) && (!tempChunks['selected'] || !tempChunks['selected'].hasOwnProperty(chunkId)) && (!tempChunks['potential'] || !tempChunks['potential'].hasOwnProperty(chunkId));
}

// Handles the key down event
let handleKeyDown = function(e) {
    let hoverId = 0;

    // Control key
    if (e.key === 'Control' || e.key === 'Meta') {
        if (hoverId === 0) {
            hoverId = convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))));
        }
        if (checkIfGray(hoverId)) {
            controlChunk = hoverId;
            if (controlChunk !== 0) {
                if ((currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) >= 0.05 && (currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) <= 0.95 &&
                    ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) >= 0.375 && ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) <= 0.625) {
                    isHoveringBlacklist = true;
                } else {
                    isHoveringBlacklist = false;
                }
            } else {
                isHoveringBlacklist = false;
            }
        } else {
            controlChunk = 0;
        }
        stickerChunk = hoverId;
        if (stickerChunk !== 0) {
            if ((currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) >= 0.7 && (currentX - dragTotalX) / (totalZoom * (imgW / rowSize)) - Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))) <= 0.95 &&
                ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) >= 0.05 && ((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) - Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))) <= 0.3) {
                isHoveringSticker = true;
            } else {
                isHoveringSticker = false;
            }
        } else {
            isHoveringSticker = false;
        }
    } else {
        controlChunk = 0;
        stickerChunk = 0;
    }
    if ((isHoveringBlacklist || isHoveringSticker) && (!locked || testMode)) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
}

// Handles the kup up event
let handleKeyUp = function(e) {
    // Control key
    if (e.key === 'Control' || e.key === 'Meta') {
        controlChunk = 0;
        stickerChunk = 0;
        isHoveringBlacklist = false;
        isHoveringSticker = false;
        canvas.style.cursor = "default";
    }
}

// Handles the mouse up event
let handleMouseUp = function(e) {
    if ((e.button !== 0 && e.button !== 2) || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || mapIntroOpen || xpRewardOpen || manualAreasModalOpen || chunkSectionsModalOpen || chunkSectionPickerModalOpen || slayerMasterInfoModalOpen || doableClueStepsModalOpen || clueChunksModalOpen || notesOpen || newTasksOpen || clipboardModalOpen || overlaysModalOpen || exitSandboxWarningModalOpen || mobileMenuOpen || mobileTasksOpen) {
        return;
    }
    if (e.button === 2 && e.target.id === 'canvas') {
        e.preventDefault();
        e.stopPropagation();
        currentX = e.clientX - offsetX;
        currentY = e.clientY - offsetY;
        let chunkId = convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))));
        let coords = convertToXY(chunkId);
        if (coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) {
            return;
        }
        if (infoLockedId === chunkId.toString()) {
            infoLockedId = -1;
        } else {
            infoLockedId = chunkId.toString();
        }
        updateChunkInfo();
        return;
    } else if (e.button === 0) {
        mouseDown = false;
        if (movedNum <= 1 && isHoveringClose) {
            selectedOverlayIds = [];
            selectedOverlayIndex = 0;
            overlayCloseLocation = -1;
            isHoveringClose = false;
            return;
        } else if (movedNum <= 1 && isHoveringLeft) {
            if (selectedOverlayIndex > 0) {
                selectedOverlayIndex--;
            }
            selectedOverlayId = selectedOverlayIds[selectedOverlayIndex];
            manualMouseMoveCheck = e;
            return;
        } else if (movedNum <= 1 && isHoveringRight) {
            if (selectedOverlayIndex < (selectedOverlayIds.length - 1)) {
                selectedOverlayIndex++;
            }
            selectedOverlayId = selectedOverlayIds[selectedOverlayIndex];
            manualMouseMoveCheck = e;
            return;
        } else if (isHoveringOverlayMenu) {
            return;
        } else if (movedNum <= 1 && hoveredOverlayIds.length !== 0 && e.target.id === 'canvas') {
            let selectedHoveredValid = selectedOverlayIds.filter((el) => hoveredOverlayIds.includes(el)).length > 0;
            selectedOverlayIds = selectedHoveredValid ? [] : [...hoveredOverlayIds];
            selectedOverlayIndex = 0;
            selectedOverlayId = selectedOverlayIds[selectedOverlayIndex];
            if (selectedOverlayIds.length === 0) {
                overlayCloseLocation = -1;
            }
            return;
        } else if (settingsOpen && !screenshotMode && e.target.id === 'canvas') {
            settingsMenu();
            return;
        } else if (locked && !testMode && e.target.id === 'canvas') {
            if (movedNum > 1) {
                return;
            }
            if (lockBoxOpen) {
                closePinBox();
            }
            $('.lock-closed').addClass('animated shake').removeClass('').css({ 'color': 'rgb(200, 75, 75)' });
            setTimeout(function() {
                $('.lock-closed').removeClass('animated shake').addClass('').css({ 'color': 'black' });
            }, 500);
            return;
        } else if (checkFalseRules() && chunkTasksOn && e.target.id === 'canvas') {
            helpFunc();
            return;
        }
        if (movedNum <= 1 && e.target.id === 'canvas') {
            e.preventDefault();
            e.stopPropagation();
            currentX = e.clientX - offsetX;
            currentY = e.clientY - offsetY;
            let chunkId = convertToChunkNum(Math.floor((currentX - dragTotalX) / (totalZoom * (imgW / rowSize))), Math.floor((currentY - dragTotalY) / (totalZoom * (imgH / (fullSize / rowSize)))));
            let coords = convertToXY(chunkId);
            if (coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) {
                return;
            } else if (isHoveringBlacklist) {
                blacklistCanvas(chunkId);
            } else if (isHoveringSticker) {
                openStickers(chunkId);
                return;
            } else if (settings['shiftUnlock'] && !e.shiftKey && (!testMode || !locked) && (!onMobile || (Date.now() - touchTime) < 500)) {
                return;
            } else if (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(chunkId)) {
                if (!recentChunks.hasOwnProperty(chunkId)) {
                    delete tempChunks['unlocked'][chunkId];
                    calcCurrentChallengesCanvas(true);
                }
            } else if (!!tempChunks['selected'] && tempChunks['selected'].hasOwnProperty(chunkId)) {
                if (e.shiftKey && (!settings['shiftUnlock'] || (testMode && locked))) {
                    delete tempChunks['selected'][chunkId];
                    tempSelectedChunks.splice(tempSelectedChunks.indexOf(chunkId.toString()), 1);
                } else {
                    delete tempChunks['selected'][chunkId];
                    tempSelectedChunks.splice(tempSelectedChunks.indexOf(chunkId.toString()), 1);
                    if (!tempChunks['unlocked']) {
                        tempChunks['unlocked'] = {};
                    }
                    tempChunks['unlocked'][chunkId] = chunkId;
                    calcCurrentChallengesCanvas(true);
                }
            } else if (!!tempChunks['potential'] && tempChunks['potential'].hasOwnProperty(chunkId)) {
                delete tempChunks['potential'][chunkId];
                if (!tempChunks['unlocked']) {
                    tempChunks['unlocked'] = {};
                }
                tempChunks['unlocked'][chunkId] = chunkId;
                !!tempChunks['potential'] && Object.keys(tempChunks['potential']).forEach((otherChunkId) => {
                    delete tempChunks['potential'][otherChunkId];
                    if (!tempChunks['selected']) {
                        tempChunks['selected'] = {};
                    }
                    tempSelectedChunks.push(otherChunkId.toString());
                    tempChunks['selected'][otherChunkId] = tempSelectedChunks.indexOf(otherChunkId.toString()) + 1;
                    delete recentChunks[otherChunkId.toString()];
                });
                delete tempChunks['potential'];
                autoSelectNeighbors && selectNeighborsCanvas(parseInt(chunkId));
                if (autoRemoveSelected) {
                    tempSelectedChunks = [];
                    !!tempChunks['selected'] && Object.keys(tempChunks['selected']).forEach((otherChunkId) => {
                        delete tempChunks['selected'][otherChunkId];
                    });
                }
                isPicking = false;
                roll2On && $('.roll2').text('Roll 2');
                roll2On && mid === roll5Mid && $('.roll2').text('Roll 5');
                unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
                setRecentRoll(chunkId);
                chunkJustRolled = true;
                completeChallenges();
                setCurrentChallenges(['No tasks currently backlogged.'], ['No tasks currently completed.'], true);
                setCalculating('.panel-completed');
                calcCurrentChallengesCanvas(true, true, true);
            } else if (!!tempChunks['blacklisted'] && tempChunks['blacklisted'].hasOwnProperty(chunkId)) {
                return;
            } else {
                if (!tempChunks['selected']) {
                    tempChunks['selected'] = {};
                }
                tempSelectedChunks.push(chunkId.toString());
                tempChunks['selected'][chunkId] = tempSelectedChunks.indexOf(chunkId.toString()) + 1;
            }
            if (isPicking && !settings['randomStartAlways']) {
                $('.pick').text('Pick for me');
            } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
                $('.pick').text('Random Start?');
            } else {
                $('.pick').text('Pick Chunk');
            }
        } else {
            return;
        }
        $('#chunkInfo2').text('Selected chunks: ' + ((!!tempChunks['selected'] ? Object.keys(tempChunks['selected']).length : 0) + (!!tempChunks['potential'] ? Object.keys(tempChunks['potential']).length : 0)));
        $('#chunkInfo1').text('Unlocked chunks: ' + (!!tempChunks['unlocked'] ? Object.keys(tempChunks['unlocked']).length : 0));
    }
    setData();
}

// Sets all neighbors of recently unlocked chunk to selected
let selectNeighborsCanvas = function(chunkId) {
    if (settings['autoWalkableRollable']) {
        return;
    }
    let ops = ['-x', '+x', '-y', '+y'];
    let newChunkId;
    for (let i = 0; i < 4; i++) {
        if (ops[i].substring(1, 2) === 'x') {
            newChunkId = chunkId + (((i - 1) * 2 + 1) * 256);
        } else {
            newChunkId = chunkId + ((i - 3) * 2 + 1);
        }
        if (checkIfGray(newChunkId) && (!settings['walkableRollable'] || chunkInfo['walkableChunksF2P'].includes(newChunkId.toString()) || (!rules['F2P'] && chunkInfo['walkableChunks'].includes(newChunkId.toString())))) {
            tempSelectedChunks.push(newChunkId.toString());
            if (!tempChunks['selected']) {
                tempChunks['selected'] = {};
            }
            tempChunks['selected'][newChunkId] = tempSelectedChunks.indexOf(newChunkId.toString()) + 1;
        }
    }
}

// Sets all neighbors of all chunks to selected
let selectAllNeighborsCanvas = function() {
    let chunks = Object.keys(tempChunks['unlocked']);
    let ops = ['-x', '+x', '-y', '+y'];
    let newChunkId;
    chunks.forEach((chunkId) => {
        chunkId = parseInt(chunkId);
        for (let i = 0; i < 4; i++) {
            if (ops[i].substring(1, 2) === 'x') {
                newChunkId = chunkId + (((i - 1) * 2 + 1) * 256);
            } else {
                newChunkId = chunkId + ((i - 3) * 2 + 1);
            }
            if (checkIfGray(newChunkId) && (!rules['F2P'] || chunkInfo['walkableChunksF2P'].includes(newChunkId.toString()))) {
                !!chunkInfo['sections'][newChunkId] && Object.keys(chunkInfo['sections'][newChunkId]).forEach((section) => {
                    !!chunkInfo['sections'][newChunkId][section] && chunkInfo['sections'][newChunkId][section].forEach((connection) => {
                        let connectionChunk = connection;
                        let connectionSection;
                        if (connection.includes('-')) {
                            connectionChunk = connection.split('-')[0];
                            connectionSection = connection.split('-')[1];
                        }
                        if ((!tempChunks['selected'] || !tempChunks['selected'].hasOwnProperty(newChunkId)) && ((!connection.includes('-') && chunks.includes(connection)) || (unlockedSections.hasOwnProperty(connectionChunk) && unlockedSections[connectionChunk].hasOwnProperty(connectionSection)))) {
                            tempSelectedChunks.push(newChunkId.toString());
                            if (!tempChunks['selected']) {
                                tempChunks['selected'] = {};
                            }
                            tempChunks['selected'][newChunkId] = tempSelectedChunks.indexOf(newChunkId.toString()) + 1;
                        }
                    });
                });
            }
        }
    });
    sortSelectedChunks();
}

// Resorts the order/numbering of selected chunks
let sortSelectedChunks = function() {
    tempSelectedChunks.sort().reverse().forEach((chunkId) => {
        tempChunks['selected'][chunkId] = tempSelectedChunks.indexOf(chunkId.toString()) + 1;
    });
}

// Opens the roll chunk modal
let openRollChunkCanvas = async function(el, rand, sNum, rand2, sNum2, isUnpick) {
    isPreloading = true;
    $('#myModal23, .roll-chunk-spinner').show();
    $('#myModal23 .modal-content').hide();
    await preloadChunkImages(el);
    isPreloading = false;
    $('.roll-chunk-spinner').hide();
    $('#myModal23 .modal-content').show();
    let pickText;
    let roll2Text;
    let rolling2 = typeof rand2 !== 'undefined' && typeof sNum2 !== 'undefined';
    if (rolling2) {
        pickText = 'Pick for me';
        settings['randomStartAlways'] && (pickText = 'Random Start?');
        roll2Text = 'Unlock both';
        mid === roll5Mid && (roll2Text = 'Unlock all');
    } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
        pickText = 'Random Start?';
        roll2Text = 'Roll 2';
        mid === roll5Mid && (roll2Text = 'Roll 5');
    } else {
        pickText = 'Pick Chunk';
        roll2Text = 'Roll 2';
        mid === roll5Mid && (roll2Text = 'Roll 5');
    }
    $('.pick-preloading').html(pickText).addClass('pick').removeClass('pick-preloading').attr('disabled', false);
    $('.roll2-preloading').html(roll2Text).addClass('roll2').removeClass('roll2-preloading').attr('disabled', false);
    $('.unpick-preloading').html('Unpick Chunk').addClass('unpick').removeClass('unpick-preloading').attr('disabled', false);
    rollChunkModalOpen = true;
    $('.roll-chunk-title').text(isUnpick ? 'Unpicking your next chunk...' : 'Rolling your next chunk...');
    $('.roll-chunk-subtitle').text('');
    $('.roll-chunk-outer').empty().css('top', '0');
    $('#submit-roll-chunk-button').hide();
    if (rolling2) {
        let tempWindowOuter = $('.roll-chunk-window-outer').clone();
        $(tempWindowOuter).addClass('roll-chunk-window-outer2').removeClass('roll-chunk-window-outer').find('.roll-chunk-outer').addClass('roll-chunk-outer2').removeClass('roll-chunk-outer');
        $('.roll-chunk-data').append(tempWindowOuter);
        $('.roll-chunk-window-outer').css('left', 'calc(30% - 8vh)');
        $('.chunk-window-child1, .chunk-window-child2, .chunk-window-child3').hide();
    } else {
        $('.roll-chunk-window-outer2').remove();
        $('.roll-chunk-window-outer').css('left', 'calc(50% - 8vh)');
        $('.chunk-window-child1, .chunk-window-child2, .chunk-window-child3').show();
    }
    pickedNum = rand;
    let numSlots = 500;
    let elArr = [...el];
    let topNum;
    let xCoord;
    let yCoord;
    let tempVar = false;
    chosenFromCinematic = el[rand];
    elArr = shuffle(elArr);
    xCoord = Math.floor(parseInt(elArr[elArr.length - 1]) / 256) - 28;
    yCoord = 72 - (parseInt(elArr[elArr.length - 1]) % 256);
    $('.roll-chunk-outer').append(`<div class='noscroll roll-chunk-inner roll-chunk-${elArr[elArr.length - 1]}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
    for (let i = 0; i < Math.ceil(numSlots / elArr.length); i++) {
        for (let j = 0; j < elArr.length; j++) {
            let num = elArr[j];
            xCoord = Math.floor(parseInt(elArr[j]) / 256) - 28;
            yCoord = 72 - (parseInt(elArr[j]) % 256);
            $('.roll-chunk-outer').append(`<div class='noscroll roll-chunk-inner roll-chunk-${num}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
            if (num === chosenFromCinematic && i + 1 >= Math.ceil(numSlots / elArr.length)) {
                topNum = (-15.999 * ((i * elArr.length) + j)) + 'vh';
            }
        };
    };
    xCoord = Math.floor(parseInt(elArr[0]) / 256) - 28;
    yCoord = 72 - (parseInt(elArr[0]) % 256);
    let randomDuration = (3 + Math.floor(Math.random() * 6)) * 1000;
    $('.roll-chunk-outer').append(`<div class='noscroll roll-chunk-inner roll-chunk-${elArr[0]}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
    setTimeout(function() {
        $('.roll-chunk-outer').animate({
            top: topNum
        }, {
            duration: randomDuration,
            easing: "easeOutCubic",
            complete: function() {
                !rolling2 && $('.roll-chunk-title').text((chunkInfo['chunks'].hasOwnProperty(chosenFromCinematic) && chunkInfo['chunks'][chosenFromCinematic].hasOwnProperty('Nickname') ? chunkInfo['chunks'][chosenFromCinematic]['Nickname'] : 'Unknown') + '(' + chosenFromCinematic + ')');
                !rolling2 && !!sNum && !isNaN(sNum) && $('.roll-chunk-subtitle').text('[Rolled number: ' + sNum + ']');
                !rolling2 && $('#submit-roll-chunk-button').show();
                if (rolling2 && tempVar) {
                    $('.roll-chunk-title').text(el[rand] + ' and ' + el[rand2]);
                    !!sNum && !isNaN(sNum) && !!sNum2 && !isNaN(sNum2) && $('.roll-chunk-subtitle').text('[Rolled numbers: ' + sNum + ' & ' + sNum2 + ']');
                    $('#submit-roll-chunk-button').show();
                } else if (rolling2) {
                    tempVar = true;
                }
            }
        });
    }, 1000);

    if (rolling2) {
        chosenFromCinematic = el[rand2];
        elArr = shuffle(elArr);
        let topNum2;
        xCoord = Math.floor(parseInt(elArr[elArr.length - 1]) / 256) - 28;
        yCoord = 72 - (parseInt(elArr[elArr.length - 1]) % 256);
        $('.roll-chunk-outer2').append(`<div class='noscroll roll-chunk-inner roll-chunk-${elArr[elArr.length - 1]}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
        for (let i = 0; i < Math.ceil(numSlots / elArr.length); i++) {
            for (let j = 0; j < elArr.length; j++) {
                let num = elArr[j];
                xCoord = Math.floor(parseInt(elArr[j]) / 256) - 28;
                yCoord = 72 - (parseInt(elArr[j]) % 256);
                $('.roll-chunk-outer2').append(`<div class='noscroll roll-chunk-inner roll-chunk-${num}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
                if (num === chosenFromCinematic && i + 1 >= Math.ceil(numSlots / elArr.length)) {
                    topNum2 = (-15.998 * ((i * elArr.length) + j)) + 'vh';
                }
            };
        };
        xCoord = Math.floor(parseInt(elArr[0]) / 256) - 28;
        yCoord = 72 - (parseInt(elArr[0]) % 256);
        let randomDuration = (3 + Math.floor(Math.random() * 6)) * 1000;
        $('.roll-chunk-outer2').append(`<div class='noscroll roll-chunk-inner roll-chunk-${elArr[0]}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
        setTimeout(function() {
            $('.roll-chunk-outer2').animate({
                top: topNum2
            }, {
                duration: randomDuration,
                easing: "easeOutCubic",
                complete: function() {
                    if (tempVar) {
                        $('.roll-chunk-title').text(el[rand] + ' and ' + el[rand2]);
                        !!sNum && !isNaN(sNum) && !!sNum2 && !isNaN(sNum2) && $('.roll-chunk-subtitle').text('[Rolled numbers: ' + sNum + ' & ' + sNum2 + ']');
                        $('#submit-roll-chunk-button').show();
                    } else {
                        tempVar = true;
                    }
                }
            });
        }, 1000);
    }

    setData();
}

// Delayed pick chunk after cinematic
let takeMeToChunkCanvas = function() {
    rollChunkModalOpen = false;
    scrollToChunkCanvas(chosenFromCinematic);
    chosenFromCinematic = null;
    $('.recent').removeClass('recent');
    !isPicking && calcCurrentChallengesCanvas(true, true, true);
    $('.roll-chunk-title').text('Rolling your next chunk...');
    $('.roll-chunk-subtitle').text('');
    $('.roll-chunk-outer').empty().css('top', '0');
    $('.roll-chunk-outer2').empty().css('top', '0');
    $('.roll-chunk-window-outer2').remove();
    $('.roll-chunk-window-outer').css('left', '');
    $('#submit-roll-chunk-button').hide();
    $('#myModal23').hide();
}

// Sets the recent roll in data
let setRecentRoll = function(chunkId) {
    if (signedIn && !onTestServer && !testMode) {
        myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt(chunkId), (error) => {
            regainConnectivity(() => {
                myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt(chunkId));
            });
        });
    }
    chunkOrder[new Date().getTime()] = parseInt(chunkId);
    let chunkOrderArr = Object.keys(chunkOrder).sort().reverse();
    let innerCount = 0;
    let notFound = true;
    for (let count = 1; count <= 5; count++) {
        notFound = true;
        while (notFound && innerCount < chunkOrderArr.length) {
            if (innerCount === 0 || chunkOrder[chunkOrderArr[innerCount]] !== chunkOrder[chunkOrderArr[innerCount - 1]] || chunkOrderArr[innerCount - 1] - chunkOrderArr[innerCount] > 10000) {
                let tempDate = new Date();
                tempDate.setTime(chunkOrderArr[innerCount]);
                $('#recentChunks' + count).html('<span class="time">' + tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2] + ': </span><span class="chunk' + (chunkOrder[chunkOrderArr[innerCount]] ? '' : 'none') + '" onclick="recentChunkCanvas(recentChunks' + count + ')">' + chunkOrder[chunkOrderArr[innerCount]] + '</span>');
                notFound = false;
            }
            innerCount++;
        }
        if (notFound) {
            $('#recentChunks' + count).html('<span class="chunknone" onclick="recentChunkCanvas(recentChunks' + count + ')">-</span>');
        }
    }
    if (!!recentTime[0]) {
        $('#recentChunksTitle > b').text(Math.max(Math.floor((new Date().getTime() - chunkOrderArr[0]) / (1000 * 3600 * 24)), 0) + ' days since last roll');
    }
    setData();
}

// Pick button: picks a random chunk from selected/potential
let pickCanvas = function(both, override) {
    if (!testMode && (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || mapIntroOpen || xpRewardOpen || manualAreasModalOpen || chunkSectionsModalOpen || chunkSectionPickerModalOpen || slayerMasterInfoModalOpen || doableClueStepsModalOpen || clueChunksModalOpen || notesOpen || newTasksOpen || clipboardModalOpen || overlaysModalOpen || exitSandboxWarningModalOpen || mobileMenuOpen || mobileTasksOpen || (unlockedChunks !== 0 && selectedChunks === 0 && !settings['randomStartAlways']))) {
        return;
    }
    if (checkFalseRules() && chunkTasksOn) {
        helpFunc();
        return;
    }
    if (settings['rollWarning'] && !override) {
        warnPickChunk(both);
        return;
    }
    override && cancelPickWarning();
    let el;
    let rand;
    let sNum;
    let didRandomStart = false;
    if (both && isPicking) {
        let numToRoll = mid === roll5Mid ? 5 : 2;
        for (let temp = 0; temp < numToRoll; temp++) {
            el = (!!tempChunks['potential'] && Object.keys(tempChunks['potential']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['potential'][chunkId] === 'undefined' || tempChunks['potential'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
            if (!el || el.length === 0) {
                return;
            }
            rand = 0;
            delete tempChunks['potential'][el[rand]];
            if (!tempChunks['unlocked']) {
                tempChunks['unlocked'] = {};
            }
            tempChunks['unlocked'][el[rand]] = el[rand];
            recentChunks[el[rand]] = el[rand];
            scrollToChunkCanvas(el[rand]);
            autoSelectNeighbors && !didRandomStart && selectNeighborsCanvas(parseInt(el[rand]));
            setRecentRoll(el[rand]);
            chunkJustRolled = true;
        }
        if (autoRemoveSelected) {
            tempSelectedChunks = [];
            !!tempChunks['selected'] && Object.keys(tempChunks['selected']).forEach((chunkId) => {
                delete tempChunks['selected'][chunkId];
            });
        }
        $('#chunkInfo2').text('Selected chunks: ' + ((!!tempChunks['selected'] ? Object.keys(tempChunks['selected']).length : 0) + (!!tempChunks['potential'] ? Object.keys(tempChunks['potential']).length : 0)));
        $('#chunkInfo1').text('Unlocked chunks: ' + (!!tempChunks['unlocked'] ? Object.keys(tempChunks['unlocked']).length : 0));
        isPicking = false;
        if (isPicking && !settings['randomStartAlways']) {
            $('.pick').text('Pick for me');
        } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
            $('.pick').text('Random Start?');
        } else {
            $('.pick').text('Pick Chunk');
        }
        roll2On && $('.roll2').text('Roll 2');
        roll2On && mid === roll5Mid && $('.roll2').text('Roll 5');
        unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
        completeChallenges();
        setCurrentChallenges(['No tasks currently backlogged.'], ['No tasks currently completed.'], true);
        setCalculating('.panel-completed');
        !activeSubTabs['skill'] && expandActive('skill');
        !activeSubTabs['bis'] && expandActive('bis');
        !activeSubTabs['quest'] && expandActive('quest');
        !activeSubTabs['diary'] && expandActive('diary');
        !activeSubTabs['extra'] && expandActive('extra');
        calcCurrentChallengesCanvas(true, true, true);
        setData();
        return;
    } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
        el = [];
        if (rules['F2P']) {
            chunkInfo['walkableChunksF2P'].filter(id => { return (!tempChunks['unlocked'] || !tempChunks['unlocked'][id]) && (!tempChunks['blacklisted'] || !tempChunks['blacklisted'][id]) && !isNaN(id) }).forEach((id) => {
                el.push(id);
            });
        } else {
            chunkInfo['walkableChunks'].filter(id => { return (!tempChunks['unlocked'] || !tempChunks['unlocked'][id]) && (!tempChunks['blacklisted'] || !tempChunks['blacklisted'][id]) }).forEach((id) => {
                el.push(id);
            });
        }
        if (!el || el.length === 0) {
            return;
        }
        rand = Math.floor(Math.random() * el.length);
        if (settings['cinematicRoll'] && !onMobile && mid !== roll5Mid) {
            $('.pick').html(`<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>`).addClass('pick-preloading').removeClass('pick').attr('disabled', true);
            openRollChunkCanvas(el, rand, 0);
        }
        didRandomStart = true;
        !!tempChunks['selected'] && tempChunks['selected'].hasOwnProperty(el[rand]) && (delete tempChunks['selected'][el[rand]]);
        !!tempChunks['potential'] && tempChunks['potential'].hasOwnProperty(el[rand]) && (delete tempChunks['potential'][el[rand]]);
        !!tempSelectedChunks && tempSelectedChunks.includes(el[rand]) && (tempSelectedChunks.splice(tempSelectedChunks.indexOf(el[rand]), 1));
        if (!tempChunks['unlocked']) {
            tempChunks['unlocked'] = {};
        }
        tempChunks['unlocked'][el[rand]] = el[rand];
        if (isPicking && !settings['randomStartAlways']) {
            $('.pick').text('Pick for me');
        } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
            $('.pick').text('Random Start?');
        } else {
            $('.pick').text('Pick Chunk');
        }
    } else if (!isPicking) {
        el = (!!tempChunks['selected'] && Object.keys(tempChunks['selected']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['selected'][chunkId] === 'undefined' || tempChunks['selected'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
        if (!el || el.length === 0) {
            return;
        }
        rand = Math.floor(Math.random() * el.length);
        sNum = tempSelectedChunks.indexOf(el[rand]) + 1;
        if (settings['cinematicRoll'] && !onMobile && mid !== roll5Mid) {
            $('.pick').html(`<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>`).addClass('pick-preloading').removeClass('pick').attr('disabled', true);
            openRollChunkCanvas(el, rand, sNum);
        }
        tempSelectedChunks.splice(sNum - 1, 1);
        delete tempChunks['selected'][el[rand]];
        if (!tempChunks['unlocked']) {
            tempChunks['unlocked'] = {};
        }
        tempChunks['unlocked'][el[rand]] = el[rand];
    } else {
        el = (!!tempChunks['potential'] && Object.keys(tempChunks['potential']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['potential'][chunkId] === 'undefined' || tempChunks['potential'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
        if (!el || el.length === 0) {
            return;
        }
        rand = Math.floor(Math.random() * el.length);
        delete tempChunks['potential'][el[rand]];
        if (!tempChunks['unlocked']) {
            tempChunks['unlocked'] = {};
        }
        tempChunks['unlocked'][el[rand]] = el[rand];
        recentChunks[el[rand]] = el[rand];
        !!tempChunks['potential'] && Object.keys(tempChunks['potential']).forEach((otherChunkId) => {
            delete tempChunks['potential'][otherChunkId];
            if (!tempChunks['selected']) {
                tempChunks['selected'] = {};
            }
            tempSelectedChunks.push(otherChunkId.toString());
            tempChunks['selected'][otherChunkId] = tempSelectedChunks.indexOf(otherChunkId.toString()) + 1;
            delete recentChunks[otherChunkId.toString()];
        });
        delete tempChunks['potential'];
        scrollToChunkCanvas(el[rand]);
        isPicking = false;
        if (isPicking && !settings['randomStartAlways']) {
            $('.pick').text('Pick for me');
        } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
            $('.pick').text('Random Start?');
        } else {
            $('.pick').text('Pick Chunk');
        }
        roll2On && $('.roll2').text('Roll 2');
        roll2On && mid === roll5Mid && $('.roll2').text('Roll 5');
        unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
    }
    if (!el[rand]) {
        return;
    }
    autoSelectNeighbors && !didRandomStart && selectNeighborsCanvas(parseInt(el[rand]));
    if (autoRemoveSelected) {
        tempSelectedChunks = [];
        !!tempChunks['selected'] && Object.keys(tempChunks['selected']).forEach((chunkId) => {
            delete tempChunks['selected'][chunkId];
        });
    }
    (!settings['cinematicRoll'] || mid === roll5Mid) && scrollToChunkCanvas(el[rand]);
    setRecentRoll(el[rand]);
    chunkJustRolled = true;
    $('#chunkInfo2').text('Selected chunks: ' + ((!!tempChunks['selected'] ? Object.keys(tempChunks['selected']).length : 0) + (!!tempChunks['potential'] ? Object.keys(tempChunks['potential']).length : 0)));
    $('#chunkInfo1').text('Unlocked chunks: ' + (!!tempChunks['unlocked'] ? Object.keys(tempChunks['unlocked']).length : 0));
    completeChallenges(true);
    setCurrentChallenges(['No tasks currently backlogged.'], ['No tasks currently completed.'], true);
    setCalculating('.panel-completed');
    !activeSubTabs['skill'] && expandActive('skill');   
    !activeSubTabs['bis'] && expandActive('bis');
    !activeSubTabs['quest'] && expandActive('quest');
    !activeSubTabs['diary'] && expandActive('diary');
    !activeSubTabs['extra'] && expandActive('extra');
    (!settings['cinematicRoll'] || mid === roll5Mid) && calcCurrentChallengesCanvas(true, true, true);
    setData();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
let roll2Canvas = function(override) {
    if (!testMode && (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || mapIntroOpen || xpRewardOpen || manualAreasModalOpen || chunkSectionsModalOpen || chunkSectionPickerModalOpen || slayerMasterInfoModalOpen || doableClueStepsModalOpen || clueChunksModalOpen || notesOpen || newTasksOpen || clipboardModalOpen || overlaysModalOpen || exitSandboxWarningModalOpen || mobileMenuOpen || mobileTasksOpen || (((!tempChunks['selected'] || Object.keys(tempChunks['selected']).length < 1) && !isPicking) || ((!tempChunks['potential'] || Object.keys(tempChunks['potential']).length < 1) && isPicking)))) {
        return;
    }
    if (checkFalseRules() && chunkTasksOn) {
        helpFunc();
        return;
    }
    if (settings['rollWarning'] && !override) {
        warnRoll2Chunk();
        return;
    }
    override && cancelRoll2Warning();
    if (isPicking) {
        pickCanvas(true, override);
        return;
    }
    let el = (!!tempChunks['selected'] && Object.keys(tempChunks['selected']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['selected'][chunkId] === 'undefined' || tempChunks['selected'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
    if (!el || el.length === 0) {
        return;
    }
    isPicking = true;
    let rand;
    if (el.length > 0) {
        $('.unpick').css({ 'opacity': 0, 'cursor': 'default' }).prop('disabled', true).hide();
        !settings['randomStartAlways'] ? $('.pick').text('Pick for me') : $('.pick').text('Random Start?');
        $('.roll2').text('Unlock both');
        mid === roll5Mid && $('.roll2').text('Unlock all');
    }
    let numToRoll = mid === roll5Mid ? 5 : 2;
    let rands = [];
    let sNums = [];
    let savedEl = (!!tempChunks['selected'] && Object.keys(tempChunks['selected']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['selected'][chunkId] === 'undefined' || tempChunks['selected'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
    let savedTempSelectedChunks = JSON.parse(JSON.stringify(tempSelectedChunks));
    for (let i = 0; i < numToRoll; i++) {
        el = (!!tempChunks['selected'] && Object.keys(tempChunks['selected']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['selected'][chunkId] === 'undefined' || tempChunks['selected'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
        if (!el || el.length === 0) {
            return;
        }
        rand = Math.floor(Math.random() * el.length);
        if (!tempChunks['selected'].hasOwnProperty(el[rand]) || isNaN(el[rand])) {
            Object.keys(tempChunks['selected']).filter(chunk => { return isNaN(chunk) }).forEach((chunk) => {
                delete tempChunks['selected'][chunk];
            });
            i--;
        } else {
            rands[i] = el[rand];
            sNums[i] = savedTempSelectedChunks.indexOf(el[rand]) + 1;
            delete tempChunks['selected'][el[rand]];
            if (!tempChunks['potential']) {
                tempChunks['potential'] = {};
            }
            tempSelectedChunks.splice(tempSelectedChunks.indexOf(el[rand]), 1);
            tempChunks['potential'][el[rand]] = el[rand];
            recentChunks[el[rand]] = el[rand];
        }
    }
    if (settings['cinematicRoll'] && !onMobile && mid !== roll5Mid && numToRoll === 2) {
        $('.roll2').html(`<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>`).addClass('roll2-preloading').removeClass('roll2').attr('disabled', true);
        openRollChunkCanvas(savedEl, savedEl.indexOf(rands[0]), sNums[0], savedEl.indexOf(rands[1]), sNums[1]);
    }
    setData();
}

// Unpicks a random unlocked chunk
let unpickCanvas = function() {
    if (!testMode && (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || mapIntroOpen || xpRewardOpen || manualAreasModalOpen || chunkSectionsModalOpen || chunkSectionPickerModalOpen || slayerMasterInfoModalOpen || doableClueStepsModalOpen || clueChunksModalOpen || notesOpen || newTasksOpen || clipboardModalOpen || overlaysModalOpen || exitSandboxWarningModalOpen || mobileMenuOpen || mobileTasksOpen || (!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length < 1))) {
        return;
    }
    if (checkFalseRules() && chunkTasksOn) {
        helpFunc();
        return;
    }
    let el = (!!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).filter(chunkId => { let coords = convertToXY(chunkId); return !(tempChunks['unlocked'][chunkId] === 'undefined' || tempChunks['unlocked'][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0) })) || [];
    if (!el || el.length === 0) {
        return;
    }
    let rand = Math.floor(Math.random() * el.length);
    delete tempChunks['unlocked'][el[rand]];
    if (mid !== unChunkMid) {
        if (!tempChunks['selected']) {
            tempChunks['selected'] = {};
        }
        tempSelectedChunks.push(el[rand]);
        tempChunks['selected'][el[rand]] = tempSelectedChunks.indexOf(el[rand]) + 1;
    }
    recentChunks[el[rand]] = el[rand];
    $('#chunkInfo2').text('Selected chunks: ' + ((!!tempChunks['selected'] ? Object.keys(tempChunks['selected']).length : 0) + (!!tempChunks['potential'] ? Object.keys(tempChunks['potential']).length : 0)));
    $('#chunkInfo1').text('Unlocked chunks: ' + (!!tempChunks['unlocked'] ? Object.keys(tempChunks['unlocked']).length : 0));
    if (settings['cinematicRoll'] && !onMobile && mid !== roll5Mid) {
        $('.unpick').html(`<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>`).addClass('unpick-preloading').removeClass('unpick').attr('disabled', true);
        openRollChunkCanvas(el, rand, null, undefined, undefined, true);
    } else {
        scrollToChunkCanvas(el[rand]);
    }
    setData();
}

// Sets up the selected order at map setup
let setUpSelected = function() {
    tempSelectedChunks = [];
    !!tempChunks['selected'] && Object.keys(tempChunks['selected']).sort(function(a, b) { return typeof tempChunks['selected'][a] === 'string' && typeof tempChunks['selected'][b] === 'string' ? b - a : tempChunks['selected'][a] - tempChunks['selected'][b] }).forEach((chunkId) => {
        tempSelectedChunks.push(chunkId);
    });
    centerCanvas('quick');
}

// Finds the current challenge in each skill
let calcCurrentChallengesCanvas = function(useOld, proceed, fromLoadData, inputTempSections) {
    if (!proceed) {
        $('.panel-active .calculating').remove();
        $('.panel-active').prepend(`<div class="noscroll calculating"><div class='noscroll display-button' onclick='calcCurrentChallengesCanvas(${useOld}, true)'>Calculate Tasks</div></div>`);
        myWorker.terminate();
        return;
    }

    let tempSections = inputTempSections || {};
    let manualSectionsModified = {};
    !!manualSections && Object.keys(manualSections).forEach((chunk) => {
        if (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(chunk)) {
            manualSectionsModified[chunk] = manualSections[chunk];
        }
    });
    unlockedSections = JSON.parse(JSON.stringify(manualSectionsModified));
    unlockedSections = combineJSONs(unlockedSections, findConnectedSections({...tempChunks['unlocked'], ...manualAreas} || {}, {...unlockedSections, ...tempSections}));
    let sectionsValid = true;
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).some((chunk) => {
        if (!unlockedSections.hasOwnProperty(chunk) && chunkInfo['sections'].hasOwnProperty(chunk) && Object.keys(chunkInfo['sections'][chunk]).filter((section) => section !== "0").length > 0) {
            if (fromLoadData) {
                calcCurrentChallengesCanvas(useOld);
                sectionsValid = false;
            } else if (testMode || !(viewOnly || locked)) {
                openChunkSectionPicker(chunk, true);
                sectionsValid = false;
            } else if (inEntry) {
                sectionsValid = false;
            } else if (viewOnly || locked) {
                Object.keys(chunkInfo['sections'][chunk]).forEach((sec) => {
                    if (!tempSections[chunk]) {
                        tempSections[chunk] = {};
                    }
                    tempSections[chunk][sec] = true;
                });
                calcCurrentChallengesCanvas(useOld, proceed, fromLoadData, tempSections);
                sectionsValid = false;
            }
            return true;
        }
    });
    tempSections = combineJSONs(tempSections, manualSections);

    if (gotData && sectionsValid) {
        setCalculating('.panel-active', useOld);
        setCurrentChallenges(['No tasks currently backlogged.'], ['No tasks currently completed.'], true, true);
        myWorker.terminate();
        myWorker = new Worker("./worker.js?v=6.2.2.1");
        myWorker.onmessage = workerOnMessage;
        myWorker.postMessage(['current', tempChunks['unlocked'], rules, chunkInfo, skillNames, processingSkill, maybePrimary, combatSkills, monstersPlus, objectsPlus, chunksPlus, itemsPlus, mixPlus, npcsPlus, tasksPlus, tools, elementalRunes, manualTasks, completedChallenges, backlog, "1/" + rules['Rare Drop Amount'], universalPrimary, elementalStaves, rangedItems, boneItems, highestCurrent, dropTables, possibleAreas, randomLoot, magicTools, bossLogs, bossMonsters, minigameShops, manualEquipment, checkedChallenges, backloggedSources, altChallenges, manualMonsters, slayerLocked, passiveSkill, f2pSkills, assignedXpRewards, mid === diary2Tier, manualAreas, "1/" + rules['Secondary Primary Amount'], mid === manualAreasOnly, tempSections, settings['optOutSections']]);
        workerOut = 1;
    }
}

// Handles mouse leaving the page
let handleMouseOut = function(e) {
    if (e.button !== 0) {
        return
    }
    if (mouseDown) {
        e.preventDefault();
        e.stopPropagation();
        handleMouseMove(e);
    }
}

// Handles mouse scroll zooming
let handleMouseScroll = function(e) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        let dir;
        if (e.type === 'DOMMouseScroll') {
            if (e.detail < 0) {
                dir = 1;
            } else {
                dir = -1;
            }
        } else {
            if (e.originalEvent.wheelDelta > 0) {
                dir = 1;
            } else {
                dir = -1;
            }
        }

        let currentMouseX = e.clientX;
        let currentMouseY = e.clientY;

        // As image zooms, shift top-left corner closer to or further from mouse position
        let offsetX = (currentMouseX - dragTotalX) * (dir * zoomAmount);
        let offsetY = (currentMouseY - dragTotalY) * (dir * zoomAmount);

        if (totalZoom + (dir * zoomAmount * totalZoom) <= maxZoom && totalZoom + (dir * zoomAmount * totalZoom) >= minZoom) {
            totalZoom += (dir * zoomAmount * totalZoom);
            dragTotalX = dragTotalX - offsetX;
            dragTotalY = dragTotalY - offsetY;
        }
        manualMouseMoveCheck = e;
    }
}

// Handles mobile zooming
let handleMobileZoom = function(dir) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        let currentMouseX = window.innerWidth / 2;
        let currentMouseY = window.innerHeight / 2;

        // As image zooms, shift top-left corner closer to or further from mouse position
        let offsetX = (currentMouseX - dragTotalX) * (dir * zoomAmount * 2);
        let offsetY = (currentMouseY - dragTotalY) * (dir * zoomAmount * 2);

        if (totalZoom + (dir * zoomAmount * 2 * totalZoom) <= maxZoom && totalZoom + (dir * zoomAmount * 2 * totalZoom) >= minZoom) {
            totalZoom += (dir * zoomAmount * 2 * totalZoom);
            dragTotalX = dragTotalX - offsetX;
            dragTotalY = dragTotalY - offsetY;
        }
    }
}

// Blacklists the given chunk
let blacklistCanvas = function(chunkId) {
    if (!tempChunks['blacklisted']) {
        tempChunks['blacklisted'] = {};
    }
    if (tempChunks['blacklisted'].hasOwnProperty(chunkId)) {
        delete tempChunks['blacklisted'][chunkId];
    } else {
        tempChunks['blacklisted'][chunkId] = chunkId;
    }
    setData();
}

// Prevents zooming from pulling map too off-center screen
let fixMapEdgesCanvas = function() {
    let leftNumber = dragTotalX;
    let topNumber = dragTotalY;
    let rightEdge = leftNumber + (totalZoom * imgW);
    let bottomEdge = topNumber + (totalZoom * imgH);

    let margins = [450, 400, 400, 400];
    if (topNumber > margins[0]) {
        dragTotalY = margins[0];
    }
    if (rightEdge < window.innerWidth - margins[1]) {
        dragTotalX = (window.innerWidth - margins[1]) - (totalZoom * imgW);
    }
    if (bottomEdge < window.innerHeight - margins[2]) {
        dragTotalY = (window.innerHeight - margins[2]) - (totalZoom * imgH);
    }
    if (leftNumber > margins[3]) {
        dragTotalX = margins[3];
    }
}

// Move towards point being centered on
let updateFutureMove = function() {
    if (Math.abs(moveAmountX) < Math.abs(futureMoveX)) {
        let easing = (1 - (Math.abs(moveAmountX / futureMoveX) * Math.abs(moveAmountX / futureMoveX))) < 0.01 ? 0.01 : (1 - (Math.abs(moveAmountX / futureMoveX) * Math.abs(moveAmountX / futureMoveX)));
        dragTotalX += -futureMoveX * 0.075 * easing;
        moveAmountX += -futureMoveX * 0.075 * easing;
    } else {
        futureMoveX = 0;
        moveAmountX = 0;
    }
    if (Math.abs(moveAmountY) < Math.abs(futureMoveY)) {
        let easing = (1 - (Math.abs(moveAmountY / futureMoveY) * Math.abs(moveAmountY / futureMoveY))) < 0.01 ? 0.01 : (1 - (Math.abs(moveAmountY / futureMoveY) * Math.abs(moveAmountY / futureMoveY)));
        dragTotalY += -futureMoveY * 0.075 * easing;
        moveAmountY += -futureMoveY * 0.075 * easing;
    } else {
        futureMoveY = 0;
        moveAmountY = 0;
    }
}

// Scrolls to position x.xPart, y.yPart
let scrollToPosCanvas = function(x, y, xPart, yPart, doQuick) {
    let moveX = (totalZoom * (-(x + 0.5 + xPart) * imgW / rowSize)) + (window.innerWidth / 2);
    let moveY = (totalZoom * (-(y + 0.5 + yPart) * imgH / (fullSize / rowSize))) + (window.innerHeight / 2);
    if (doQuick) {
        dragTotalX = moveX;
        dragTotalY = moveY;
    } else {
        futureMoveX = dragTotalX - moveX;
        futureMoveY = dragTotalY - moveY;
    }
    doQuick && drawCanvas();
}

// Scrolls to chunk with given id
let scrollToChunkCanvas = function(chunkId) {
    recentChunks[chunkId] = chunkId;
    scrollToPosCanvas(convertToXY(chunkId).x, convertToXY(chunkId).y, 0, 0, false);
}

// Highlights array of chunk ids for current quest
let highlightAllQuestCanvas = function() {
    questChunks.forEach((chunkId) => {
        recentChunks[chunkId] = chunkId;
    });
}

// Centers on the clicked recent chunk and highlights it
let recentChunkCanvas = function(el) {
    if ($($(el).children('.chunk')).text() === '-' || inEntry) {
        return;
    }
    let id = parseInt($($(el).children('.chunk')).text());
    scrollToChunkCanvas(id);
}

// Centers on average position of all unlocked chunks
let centerCanvas = function(extra) {
    if (!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length < 1) {
        scrollToPosCanvas(convertToXY(12850).x, convertToXY(12850).y, 0, 0, extra === 'quick');
        return;
    }
    let sumX = 0;
    let sumY = 0;
    let num = 0;
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).forEach((chunkId) => {
        sumX += convertToXY(chunkId).x;
        sumY += convertToXY(chunkId).y;
        num++;
    });
    scrollToPosCanvas(Math.floor(sumX / num), Math.floor(sumY / num), sumX / num - Math.floor(sumX / num), sumY / num - Math.floor(sumY / num), extra === 'quick');
}

// Re-update chunk info panel
let redirectPanelCanvas = function(name) {
    let realName = decodeQueryParam(name);
    ((realName % 256) < 65) && scrollToPosCanvas(convertToXY(parseInt(realName)).x, convertToXY(parseInt(realName)).y, 0, 0);
    infoLockedId = encodeRFC5987ValueChars(realName.toString());
    updateChunkInfo();
    $('.infoid').addClass('new');
    setTimeout(function() {
        $('.infoid').removeClass('new');
        setTimeout(function() {
            $('.infoid').addClass('new');
            setTimeout(function() {
                $('.infoid').removeClass('new');
            }, 1000);
        }, 1000);
    }, 1000);
}

// Highlights outside borders of unlocked areas
let chunkBordersCanvas = function() {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).forEach((chunkId) => {
        chunkCoords = convertToXY(chunkId);
        if (!tempChunks['unlocked'].hasOwnProperty(parseInt(chunkId) + 1)) {
            ctx.moveTo(dragTotalX + (totalZoom * (chunkCoords.x * imgW / rowSize)), dragTotalY + (totalZoom * (chunkCoords.y * imgH / (fullSize / rowSize))));
            ctx.lineTo(dragTotalX + (totalZoom * ((chunkCoords.x + 1) * imgW / rowSize)), dragTotalY + (totalZoom * (chunkCoords.y * imgH / (fullSize / rowSize))));
        }
        if (!tempChunks['unlocked'].hasOwnProperty(parseInt(chunkId) - 1)) {
            ctx.moveTo(dragTotalX + (totalZoom * (chunkCoords.x * imgW / rowSize)), dragTotalY + (totalZoom * ((chunkCoords.y + 1) * imgH / (fullSize / rowSize))));
            ctx.lineTo(dragTotalX + (totalZoom * ((chunkCoords.x + 1) * imgW / rowSize)), dragTotalY + (totalZoom * ((chunkCoords.y + 1) * imgH / (fullSize / rowSize))));
        }
        if (!tempChunks['unlocked'].hasOwnProperty(parseInt(chunkId) + skip + rowSize)) {
            ctx.moveTo(dragTotalX + (totalZoom * ((chunkCoords.x + 1) * imgW / rowSize)), dragTotalY + (totalZoom * (chunkCoords.y * imgH / (fullSize / rowSize))));
            ctx.lineTo(dragTotalX + (totalZoom * ((chunkCoords.x + 1) * imgW / rowSize)), dragTotalY + (totalZoom * ((chunkCoords.y + 1) * imgH / (fullSize / rowSize))));
        }
        if (!tempChunks['unlocked'].hasOwnProperty(parseInt(chunkId) - skip - rowSize)) {
            ctx.moveTo(dragTotalX + (totalZoom * (chunkCoords.x * imgW / rowSize)), dragTotalY + (totalZoom * (chunkCoords.y * imgH / (fullSize / rowSize))));
            ctx.lineTo(dragTotalX + (totalZoom * (chunkCoords.x * imgW / rowSize)), dragTotalY + (totalZoom * ((chunkCoords.y + 1) * imgH / (fullSize / rowSize))));
        }
    });
    ctx.stroke();
}

// Loaded when page is ready
$(document).ready(function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cw = canvas.width;
    ch = canvas.height;

    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cw = canvas.width;
        ch = canvas.height;
    }

    reOffset();

    $(document).mousedown(function(e){handleMouseDown(e);});
    $(document).mousemove(function(e){handleMouseMove(e);});
    $(document).mouseup(function(e){handleMouseUp(e);});
    $(document).mouseout(function(e){handleMouseOut(e);});
    $("#canvas").on('wheel', function(e){handleMouseScroll(e);});
    $(document).keydown(function(e){handleKeyDown(e);});
    $(document).keyup(function(e){handleKeyUp(e);});

    $(document).on('touchstart', function(e){handleMouseDown(e);});
    $(document).on('touchmove', function(e){handleMouseMove(e);});
    $(document).on('touchend', function(e){handleMouseUp(e);});

    pageReady = true;
    if (readyToDrawImage && readyToDrawIcons === 0 && pageReady) {
        centerCanvas('quick');
    }
});

// ------------------------------------------------------------

// Recieve message from worker
let myWorker = new Worker("./worker.js?v=6.2.2.1");
let myWorker2 = new Worker("./worker.js?v=6.2.2.1");
let workerOnMessage = function(e) {
    if (lastUpdated + 2000000 < Date.now() && !hasUpdate) {
        lastUpdated = Date.now();
        databaseRef.child('version').once('value', function(snap) {
            if (snap.val() !== currentVersion && false) {
                hasUpdate = true;
                $(`.godocumentation`).addClass('hasupdate').removeClass('fa-file-alt').addClass('fa-sync').prop('title', 'New version available');
                $(`.patchnotes-mobile`).addClass('hasupdate').text('New version available');
            }
        });
    }
    if (e.data[0] === 'error') {
        $('.panel-active > .calculating > .inner-loading-bar').css('background-color', 'red');
        $('.panel-active > .outer-loading-bar').css('color', 'yellow');
        $('.loading-bar-text').css('color', 'yellow').text('Error');
        $('.panel-active > .calculating').css('color', 'red');
        $('.panel-active > .calculating > i').removeClass('fa-spin');
        logError(e.data[1].stack);
        throw e.data[1];
    } else if (e.data[0] === 'initial-data') {
        baseChunkData = e.data[1];
        onlyInitialData = true;
    } else if (!Array.isArray(e.data)) {
        if (!!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).length >= 100) {
            $('.panel-active > .calculating > .inner-loading-bar').css('width', e.data);
        }
    } else {
        workerOut--;
        workerOut < 0 && (workerOut = 0);
        if (e.data[0] === 'current') {
            workerOut = 0;
        }
        if (workerOut === 0) {
            chunkInfo = e.data[3];
            if (e.data[0] === 'future') {
                futureChunkData = e.data[2];
                futureUnlockedSections = e.data[15];
                let challengeStr = calcFutureChallenges2(e.data[1], e.data[2]);
                expandChallengeStr = challengeStr;
                $('.panel-challenges').html(challengeStr || 'None');
                $('#infochallenges .expand').show();
            } else if (e.data[0] === 'current') {
                if (settings['newTasks'] && chunkJustRolled) {
                    openNewTasksModal(calcFutureChallenges2(e.data[1], e.data[2]).replaceAll(", 'future'", ", ''").replaceAll('</span>,', '</span><br />') || 'None');
                }
                globalValids = e.data[1];
                baseChunkData = e.data[2];
                onlyInitialData = false;
                highestCurrent = e.data[4];
                questPointTotal = e.data[6];
                highestOverall = e.data[7];
                dropRatesGlobal = e.data[8];
                questProgress = e.data[9];
                diaryProgress = e.data[10];
                skillQuestXp = e.data[11];
                savedChunks = e.data[12];
                dropTablesGlobal = e.data[13];
                bestEquipmentAltsGlobal = e.data[14];
                unlockedSections = e.data[15];
                possibleAreas = {};
                Object.keys(e.data[12]).filter(area => { return e.data[12][area] === true }).forEach((area) => {
                    possibleAreas[area] = true;
                });
                tempChallengeArrSaved = e.data[5];
                numClueTasks = {
                    'easy': 0,
                    'medium': 0,
                    'hard': 0,
                    'elite': 0,
                    'master': 0
                };
                numClueTasksPossible = {
                    'easy': 0,
                    'medium': 0,
                    'hard': 0,
                    'elite': 0,
                    'master': 0
                };
                possibleClueTasks = {
                    'easy': [],
                    'medium': [],
                    'hard': [],
                    'elite': [],
                    'master': []
                };
                !!chunkInfo['challenges']['Nonskill'] && Object.keys(chunkInfo['challenges']['Nonskill']).filter(task => { return chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('ClueTier') }).forEach((task) => {
                    numClueTasks[chunkInfo['challenges']['Nonskill'][task]['ClueTier']]++;
                    if (globalValids.hasOwnProperty('Nonskill') && globalValids['Nonskill'].hasOwnProperty(task)) {
                        numClueTasksPossible[chunkInfo['challenges']['Nonskill'][task]['ClueTier']]++;
                        possibleClueTasks[chunkInfo['challenges']['Nonskill'][task]['ClueTier']].push(task);
                    }
                });
                starRegionsPossible = {
                    "Asgarnia": 0,
                    "Crandor and Karamja": 0,
                    "Feldip Hills and the Isle of Souls": 0,
                    "Fossil Island and Mos Le'Harmless": 0,
                    "Fremennik Lands and Lunar Isle": 0,
                    "Great Kourend": 0,
                    "Kandarin": 0,
                    "Kebos Lowlands": 0,
                    "Kharidian Desert": 0,
                    "Misthalin": 0,
                    "Morytania": 0,
                    "Piscatoris and the Gnome Stronghold": 0,
                    "Tirannwn": 0,
                    "Wilderness": 0
                };
                starRegions = {
                    "Asgarnia": 0,
                    "Crandor and Karamja": 0,
                    "Feldip Hills and the Isle of Souls": 0,
                    "Fossil Island and Mos Le'Harmless": 0,
                    "Fremennik Lands and Lunar Isle": 0,
                    "Great Kourend": 0,
                    "Kandarin": 0,
                    "Kebos Lowlands": 0,
                    "Kharidian Desert": 0,
                    "Misthalin": 0,
                    "Morytania": 0,
                    "Piscatoris and the Gnome Stronghold": 0,
                    "Tirannwn": 0,
                    "Wilderness": 0
                };
                !!chunkInfo['challenges']['Nonskill'] && Object.keys(chunkInfo['challenges']['Nonskill']).filter(task => { return chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('StarRegion') }).forEach((task) => {
                    starRegionsPossible[chunkInfo['challenges']['Nonskill'][task]['StarRegion']]++;
                    if (globalValids.hasOwnProperty('Nonskill') && globalValids['Nonskill'].hasOwnProperty(task)) {
                        starRegions[chunkInfo['challenges']['Nonskill'][task]['StarRegion']]++;
                    }
                });
                if (!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length < 100) {
                    calcCurrentChallenges2(e.data[5]);
                } else {
                    $('.panel-active.calculating > i').remove();
                    $('.panel-active > .calculating').removeClass('outer-loading-bar').html(`<div class='noscroll display-button' onclick='calcCurrentChallenges2()'>Show New Tasks</div>`);
                }
                searchModalOpen && searchWithinChunks();
                highestModalOpen && openHighest();
                highest2ModalOpen && openHighest2();
                manualAreasModalOpen && searchManualAreas();
                chunkSectionsModalOpen && searchChunkSections();
                addEquipmentModalOpen && searchAddEquipment();
                checkSlayerLocked();
                settings['autoWalkableRollable'] && chunkJustRolled && selectAllNeighborsCanvas();
                chunkJustRolled = false;
            }
        }
    }
}

let logError = function(err) {
    if (!(location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
        let errObject = {
            date: Date(),
            map: mid || null,
            error: err
        };
        databaseRef.child('errorlogs').push(errObject);
    }
}

// Prevent caching of json get
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
});

// Prevent right-click menu from showing
window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchend = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchend", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: false });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: false });
    }
};

// Once document is loaded, create listeners on page elements
$(document).ready(function() {
    onMobile = window.mobileCheck();
    !window.location.href.split('?')[1] && $('.loading').hide();
    checkMID(window.location.href.split('?')[1]);
    console.info('Chunk Picker RS3 - Version', currentVersion);

    $('.mid').on('input', function(e) {
        if ((!(/^[a-zA-Z]+$/).test(e.target.value) && e.target.value !== '') || e.target.value.length > 4) {
            $(this).val(prevValueMid);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMid = e.target.value;
            if (e.target.value.length === 3 || e.target.value.length === 4) {
                midGood = true;
                checkIfGood();
            } else {
                midGood = false;
                $('#access').prop('disabled', true);
            }
        }
    });

    $('.pin.new').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || e.target.value.length > 16) {
            $(this).val(prevValuePinNew);
        } else {
            prevValuePinNew = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 16) {
                $('#create2').prop('disabled', false);
            } else {
                $('#create2').prop('disabled', true);
            }
        }
    });

    $('.pin.old').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || e.target.value.length > 16) {
            $(this).val(prevValuePinOld);
        } else {
            prevValuePinOld = e.target.value;
            if ((e.target.value.length >= 4 && e.target.value.length <= 16) || e.target.value.length === 0) {
                pinGood = true;
                checkIfGood();
            } else {
                pinGood = false;
                $('#access').prop('disabled', true);
            }
        }
    });

    $('.lock-pin').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || e.target.value.length > 16) {
            $(this).val(prevValueLockPin);
        } else {
            prevValueLockPin = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 16) {
                $('#lock-unlock').prop('disabled', false);
                $('.lock-pin').removeClass('wrong');
            } else {
                $('#lock-unlock').prop('disabled', true);
            }
        }
    });

    $('.pin.entry').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || e.target.value.length > 16) {
            $(this).val(prevValueLockPin);
        } else {
            prevValueLockPin = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 16) {
                $('#unlock-entry').prop('disabled', false);
                $('.pin.entry').removeClass('wrong');
            } else {
                $('#unlock-entry').prop('disabled', true);
            }
        }
    });

    $('.mid-old').on('input', function(e) {
        if ((!(/^[a-zA-Z]+$/).test(e.target.value) && e.target.value !== '') || e.target.value.length > 4) {
            $(this).val(prevValueMid2);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMid2 = e.target.value;
            if (e.target.value.length === 3 || e.target.value.length === 4) {
                mid2Good = true;
                checkIfGood2();
            } else {
                mid2Good = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });

    $('.pin.old2.first').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || e.target.value.length > 16) {
            $(this).val(prevValuePinOld2);
        } else {
            prevValuePinOld2 = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 16) {
                pin2Good = true;
                $('.pin.old2.first').removeClass('wrong');
                checkIfGood2();
            } else {
                pin2Good = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });

    $('.pin.old2.second').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || e.target.value.length > 16) {
            $(this).val(prevValuePinOld2Second);
        } else {
            prevValuePinOld2Second = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 16) {
                pin2SecondGood = true;
                checkIfGood2();
            } else {
                pin2SecondGood = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });

    $('.url').on('input', function(e) {
        if (e.target.value.length < 1) {
            $('#import2').prop('disabled', true);
        } else {
            $('#import2').prop('disabled', false);
        }
    });

    $('.username').on('input', function(e) {
        if (e.target.value.length < 1) {
            $('#highscoreoptin').prop('disabled', true);
        } else {
            $('#highscoreoptin').prop('disabled', false);
        }
    });

    $('.mid').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            //$('.pin.old').select();
            $('#access').click();
        }
    });

    $('.pin.new').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#create2').prop('disabled')) {
            $('#create2').click();
        }
    });

    $('.pin.old').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#access').prop('disabled')) {
            $('#access').click();
        }
    });

    $('.lock-pin').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#lock-unlock').prop('disabled')) {
            $('#lock-unlock').click();
        }
    });

    $('.pin.entry').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#unlock-entry').prop('disabled')) {
            $('#unlock-entry').click();
        }
    });

    $('.mid-old').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            $('.pin.old2.first').select();
        }
    });

    $('.pin.old2.first').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            $('.pin.old2.second').select();
        }
    });

    $('.pin.old2.second').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#change-pin').prop('disabled')) {
            $('#change-pin').click();
        }
    });

    $('.url').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#import2').prop('disabled')) {
            $('#import2').click();
        }
    });

    $('.username').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#highscoreoptin').prop('disabled')) {
            $('#highscoreoptin').click();
        }
    });

    $('#searchPlayerMaps').on('keypress', function(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#searchPlayerMapsButton').prop('disabled')) {
            $('#searchPlayerMapsButton').click();
        }
    });

    $('.lock-closed').hover(function() {
        $(this).removeClass('fa-lock').addClass('fa-unlock-alt');
    }, function() {
        $(this).removeClass('fa-unlock-alt').addClass('fa-lock');
    });

    $('.mid-friend').on('input', function(e) {
        if ((!(/^[a-zA-Z]+$/).test(e.target.value) && e.target.value !== '') || e.target.value.length > 4) {
            $(this).val(prevValueMidFriend);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMidFriend = e.target.value;
            if (e.target.value.length === 3 || e.target.value.length === 4) {
                midFriendGood = true;
                checkIfGoodFriend();
            } else {
                midFriendGood = false;
                $('#submit-friend-button').prop('disabled', true);
            }
        }
    });

    $('.name-friend').on('input', function(e) {
        prevValueMidFriend = e.target.value;
        if (e.target.value.length > 0) {
            nameFriendGood = true;
            checkIfGoodFriend();
        } else {
            nameFriendGood = false;
            $('#submit-friend-button').prop('disabled', true);
        }
    });
});

// [Mobile] Mobile equivalent to 'mousedown', starts drag sequence
$('body').on('touchstart', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen && !mapIntroOpen && !xpRewardOpen && !manualAreasModalOpen && !chunkSectionsModalOpen && !chunkSectionPickerModalOpen && !slayerMasterInfoModalOpen && !doableClueStepsModalOpen && !clueChunksModalOpen && !notesOpen && !newTasksOpen && !clipboardModalOpen && !overlaysModalOpen && !exitSandboxWarningModalOpen && !mobileMenuOpen && !mobileTasksOpen) {
        clickX = ev.changedTouches[0].pageX;
        clickY = ev.changedTouches[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
$('body').on('touchend', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen && !mapIntroOpen && !xpRewardOpen && !manualAreasModalOpen && !chunkSectionsModalOpen && !chunkSectionPickerModalOpen && !slayerMasterInfoModalOpen && !doableClueStepsModalOpen && !clueChunksModalOpen && !notesOpen && !newTasksOpen && !clipboardModalOpen && !overlaysModalOpen && !exitSandboxWarningModalOpen && !mobileMenuOpen && !mobileTasksOpen) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

$(document).keydown(function(event) {
    if (event.ctrlKey == true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109' || event.which == '187' || event.which == '189')) {
        event.preventDefault();
    }
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {
    if (event.ctrlKey == true) {
        event.preventDefault();
    }
});

// Prevent arrow key movement
$(document).on({
    'keydown': function(e) {
        if (e.keyCode === 27 && screenshotMode) {
            screenshotMode = false;
            $('.escape-hint').hide();
            $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu11, .topnav, #beta').show();
            if (infoCollapse && chunkInfoOn) {
                $('.menu8').hide();
                $('.hiddenInfo').show();
            } else if (chunkInfoOn) {
                $('.menu8').show();
                $('.hiddenInfo').hide();
            }
            if (recentOn && !settings['taskSidebar']) {
                $('.menu7').show();
            }
            if (chunkTasksOn) {
                $('.menu9').show();
            }
            if (topButtonsOn) {
                $('.menu6').show();
            }
            if (testMode) {
                $('.test-hint').show();
            }
            toggleQuestInfo();
            settingsMenu();
        } else if (e.keyCode === 27) {
            let modalJustClosed = false;
            if (manualModalOpen && !detailsModalOpen) { closeManualAdd(); modalJustClosed = true; }
            if (highest2ModalOpen && !detailsModalOpen && !methodsModalOpen && !questStepsModalOpen && !slayerMasterInfoModalOpen && !slayerLockedModalOpen && !constructionLockedModalOpen && !doableClueStepsModalOpen && !clueChunksModalOpen && !passiveSkillModalOpen) { closeHighest2(); modalJustClosed = true; }
            if (questStepsModalOpen && !detailsModalOpen) { closeQuestSteps(); modalJustClosed = true; }
            if (methodsModalOpen && !detailsModalOpen) { closeMethods(); modalJustClosed = true; }
            if (searchModalOpen && !searchDetailsModalOpen && !detailsModalOpen) { closeSearch(); modalJustClosed = true; }
            if (detailsModalOpen && !searchDetailsModalOpen) { closeChallengeDetails(); modalJustClosed = true; }
            if (rulesModalOpen && !presetWarningModalOpen) { closeRules(); modalJustClosed = true; }
            if (settingsModalOpen && !mapIntroOpen) { closeSettings(); modalJustClosed = true; }
            if (randomListModalOpen) { closeRandomList(); modalJustClosed = true; }
            if (statsErrorModalOpen) { closeStatsError(); modalJustClosed = true; }
            if (searchDetailsModalOpen) { closeSearchDetails(); modalJustClosed = true; }
            if (highestModalOpen && !addEquipmentModalOpen) { closeHighest(); modalJustClosed = true; }
            if (completeModalOpen) { closeComplete(); modalJustClosed = true; }
            if (addEquipmentModalOpen) { closeAddEquipment(); modalJustClosed = true; }
            if (stickerModalOpen) { closeSticker(); modalJustClosed = true; }
            if (backlogSourcesModalOpen) { closeBacklogSources(); modalJustClosed = true; }
            if (chunkHistoryModalOpen) { closeChunkHistory(); modalJustClosed = true; }
            if (challengeAltsModalOpen) { closeChallengeAlts(); modalJustClosed = true; }
            if (manualOuterModalOpen) { closeOuterAdd(); modalJustClosed = true; }
            if (monsterModalOpen) { closeMonstersAdd(); modalJustClosed = true; }
            if (patchNotesOpen) { dismissPatchNotes(); modalJustClosed = true; }
            if (friendsListModalOpen && !friendsAddModalOpen) { closeFriendsList(); modalJustClosed = true; }
            if (manualAreasModalOpen) { closeManualAreas(); modalJustClosed = true; }
            if (chunkSectionsModalOpen && !chunkSectionPickerModalOpen) { closeChunkSections(); modalJustClosed = true; }
            if (slayerMasterInfoModalOpen) { closeSlayerMasterInfo(); modalJustClosed = true; }
            if (doableClueStepsModalOpen) { closeDoableClueSteps(); modalJustClosed = true; }
            if (clueChunksModalOpen) { closeClueChunks(); modalJustClosed = true; }
            if (clipboardModalOpen) { closeClipboard(); modalJustClosed = true; }
            if (overlaysModalOpen) { closeOverlays(); modalJustClosed = true; }
            if (notesOpen && !notesEditing) { closeChunkNotes(); modalJustClosed = true; }

            if (testMode && !modalJustClosed && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !notesModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen && !mapIntroOpen && !xpRewardOpen && !manualAreasModalOpen && !chunkSectionsModalOpen && !chunkSectionPickerModalOpen && !slayerMasterInfoModalOpen && !doableClueStepsModalOpen && !clueChunksModalOpen && !notesOpen && !newTasksOpen && !clipboardModalOpen && !overlaysModalOpen) {
                warnExitSandbox();
            }
        } else if ((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !notesModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen && !mapIntroOpen && !xpRewardOpen && !manualAreasModalOpen && !chunkSectionsModalOpen && !chunkSectionPickerModalOpen && !slayerMasterInfoModalOpen && !doableClueStepsModalOpen && !clueChunksModalOpen && !notesOpen && !newTasksOpen && !clipboardModalOpen && !overlaysModalOpen && !exitSandboxWarningModalOpen && !mobileMenuOpen && !mobileTasksOpen) {
            e.preventDefault();
        }
    }
});

// ----------------------------------------------------------

// Button Functions

// ----------------------------------------------------------

// Toggle functionality for if neighbors are to be selected on chunk pick
let toggleNeighbors = function(value, extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoSelectNeighbors = value;
    extra !== 'startup' && !locked && setData();
}

// Toggle functionality for if other selected chunks are set to unlocked after chunk pick
let toggleRemove = function(value, extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoRemoveSelected = value;
    extra !== 'startup' && !locked && setData();
}

// Toggle functionality for showing chunk ids
let toggleIds = function(value) {
    showChunkIds = value;
    setCookies();
}

// Opens the lock box
let unlock = function() {
    lockBoxOpen = true;
    $('.lock-box').show();
    $('.lock-closed').hide();
    $('.lock-pin').val('').removeClass('wrong').focus();
}

// Copies unlocked chunks/tasks to clipboard
let exportFunc = function(type) {
    if (type === 'chunks') {
        let unlockedChunksTemp = '';
        !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).forEach((chunkId) => {
            unlockedChunksTemp += chunkId + ',';
        });
        unlockedChunksTemp = unlockedChunksTemp.slice(0, -1);
        navigator.clipboard.writeText(unlockedChunksTemp);
    } else if (type === 'tasks') {
        let tasksTemp = $('.panel-active .challenge').map(function() {
            return $(this).text().trim();
        }).get().join('\n');
        navigator.clipboard.writeText(tasksTemp);
    }
    $('#myModal38').hide();
}

// Opens the import menu
let importFunc = function() {
    $('#import-menu').show();
    $('.url').focus();
    importMenuOpen = true;
    $('#import-menu').css('opacity', 1).show();
    settingsOpen = false;
    $('.settings-menu').hide();
    $('.settings').css({ 'color': 'var(--colorText)' });
}

// Checks if URL is formatted correctly, then imports it into the map
let importFromURL = function() {
    $('#import2').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    $('.url').removeClass('wrong');
    $('.url-err').css('visibility', 'hidden');
    let url = $('.url').val();
    if (url.split('?')[0] === 'https://gitgeddes.github.io/ChunkPicker/' || url.split('?')[0] === 'gitgeddes.github.io/ChunkPicker/') {
        setTimeout(function() {
            let chunkStrSplit = url.split('?')[1].split(';');
            let unlocked = stringToChunkIndexes(chunkStrSplit[0]);
            let selected = chunkStrSplit[1] ? stringToChunkIndexes(chunkStrSplit[1]) : null;
            tempChunks['selected'] = {};
            tempChunks['potential'] = {};
            tempChunks['unlocked'] = {};
            tempChunks['blacklisted'] = {};
            tempSelectedChunks = [];
            recentChunks = {};
            roll2On && $('.roll2').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
            unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
            recentOn && !settings['taskSidebar'] && $('.menu7').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
            chunkTasksOn && $('.menu9').css({ 'opacity': 1 }).show();
            topButtonsOn && $('.menu6').css({ 'opacity': 1 }).show();
            isPicking = false;
            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;

            let tempX;
            let tempY;
            selected && selected.sort(function(a, b) { return b - a }).forEach(function(id) {
                while (id.startsWith('0') && id.length > 1) {
                    id = id.substr(1);
                }
                tempX = parseInt(id) % rowSize;
                tempY = Math.floor(parseInt(id) / rowSize);
                id = convertToChunkNum(tempX, tempY);
                tempSelectedChunks.push(id.toString());
                tempChunks['selected'][id] = tempSelectedChunks.indexOf(id.toString()) + 1;
            });

            unlocked && unlocked.forEach(function(id) {
                while (id.startsWith('0') && id.length > 1) {
                    id = id.substr(1);
                }
                tempX = parseInt(id) % rowSize;
                tempY = Math.floor(parseInt(id) / rowSize);
                id = convertToChunkNum(tempX, tempY);
                tempChunks['unlocked'][id] = id;
            });

            for (let count = 1; count <= 5; count++) {
                recent[count - 1] = null;
                recentTime[count - 1] = null;
                $('#recentChunks' + count).html('<span class="chunknone" onclick="recentChunkCanvas(recentChunks' + count + ')">-</span>');
            }
            $('#chunkInfo2').text('Selected chunks: ' + ((!!tempChunks['selected'] ? Object.keys(tempChunks['selected']).length : 0) + (!!tempChunks['potential'] ? Object.keys(tempChunks['potential']).length : 0)));
            $('#chunkInfo1').text('Unlocked chunks: ' + (!!tempChunks['unlocked'] ? Object.keys(tempChunks['unlocked']).length : 0));
            setData();
            $('#import-menu').css({ 'opacity': 0 }).hide();
            $('.import').css('opacity', 0).show();
            $('.import').animate({ 'opacity': 1 });
            if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
                $('.pick').text('Random Start?');
            } else {
                $('.pick').text('Pick Chunk');
            }
            calcCurrentChallengesCanvas();
            setTimeout(function() {
                $('#import-menu').css('opacity', 1);
                $('#import2').prop('disabled', true).html('Unlock');
                $('.url').val('');
                importMenuOpen = false;
            }, 500);
        }, 1000);
    } else {
        setTimeout(function() {
            $('.url-err').css('visibility', 'visible');
            $('.url').addClass('wrong').select();
            $('#import2').text('Import');
        }, 1000);
    }
}

// Exits the import menu
let exitImportMenu = function() {
    $('#import-menu').css({ 'opacity': 0 }).hide();
    setTimeout(function() {
        $('#import-menu').css('opacity', 1);
        $('#import2').prop('disabled', true).html('Unlock');
        $('.url').val('');
        $('.url').removeClass('wrong');
        $('.url-err').css('visibility', 'hidden');
        importMenuOpen = false;
    }, 500);
}

// Opens the highscores menu
let highscoreFunc = function() {
    $('.username').focus();
    highscoreMenuOpen = true;
    $('#highscore-menu').css('opacity', 1).show();
    settingsOpen = false;
    $('.settings-menu').hide();
    $('.settings').css({ 'color': 'var(--colorText)' });
}

// Sets username for the highscores
let highscoreOptIn = function() {
    return; //TEMP (highscore not enabled)
    $('#highscoreoptin').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    let oldUsername = userName;
    userName = $('.username').val();
    databaseRef.child('highscores/players').once('value', function(snap) {
        if (snap.val().hasOwnProperty(userName.toLowerCase())) {
            $('#myModal9').show();
            $('#highscoreoptin').prop('disabled', true).html('Save Username');
        } else {
            setTimeout(function() {
                setUsername(oldUsername);
                $('.highscoretoggle').html('Change chunk stats username<i class="pic fas fa-trophy"></i>');
                $('#highscore-menu').css({ 'opacity': 0 }).hide();
                $('#highscore-menu2').css({ 'opacity': 1 }).show();
                $('#populateButton').attr({ 'href': 'https://chunk-stats.web.app/user/' + userName });
                setTimeout(function() {
                    $('#highscore-menu').css('opacity', 1);
                    $('#highscoreoptin').prop('disabled', true).html('Save Username');
                    $('.username').val('');
                }, 500);
            }, 1000);
        }
    });
}

// Exits the highscores menu
let exitHighscoreMenu = function() {
    $('#highscore-menu').css({ 'opacity': 0 }).hide();
    setTimeout(function() {
        $('#highscore-menu').css('opacity', 1);
        $('#highscoreoptin').prop('disabled', true).html('Save Username');
        $('.username').val('');
        highscoreMenuOpen = false;
    }, 500);
}

// Exits the highscores menu2
let exitHighscoreMenu2 = function() {
    $('#highscore-menu2').css({ 'opacity': 0 }).hide();
    setTimeout(function() {
        $('#highscore-menu2').css('opacity', 1);
        $('#highscoreoptin').prop('disabled', true).html('Save Username');
        $('.username').val('');
        highscoreMenuOpen = false;
    }, 500);
}

// Opens the help menu
let helpFunc = function() {
    helpMenuOpen = true;
    $('#help-menu').css('opacity', 1).show();
}

// Exits the help menu
let dismissHelp = function() {
    $('#help-menu').css({ 'opacity': 0 }).hide();
    helpMenuOpen = false;
    helpMenuOpenSoon = false;
    !locked && setData();
}

// Exits the pick warning window
let cancelPickWarning = function() {
    pickChunkWarningModalOpen = false;
    $('#myModal41').hide();
}

// Exits the roll 2 warning window
let cancelRoll2Warning = function() {
    roll2ChunkWarningModalOpen = false;
    $('#myModal44').hide();
}

// Opens the patch notes
let openPatchNotesModal = function(fromClick) {
    if (hasUpdate && fromClick) {
        location.reload();
    } else if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        patchNotesOpen = true;
        $('#myModal24').show();
        modalOutsideTime = Date.now();
    }
}

// Exits the patch notes
let dismissPatchNotes = function() {
    $('#myModal24').hide();
    patchNotesOpen = false;
    patchNotesOpenSoon = false;
    !locked && setData();
}

// Opens the chunk notes modal
let openChunkNotesModal = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        notesOpen = true;
        $('#save-chunk-notes-button').text((signedIn || testMode) ? (notesEditing ? 'Save' : 'Edit') : 'Exit');
        $('#chunk-notes-data textarea').attr('disabled', !(signedIn || testMode)).val((!!chunkNotes && Object.keys(chunkNotes).length > 0) ? chunkNotes : "").hide();
        $('#chunk-notes-markdown-text').html(marked.parse(chunkNotes || ''));
        $('#myModal35').show();
        modalOutsideTime = Date.now();
        document.getElementById('chunk-notes-data').scrollTop = 0;
    }
}

// Saves the chunk notes
let saveChunkNotes = function() {
    if (!(signedIn || testMode)) {
        $('#myModal35').hide();
        notesOpen = false;
        !locked && setData();
    } else {
        notesEditing = !notesEditing;
        if (notesEditing) {
            $('#save-chunk-notes-button').text('Save');
            $('#myModal35 .manual-close').hide();
            $('#chunk-notes-data textarea').show();
            $('#chunk-notes-markdown-text').hide();
        } else {
            $('#save-chunk-notes-button').text('Edit');
            $('#myModal35 .manual-close').show();
            $('#chunk-notes-data textarea').hide();
            $('#chunk-notes-markdown-text').show();
            chunkNotes = $('#chunk-notes-data textarea').val() || '';
            $('#chunk-notes-markdown-text').html(marked.parse(chunkNotes));
            document.getElementById('chunk-notes-data').scrollTop = 0;
            !locked && setData();
        }
    }
}

// Opens the new chunk tasks modal
let openNewTasksModal = function(data, expandFuture) {
    newTasksOpen = true;
    $('.new-tasks-title').text(expandFuture ? 'Potential Chunk Tasks' : 'New Chunk Tasks');
    $('.new-tasks-data').html(data);
    $('#myModal36').show();
    modalOutsideTime = Date.now();
}

// Closes the new chunk tasks modal
let closeNewTasks = function() {
    $('#myModal36').hide();
    newTasksOpen = false;
    modalOutsideTime = Date.now();
}

// Opens the xp reward modal
let openXpRewardModal = function(skill, line, xpArr, num) {
    if (tempSkillChoice !== null || num === 0) {
        if (tempXpArr === null) {
            tempXpArr = xpArr;
        }
        if ((num + 1) > tempXpArr.length) {
            xpRewardOpen = false;
            tempXpChoices.push({skill: tempSkillChoice, xp: tempXpArr[num - 1].xp});
            if (!assignedXpRewards[skill]) {
                assignedXpRewards[skill] = {};
            }
            assignedXpRewards[skill][line] = {};
            allNone = true;
            tempXpChoices.forEach((choice) => {
                if (!assignedXpRewards[skill][line][choice.skill]) {
                    assignedXpRewards[skill][line][choice.skill] = 0;
                }
                assignedXpRewards[skill][line][choice.skill] += choice.xp;
                if (choice.skill !== 'None') {
                    allNone = false;
                }
            });
            tempXpArr = null;
            tempSkillChoice = null;
            if (!checkedChallenges.hasOwnProperty(skill) || !checkedChallenges[skill].hasOwnProperty(line)) {
                if (!checkedChallenges.hasOwnProperty(skill)) {
                    checkedChallenges[skill] = {};
                }
                checkedChallenges[skill][line] = true;
            } else {
                delete checkedChallenges[skill][line];
            }
            let challengeLine = $('.' + skill + '-' + line.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge');
            $(challengeLine).addClass('hide-backlog');
            $($(challengeLine).find('input')[0]).prop('checked', true);
            changeChallengeColor();
            if (!allNone) {
                calcCurrentChallengesCanvas(true);
            }
            setData();
            toggleHiddenTasks(settings['hideChecked'] && actuallyHideChecked);
            $('#myModal30').hide();
        } else {
            if (num === 0) {
                xpRewardOpen = true;
                tempXpChoices = [];
                tempSkillChoice = null;
            } else {
                tempXpChoices.push({skill: tempSkillChoice, xp: tempXpArr[num - 1].xp});
                $('.selected-xp-reward-skill').removeClass('selected-xp-reward-skill');
                tempSkillChoice = null;
            }
            $('#xp-reward-title').text(`Select which skill the ${tempXpArr[num].xp} xp reward was used on (${num + 1} of ${tempXpArr.length})`);
            $('#submit-xp-reward-button').text(num + 1 === tempXpArr.length ? 'Save' : 'Next');
            $('#submit-xp-reward-button').removeAttr('onclick').addClass('disabled');
            $('#submit-xp-reward-button').attr('onClick', `openXpRewardModal("${skill}", "${line}", "", ${num + 1});`);
            $('.xp-reward-data').empty();
            ['None', ...skillNamesXp.filter(skillOpt => { return (tempXpArr[num].skills.split('x')[0] === 'Any' || tempXpArr[num].skills.split('|').includes(skillOpt)) })].forEach((skillOpt) => {
                if (skillOpt !== 'None') {
                    $('.xp-reward-data').append(`<span class='noscroll xp-reward-option-container ${skillOpt}-tag' title='${skillOpt.charAt(0).toUpperCase() + skillOpt.slice(1)}' onclick="setXpRewardSkill('${skillOpt}')"><img class="noscroll ${skillOpt}_xp" src="./resources/${skillOpt}_skill.png"></span>`);
                } else {
                    $('.xp-reward-data').append(`<span class='noscroll xp-reward-option-container black-outline unset-option' title='${skillOpt.charAt(0).toUpperCase() + skillOpt.slice(1)}' onclick="setXpRewardSkill('${skillOpt}')"><span class='noscroll none-xp-container'><i class="noscroll fas fa-ban" style="transform: scaleX(-1)"></i></span></span>`);
                }
                $('.' + skillOpt + '_xp').on('load', function() {
                    $(this).css({'left': -$(this).width() / 2, 'top': -$(this).height() / 2});
                });
            });
            $('#myModal30').show();
        }
    }
}

// Opens the xp reward modal, redirected from xp button
let openXpRewardModalWithFormat = function(skill, line) {
    let xpArr = [];
    line = decodeQueryParam(line);
    Object.keys(chunkInfo['challenges'][skill][line]['XpReward']).filter(skill => { return !skillNamesXp.includes(skill) }).forEach((xpLine) => {
        if (xpLine.match(/[A-Za-z|]+x[0-9]+/gm)) {
            let count = parseInt(xpLine.split('x')[1]);
            for (let i = 0; i < count; i++) {
                xpArr.push({skills: xpLine.split('x')[0], xp: chunkInfo['challenges'][skill][line]['XpReward'][xpLine]});
            }
        } else {
            xpArr.push({skills: xpLine, xp: chunkInfo['challenges'][skill][line]['XpReward'][xpLine]});
        }
    });
    openXpRewardModal(skill, line, xpArr, 0);
}

// Sets the chosen skill for the xp reward
let setXpRewardSkill = function(opt) {
    tempSkillChoice = opt;
    $('.selected-xp-reward-skill').removeClass('selected-xp-reward-skill');
    if (opt !== 'None') {
        $(`.xp-reward-data > .xp-reward-option-container.${opt}-tag`).addClass('selected-xp-reward-skill');
    } else {
        $(`.xp-reward-data > .xp-reward-option-container.unset-option`).addClass('selected-xp-reward-skill');
    }
    $('#submit-xp-reward-button').removeClass('disabled');
}

// Closes the xp reward modal
let closeXpRewardModal = function() {
    xpRewardOpen = false;
    tempXpArr = null;
    tempSkillChoice = null;
    $('#myModal30').hide();
}

// Opens the map intro modal
let openMapIntroModal = function(justStartingChunk) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        mapIntroOpen = true;
        $('.intro-data-2').hide();
        $('#cancel-intro-button').hide();
        $('#myModal29').show();
        justStartingChunk && nextIntroPage(justStartingChunk);
    }
}

// Exits the map intro modal
let closeMapIntroModal = function() {
    $('#myModal29').hide();
    mapIntroOpen = false;
    mapIntroOpenSoon = false;
    settings['mapIntro'] = true;
    removeStartingChunk();
    settings['startingChunk'] = prevStartingChunkValue;
    !locked && setData();
    settingsModalOpen && showSettings(true);
    setStartingChunk();
}

// Next page in intro modal
let nextIntroPage = function(justStartingChunk) {
    if ($('.intro-data-1').is(":visible") || justStartingChunk) {
        $('.intro-data-1').hide();
        $('.intro-data-2').show();
        $('#submit-intro-button').text('All Done!').prop('disabled', true);
        $('#starting-chunk-input').val((settings['startingChunk'] === '0000' || settings['startingChunk'] === '00000') ? '' : settings['startingChunk']);
        !justStartingChunk && $('#cancel-intro-button').show();
        checkStartingChunkFormat();
    } else {
        closeMapIntroModal();
    }
}

// Previous page in intro modal
let previousIntroPage = function() {
    if ($('.intro-data-2').length) {
        $('.intro-data-2').hide();
        $('.intro-data-1').show();
        $('#submit-intro-button').text('Next');
        $('#cancel-intro-button').hide();
        checkIntroPage1();
    }
}

// Handles selecting roll
let handleRoll = function(self) {
    settings['roll2'] = (self.value === 'roll2');
    introRollSelected = true;
    checkIntroPage1();
    toggleRoll2(settings['roll2']);
}

// Handles selecting fancy
let handleFancy = function(self) {
    settings['cinematicRoll'] = (self.value === 'fancy');
    introFancySelected = true;
    checkIntroPage1();
}

// Handles selecting color scheme
let handleDark = function(self) {
    settings['theme'] = self.value;
    introDarkSelected = true;
    checkIntroPage1();
    toggleTheme(settings['theme']);
}

// Checks if intro page 1 is valid to move on
let checkIntroPage1 = function() {
    $('#submit-intro-button').prop('disabled', !(introRollSelected && introFancySelected && introDarkSelected));
}

// Verifies starting chunk is valid format
let checkStartingChunkFormat = function() {
    if (!$('#starting-chunk-input').val().match(/^[0-9]*$/i) || $('#starting-chunk-input').val().length > 5) {
        $('#starting-chunk-input').val(prevStartingChunkValue);
        if ($('#starting-chunk-input').val().length !== 5 && $('#starting-chunk-input').val().length !== 4) {
            $('#submit-intro-button').prop('disabled', true);
        } else {
            $('#submit-intro-button').prop('disabled', false);
        }
    } else {
        if ($('#starting-chunk-input').val().length !== 5 && $('#starting-chunk-input').val().length !== 4) {
            prevStartingChunkValue = $('#starting-chunk-input').val();
            $('#submit-intro-button').prop('disabled', true);
        } else {
            prevStartingChunkValue = $('#starting-chunk-input').val();
            $('#submit-intro-button').prop('disabled', false);
        }
    }
}

// Removes the starting chunk on the map
let removeStartingChunk = function() {
    if (settings['startingChunk'] !== '0000' && settings['startingChunk'] !== '00000') {
        savedStickerId = settings['startingChunk'];
        savedStickerSticker = 'unset';
        submitSticker();
    }
}

// Sets the starting chunk on the map
let setStartingChunk = function() {
    if (settings['startingChunk'] !== '0000' && settings['startingChunk'] !== '00000') {
        savedStickerId = settings['startingChunk'];
        savedStickerSticker = '1st';
        submitSticker();
    }
}

// Confirms if the pin entered is correct for the current map id
let checkPin = function() {
    savedPin = $('.lock-pin').val();
    changeLocked();
}

// Confirms if the pin is entered correctly in the entry menu, and acts accordingly
let unlockEntry = function() {
    savedPin = $('.pin.entry').val();
    $('#unlock-entry').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then((methods) => {
        if (signInAttempts > 15) {
            setTimeout(function() {
                $('.pin.entry').addClass('animated shake wrong').select();
                $('#unlock-entry').prop('disabled', true).html('Unlock');
                signInAttempts++;
                setTimeout(function() {
                    $('.pin.entry').removeClass('animated shake');
                }, 500);
            }, (1500 + signInAttempts * 10));
        } else if (!!methods && methods.length > 0) {
            setTimeout(function() {
                firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                    signedIn = true;
                    $('.center').css('margin-top', '15px');
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).show();
                    roll2On && $('.roll2').css('opacity', 0).show();
                    !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                    $('.open-manual-outer-container').css('opacity', 0).show();
                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                    $('#entry-menu').animate({ 'opacity': 0 });
                    setTimeout(function() {
                        $('#entry-menu').css('opacity', 1).hide();
                        $('.pin.entry').val('');
                        $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').animate({ 'opacity': 1 });
                        roll2On && $('.roll2').animate({ 'opacity': 1 });
                        !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                        $('.open-manual-outer-container').animate({ 'opacity': 1 });
                        rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                        $('#unlock-entry').prop('disabled', false).html('Unlock');
                        locked = false;
                        inEntry = false;
                        helpMenuOpenSoon && helpFunc();
                        patchNotesOpenSoon && openPatchNotesModal();
                        mapIntroOpenSoon && openMapIntroModal(justStartingChunkSet);
                        unlockChallenges();
                        setRecentLogin();
                    }, 500);
                }).catch((error) => {
                    $('.pin.entry').addClass('animated shake wrong').select();
                    $('#unlock-entry').prop('disabled', true).html('Unlock');
                    console.error('Incorrect map password');
                    signInAttempts++;
                });
                setTimeout(function() {
                    $('.pin.entry').removeClass('animated shake');
                }, 500);
            }, 1000);
        } else {
            myRef.child('pin').once('value', function(snap) {
                if ((snap.val() && snap.val() === savedPin)) {
                    setTimeout(function() {
                        firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                            signedIn = true;
                            myRef.child('uid').set(userCredential.user.uid, function(error) {
                                if (error) {
                                    regainConnectivity(() => {
                                        myRef.child('pin').remove();
                                    });
                                } else {
                                    myRef.child('pin').remove();
                                }
                            });
                            userCredential.user.updateProfile({
                                displayName: mid
                            });
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).show();
                            roll2On && $('.roll2').css('opacity', 0).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                            $('.open-manual-outer-container').css('opacity', 0).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                            $('#entry-menu').animate({ 'opacity': 0 });
                            setTimeout(function() {
                                $('#entry-menu').css('opacity', 1).hide();
                                $('.pin.entry').val('');
                                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').animate({ 'opacity': 1 });
                                roll2On && $('.roll2').animate({ 'opacity': 1 });
                                !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                                $('.open-manual-outer-container').animate({ 'opacity': 1 });
                                rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                                $('#unlock-entry').prop('disabled', false).html('Unlock');
                                locked = false;
                                inEntry = false;
                                helpMenuOpenSoon && helpFunc();
                                patchNotesOpenSoon && openPatchNotesModal();
                                mapIntroOpenSoon && openMapIntroModal(justStartingChunkSet);
                                unlockChallenges();
                            }, 500);
                        }).catch((error) => {
                            $('.pin.entry').addClass('animated shake wrong').select();
                            $('#unlock-entry').prop('disabled', true).html('Unlock');
                            console.error('Incorrect map password');
                            signInAttempts++;
                        });
                    }, 1000);
                    setTimeout(function() {
                        $('.pin.entry').removeClass('animated shake');
                    }, 500);
                } else {
                    setTimeout(function() {
                        $('.pin.entry').addClass('animated shake wrong').select();
                        $('#unlock-entry').prop('disabled', true).html('Unlock');
                        setTimeout(function() {
                            $('.pin.entry').removeClass('animated shake');
                        }, 500);
                    }, 1000);
                }
            });
        }
    });
}

// Hides the entry menu and displays map in locked mode
let proceed = function() {
    $('#entry-menu').animate({ 'opacity': 0 });
    $('.lock-closed').css('opacity', 0).show();
    setTimeout(function() {
        $('#entry-menu').css('opacity', 1).hide();
        !viewOnly ? $('.lock-closed').animate({ 'opacity': 1 }) : $('.lock-closed').hide();
        $('#unlock-entry').prop('disabled', false).html('Unlock');
        locked = true;
        inEntry = false;
    }, 500);
}

// On the home page, advances to the next screen
let nextPage = function(page) {
    $('.entry-home-menu-container').hide();
    if (page === 'create') {
        $('#create2').prop('disabled', true);
        $('.entry-home-menu-container').hide();
        $('#page2a').show();
        $('.pin').focus();
    } else if (page === 'create2') {
        $('#create2').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
        pin = $('.pin.new').val();
        setTimeout(function() {
            $('#page2a').hide();
            $('#page3a').show();
        }, 500);
        !mid && rollMID();
    } else if (page === 'mid') {
        midGood = false;
        pinGood = true;
        $('#access').prop('disabled', true);
        $('.entry-home-menu-container').hide();
        $('#page2b').show();
        $('.mid').focus();
    }
}

// On the home page, goes back to the previous page
let prevPage = function(page) {
    if (page === 'create2') {
        $('#page2a').hide();
        $('.entry-home-menu-container').show();
        pin = '';
        $('.pin').val('');
    } else if (page === 'create3') {
        $('#page3a').hide();
        $('#page2a').show();
        $('.pin').focus();
    } else if (page === 'mid') {
        $('#page2b').hide();
        $('.entry-home-menu-container').show();
        $('.mid').removeClass('wrong').val('');
        $('.pin.old').removeClass('wrong').val('');
        $('.mid-err').css('visibility', 'hidden');
        $('.pin-err').css('visibility', 'hidden');
    }
}

// Confirms that the map id exists, and that the pin is correct for that map id (if pin is filled in), and then advances to the map if all is correct
let accessMap = function() {
    $('#access').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    mid = $('.mid').removeClass('wrong').val().toLowerCase();
    savedPin = $('.pin.old').removeClass('wrong').val();
    databaseRef.child('mapids/' + mid).once('value', function(snap) {
        if (!snap.val()) {
            databaseRef.child('maps/' + mid).once('value', function(snap) {
                if (!snap.val()) {
                    setTimeout(function() {
                        $('.mid-err').css('visibility', 'visible');
                        $('.mid').addClass('wrong').select();
                        $('#access').text('Access my map');
                    }, 1000);
                    return;
                } else {
                    databaseRef.child('mapids/' + mid).set(true);
                }
            });
        }
        if ($('.pin.old').val()) {
            firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then((methods) => {
                myRef = firebase.database().ref('maps/' + mid);
                if (!!methods && methods.length > 0) {
                    setTimeout(function() {
                        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                            signedIn = true;
                            window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker RS3', '?' + mid);
                            document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker RS3';
                            $('#entry-menu').hide();
                            $('.lock-opened').show();
                            $('.lock-closed').hide();
                            locked = false;
                            helpMenuOpenSoon && helpFunc();
                            patchNotesOpenSoon && openPatchNotesModal();
                            mapIntroOpenSoon && openMapIntroModal(justStartingChunkSet);
                            atHome = false;
                            $('.loading').show();
                            $('#page2b, .entry-home-menu-container, .entry-home-menu-extra').hide();
                            $('.background-img').hide();
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 1).show();
                            $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu8, .menu9, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv').show();
                            roll2On && $('.roll2').css('opacity', 1).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
                            recentOn && !settings['taskSidebar'] && $('.menu7').show();
                            $('.open-manual-outer-container').css('opacity', 1).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
                            setRecentLogin();
                            setupMap();
                        }).catch((error) => {
                            $('.pin-err').css('visibility', 'visible');
                            $('.pin.old').addClass('wrong').select();
                            $('#access').text('Access my map');
                            console.error('Incorrect map password');
                        });
                        setTimeout(function() {
                            $('.pin.entry').removeClass('animated shake');
                        }, 500);
                    }, 1000);
                } else {
                    myRef.child('pin').once('value', function(snap) {
                        if ((snap.val() && snap.val() === savedPin)) {
                            setTimeout(function() {
                                firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                                    signedIn = true;
                                    myRef.child('uid').set(userCredential.user.uid, function(error) {
                                        if (error) {
                                            regainConnectivity(() => {
                                                myRef.child('pin').remove();
                                            });
                                        } else {
                                            myRef.child('pin').remove();
                                        }
                                    });
                                    userCredential.user.updateProfile({
                                        displayName: mid
                                    });
                                    window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker RS3', '?' + mid);
                                    document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker RS3';
                                    $('#entry-menu').hide();
                                    $('.lock-opened').show();
                                    $('.lock-closed').hide();
                                    locked = false;
                                    helpMenuOpenSoon && helpFunc();
                                    patchNotesOpenSoon && openPatchNotesModal();
                                    mapIntroOpenSoon && openMapIntroModal(justStartingChunkSet);
                                    myRef = firebase.database().ref('maps/' + mid);
                                    atHome = false;
                                    $('.loading').show();
                                    $('#page2b, .entry-home-menu-container, .entry-home-menu-extra').hide();
                                    $('.background-img').hide();
                                    $('.center').css('margin-top', '15px');
                                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 1).show();
                                    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu8, .menu9, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv').show();
                                    roll2On && $('.roll2').css('opacity', 1).show();
                                    !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
                                    recentOn && !settings['taskSidebar'] && $('.menu7').show();
                                    $('.open-manual-outer-container').css('opacity', 1).show();
                                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
                                    setupMap();
                                }).catch((error) => {
                                    $('.pin-err').css('visibility', 'visible');
                                    $('.pin.old').addClass('wrong').select();
                                    $('#access').text('Access my map');
                                });
                            }, 1000);
                            setTimeout(function() {
                                $('.pin.entry').removeClass('animated shake');
                            }, 500);
                        } else {
                            setTimeout(function() {
                                $('.pin-err').css('visibility', 'visible');
                                $('.pin.old').addClass('wrong').select();
                                $('#access').text('Access my map');
                                setTimeout(function() {
                                    $('.pin.entry').removeClass('animated shake');
                                }, 500);
                            }, 1000);
                        }
                    });
                }
            });
        } else {
            window.location.href = window.location.href.split('?')[0] + '?' + mid;
            /*document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker RS3';
            $('.lock-closed, .lock-opened').hide();
            locked = true;
            inEntry = true;
            myRef = firebase.database().ref('maps/' + mid);
            atHome = false;
            $('.loading').show();
            $('#page2b, .entry-home-menu-container, .entry-home-menu-extra').hide();
            $('.background-img').hide();
            setupMap();*/
        }
    });
}

// Confirms that the map id exists, and that the pin is correct for that map id (if pin is filled in), then changes the pin, and then finally advances to the map if all is correct
let changePin = function() {
    $('#change-pin').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    let mid = $('.mid-old').removeClass('wrong').val().toLowerCase();
    let pinOld = $('.pin.old2.first').removeClass('wrong').val();
    let pinNew = $('.pin.old2.second').val();
    databaseRef.child('maps/' + mid).once('value', function(snap) {
        if (!snap.val()) {
            setTimeout(function() {
                $('.mid-err').css('visibility', 'visible');
                $('.mid-old').addClass('wrong').select();
                $('#change-pin').text('Change Password');
            }, 1000);
            return;
        }

        if (signInAttempts > 15) {
            setTimeout(function() {
                $('.pin-err').css('visibility', 'visible');
                $('.pin.old2.first').addClass('wrong').select();
                $('#change-pin').text('Change Password');
                signInAttempts++;
            }, (1500 + signInAttempts * 10));
        } else {
            setTimeout(function() {
                firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', pinOld + mid).then((userCredential) => {
                    if (onTestServer || testMode) {
                        return;
                    }
                    signedIn = true;
                    myRef = firebase.database().ref('maps/' + mid);
                    if (!onTestServer && !testMode) {
                        firebase.auth().currentUser.updatePassword(pinNew + mid).then(() => {
                            window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker RS3', '?' + mid);
                            document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker RS3';
                            $('.lock-closed, .lock-opened').hide();
                            locked = true;
                            inEntry = true;
                            atHome = false;
                            $('.loading').show();
                            $('#page8').hide();
                            $('.background-img').hide();
                            $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu8, .menu9, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv').show();
                            recentOn && !settings['taskSidebar'] && $('.menu7').show();
                            setupMap();
                        }).catch((error) => { console.error(error) });
                    }
                }).catch((error) => {
                    $('.pin-err').css('visibility', 'visible');
                    $('.pin.old2.first').addClass('wrong').select();
                    $('#change-pin').text('Change Password');
                    console.error('Incorrect map password');
                    signInAttempts++;
                    return;
                });
            }, 1000);
        }
    });
}

// Opens/closes the settings menu
let settingsMenu = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        settingsOpen = !settingsOpen;
        if (settingsOpen) {
            $('.settings-menu').show();
            $('.settings').css({ 'color': 'rgb(150, 150, 150)' });
        } else {
            $('.settings-menu').hide();
            $('.settings').css({ 'color': 'var(--colorText)' });
        }
    }
}

// Enables screenshot mode
let enableScreenshotMode = function() {
    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .menu11, .settings-menu, .topnav, #beta, .hiddenInfo, .test-hint').hide();
    onMobile && hideMobileMenu();
    if (onMobile && screenshotMode) {
        screenshotMode = false;
        $('.menu, .menu2, .menu3, .menu4, .menu5, .topnav, #beta').show();
        if (testMode) {
            $('.test-hint').show();
        }
    } else {
        screenshotMode = true;
        !onMobile && $('.escape-hint').css('opacity', 1).show();
        setTimeout(function() {
            $('.escape-hint').animate({ 'opacity': 0 });
            setTimeout(function() {
                $('.escape-hint').hide();
            }, 500);
        }, 1000);
    }
}

// Toggles test mode
let enableTestMode = function(close, fromConfirm) {
    onMobile && hideMobileMenu();
    if (fromConfirm) {
        $('#myModal40').hide();
        exitSandboxWarningModalOpen = false;
        if (close) {
            return;
        }
    }
    testMode = !testMode;
    testMode ? $('.test-hint').css('opacity', 1).show() : $('.test-hint').css('opacity', 0).hide();
    if (!testMode) {
        recentlyTestMode = true;
        loadData();
        (viewOnly || inEntry || locked) && $('.open-manual-outer-container').css('opacity', 0).hide();
        (viewOnly || inEntry || locked) && $('.center').css('margin-top', '0px');
        (viewOnly || inEntry || locked) && $('.pick, .roll2, .unpick').css('opacity', 0).hide();
        (viewOnly || inEntry || locked) && $(`.backlogSources-container`).remove();
    } else {
        unlockChallenges();
        $('.open-manual-outer-container').css('opacity', 1).show();
        rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
        $('.center').css('margin-top', '15px');
        $('.pick').css('opacity', 1).show();
        roll2On && $('.roll2').css('opacity', 1).show();
        !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
    }
    !fromConfirm && settingsMenu();
}

// Toggles high visibility mode
let toggleVisibility = function(value) {
    highVisibilityMode = value;
    setCookies();
}

// Toggles dark mode
let toggleTheme = function(value) {
    theme = value;
    settings['theme'] = value;
    setData();
    if (theme === 'light') {
        $("body").get(0).style.setProperty("--color1", "rgb(200, 200, 200)");
        $("body").get(0).style.setProperty("--color2", "rgb(180, 180, 180)");
        $("body").get(0).style.setProperty("--color3", "rgb(220, 220, 220)");
        $("body").get(0).style.setProperty("--color4", "rgb(230, 230, 230)");
        $("body").get(0).style.setProperty("--color5", "rgb(200, 200, 100)");
        $("body").get(0).style.setProperty("--color6", "rgb(255, 255, 255)");
        $("body").get(0).style.setProperty("--color7", "rgb(240, 240, 240)");
        $("body").get(0).style.setProperty("--color8", "rgb(150, 150, 150)");
        $("body").get(0).style.setProperty("--color9", "rgb(120, 120, 120)");
        $("body").get(0).style.setProperty("--colorText", "rgb(0, 0, 0)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(30, 30, 30)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(0, 0, 255)");
        $("body").get(0).style.setProperty("--colorFlash", "rgba(255, 255, 0, 0.7)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(150, 150, 150, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(150, 150, 150, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(200, 200, 200, 0.4)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(0, 0, 0)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(0, 0, 0)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(200, 200, 0)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(0, 0, 0)");
        $(".btnDiv").removeClass('dark');
        colorBox = "rgba(150, 150, 150, 0.6)";
        colorBoxLight = "rgba(150, 150, 150, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-light.png");
    } else if (theme === 'dark') {
        $("body").get(0).style.setProperty("--color1", "rgb(22, 27, 34)");
        $("body").get(0).style.setProperty("--color2", "rgb(13, 17, 23)");
        $("body").get(0).style.setProperty("--color3", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--color4", "rgb(56, 60, 69)");
        $("body").get(0).style.setProperty("--color5", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--color6", "rgb(22, 27, 34)");
        $("body").get(0).style.setProperty("--color7", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--color8", "rgb(61, 65, 74)");
        $("body").get(0).style.setProperty("--color9", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--colorText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(181, 189, 197)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(88, 166, 255)");
        $("body").get(0).style.setProperty("--colorFlash", "rgba(150, 150, 0, 0.7)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(200, 200, 0)");
        $(".btnDiv").addClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-dark.png");
    } else if (theme === 'terminal') {
        $("body").get(0).style.setProperty("--color1", "rgb(10, 10, 10)");
        $("body").get(0).style.setProperty("--color2", "rgb(20, 20, 20)");
        $("body").get(0).style.setProperty("--color3", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color4", "rgb(56, 60, 69)");
        $("body").get(0).style.setProperty("--color5", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color6", "rgb(10, 10, 10)");
        $("body").get(0).style.setProperty("--color7", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color8", "rgb(65, 65, 65)");
        $("body").get(0).style.setProperty("--color9", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorText", "rgb(0, 255, 0)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(102, 255, 0)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(255, 176, 0)");
        $("body").get(0).style.setProperty("--colorFlash", "rgb(255, 204, 0)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(200, 200, 0)");
        $(".btnDiv").addClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-terminal.png");
    } else if (theme === 'neon') {
        $("body").get(0).style.setProperty("--color1", "rgb(7, 22, 55)");
        $("body").get(0).style.setProperty("--color2", "rgb(20, 30, 60)");
        $("body").get(0).style.setProperty("--color3", "rgb(24, 35, 54)");
        $("body").get(0).style.setProperty("--color4", "rgb(31, 41, 63)");
        $("body").get(0).style.setProperty("--color5", "rgb(24, 35, 54)");
        $("body").get(0).style.setProperty("--color6", "rgb(7, 22, 55)");
        $("body").get(0).style.setProperty("--color7", "rgb(24, 35, 54)");
        $("body").get(0).style.setProperty("--color8", "rgb(38, 52, 73)");
        $("body").get(0).style.setProperty("--color9", "rgb(24, 35, 54)");
        $("body").get(0).style.setProperty("--colorText", "rgb(240, 5, 205)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(179, 14, 163)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(251, 228, 136)");
        $("body").get(0).style.setProperty("--colorFlash", "rgb(255, 204, 0)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(200, 200, 0)");
        $(".btnDiv").addClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-neon.png");
    } else if (theme === 'pumpkin') {
        $("body").get(0).style.setProperty("--color1", "rgb(10, 10, 10)");
        $("body").get(0).style.setProperty("--color2", "rgb(20, 20, 20)");
        $("body").get(0).style.setProperty("--color3", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color4", "rgb(56, 60, 69)");
        $("body").get(0).style.setProperty("--color5", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color6", "rgb(10, 10, 10)");
        $("body").get(0).style.setProperty("--color7", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color8", "rgb(65, 65, 65)");
        $("body").get(0).style.setProperty("--color9", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorText", "rgb(228, 95, 6)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(235, 103, 16)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(255, 176, 0)");
        $("body").get(0).style.setProperty("--colorFlash", "rgb(255, 204, 0)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(200, 200, 0)");
        $(".btnDiv").addClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-pumpkin.png");
    } else if (theme === 'mono') {
        $("body").get(0).style.setProperty("--color1", "rgb(10, 10, 10)");
        $("body").get(0).style.setProperty("--color2", "rgb(20, 20, 20)");
        $("body").get(0).style.setProperty("--color3", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color4", "rgb(56, 60, 69)");
        $("body").get(0).style.setProperty("--color5", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color6", "rgb(10, 10, 10)");
        $("body").get(0).style.setProperty("--color7", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--color8", "rgb(65, 65, 65)");
        $("body").get(0).style.setProperty("--color9", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorText", "rgb(255, 255, 255)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(220, 220, 220)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(185, 185, 185)");
        $("body").get(0).style.setProperty("--colorFlash", "rgb(155, 155, 155)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(40, 40, 40)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(200, 200, 0)");
        $(".btnDiv").addClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-mono.png");
    } else if (theme === 'winter') {
        $("body").get(0).style.setProperty("--color1", "rgb(203, 232, 255)");
        $("body").get(0).style.setProperty("--color2", "rgb(155, 200, 240)");
        $("body").get(0).style.setProperty("--color3", "rgb(165, 204, 231)");
        $("body").get(0).style.setProperty("--color4", "rgb(188, 205, 213)");
        $("body").get(0).style.setProperty("--color5", "rgb(165, 204, 231)");
        $("body").get(0).style.setProperty("--color6", "rgb(203, 232, 255)");
        $("body").get(0).style.setProperty("--color7", "rgb(165, 204, 231)");
        $("body").get(0).style.setProperty("--color8", "rgb(171, 216, 255)");
        $("body").get(0).style.setProperty("--color9", "rgb(165, 204, 231)");
        $("body").get(0).style.setProperty("--colorText", "rgb(53, 79, 92)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(69, 95, 111)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(60, 175, 255)");
        $("body").get(0).style.setProperty("--colorFlash", "rgb(255, 204, 0)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(53, 79, 92)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(53, 79, 92)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(200, 200, 0)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(53, 79, 92)");
        $(".btnDiv").removeClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-winter.png");
    } else if (theme === 'autumn') {
        $("body").get(0).style.setProperty("--color1", "rgb(96, 108, 56)");
        $("body").get(0).style.setProperty("--color2", "rgb(40, 54, 24)");
        $("body").get(0).style.setProperty("--color3", "rgb(115, 70, 25)");
        $("body").get(0).style.setProperty("--color4", "rgb(90, 45, 10)");
        $("body").get(0).style.setProperty("--color5", "rgb(115, 70, 25)");
        $("body").get(0).style.setProperty("--color6", "rgb(96, 108, 56)");
        $("body").get(0).style.setProperty("--color7", "rgb(115, 70, 25)");
        $("body").get(0).style.setProperty("--color8", "rgb(95, 40, 5)");
        $("body").get(0).style.setProperty("--color9", "rgb(115, 70, 25)");
        $("body").get(0).style.setProperty("--colorText", "rgb(221, 161, 94)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(232, 171, 104)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(154, 15, 55)");
        $("body").get(0).style.setProperty("--colorFlash", "rgb(155, 155, 155)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, 0.6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, 0.4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, 0.75)");
        $("body").get(0).style.setProperty("--colorQuestBorderText", "rgb(232, 171, 104)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBackground", "rgb(95, 55, 10)");
        $("body").get(0).style.setProperty("--colorQuestCompleteBorderText", "rgb(7, 173, 7)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBackground", "rgb(95, 55, 10)");
        $("body").get(0).style.setProperty("--colorQuestIncompleteBorderText", "rgb(200, 200, 0)");
        $(".btnDiv").addClass('dark');
        colorBox = "rgba(50, 50, 50, 0.6)";
        colorBoxLight = "rgba(50, 50, 50, 0.4)";
        $('#favicon-link').attr("href", "./resources/favicons/favicon-autumn.png");
    }
}

// Toggles the chunk info panel
let toggleChunkInfo = function(value, extra) {
    chunkInfoOn = value;
    setCookies();
    chunkInfoOn ? $('.menu8').show() : $('.menu8').hide();
    $('.hiddenInfo').hide();
    extra !== 'startup' && $('menu8').css('opacity', 1);
    updateChunkInfo();
}

// Temporarily hides chunk info panel
let hideChunkInfo = function(extra) {
    chunkInfoOn && $('.menu8').hide();
    chunkInfoOn && $('.hiddenInfo').show();
    infoLockedId = -1;
    infoCollapse = true;
    extra !== 'startup' && setCookies();
}

// Re-shows chunk info panel
let showChunkInfo = function(extra) {
    chunkInfoOn && $('.menu8').show();
    chunkInfoOn && $('.hiddenInfo').hide();
    infoLockedId = -1;
    infoCollapse = false;
    updateChunkInfo();
    extra !== 'startup' && setCookies();
}

// Toggles the chunk tasks panel
let toggleChunkTasks = function(value, extra) {
    chunkTasksOn = value;
    chunkTasksOn ? $('.menu9').show() : $('.menu9').hide();
    extra !== 'startup' && $('menu9').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the top buttons
let toggleTopButtons = function(value, extra) {
    topButtonsOn = value;
    topButtonsOn ? $('.menu6').show() : $('.menu6').hide();
    extra !== 'startup' && $('menu6').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the task sidebar
let toggleTaskSidebar = function(value, extra) {
    $('.menu9 .background-sidebar').remove();
    value ? $('.menu9').addClass('sidebar') : $('.menu9').removeClass('sidebar');
    value ? $('.menu9').append(`<span class='noscroll background-sidebar'></span>`) : $('.menu9 .background-sidebar').remove();
    toggleRecent(recentOn, extra);
    extra !== 'startup' && !locked && setData();
}

// Toggles checked-off task hiding
let toggleHiddenTasks = function(value) {
    $('.no-current').remove();
    value ? $('.hide-backlog').hide() : $('.hide-backlog').show();
    Object.keys(activeSubTabs).forEach((section) => {
        if (value) {
            $(`.${section}-challenge:not(.hide-backlog)`).length <= 0 ? $('.marker-' + section).hide() : $('.marker-' + section).show();
        } else {
            $(`.${section}-challenge`).length <= 0 ? $('.marker-' + section).hide() : $('.marker-' + section).show();
        }
    });
    if ((value && $(`.panel-active .challenge:not(.hide-backlog)`).length <= 0) || $(`.panel-active .challenge`).length <= 0) {
        if (!checkFalseRules()) {
            $('.panel-active').append(`<span class="no-current">No current chunk tasks.</span>`);
        }
    }
}

// Toggles the visibility of the roll2 button
let toggleRoll2 = function(value, extra) {
    roll2On = value;
    roll2On && !locked ? $('.roll2').show() : $('.roll2').hide();
    extra !== 'startup' && $('.roll2').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the unpick button
let toggleUnpick = function(value, extra) {
    unpickOn = value;
    unpickOn && !isPicking && !locked ? $('.unpick').show() : $('.unpick').hide();
    extra !== 'startup' && $('.unpick').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the recent chunks section
let toggleRecent = function(value, extra) {
    recentOn = value;
    (recentOn && !settings['taskSidebar']) ? $('.menu7').show() : $('.menu7').hide();
    extra !== 'startup' && $('.menu7').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Enabled highscore tracking
let enableHighscore = function(extra) {
    return; //TEMP (highscore not enabled)
    if (!highscoreEnabled) {
        highscoreEnabled = true;
        extra !== 'startup' && !locked && setData();
    }
}

// Toggles the accordion panels of the chunk info panel
let toggleInfoPanel = function(pnl) {
    infoPanelVis[pnl] = !infoPanelVis[pnl];
    Object.keys(infoPanelVis).forEach((uniqKey) => {
        if (uniqKey === pnl) {
            infoPanelVis[pnl] ? $('.panel-' + pnl).addClass('visible') : $('.panel-' + pnl).removeClass('visible');
            infoPanelVis[pnl] ? $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-minus"></i>') : $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
            if (pnl === 'challenges' && infoPanelVis[pnl] && expandChallengeStr === '') {
                $('.panel-challenges').html(`<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>`);
                $('#infochallenges .expand').hide();
                expandChallengeStr = '';
                calcFutureChallenges();
            }
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
            infoPanelVis[uniqKey] = false;
        }
    });
}

// Toggles the accordion panels of the challenges panel
let toggleChallengesPanel = function(pnl) {
    challengePanelVis[pnl] = !challengePanelVis[pnl];
    Object.keys(challengePanelVis).forEach((uniqKey) => {
        if (uniqKey === pnl) {
            challengePanelVis[pnl] ? $('.panel-' + pnl).addClass('visible') : $('.panel-' + pnl).removeClass('visible');
            challengePanelVis[pnl] ? $('#challenges' + uniqKey + ' > .exp').html('<i class="pic fas fa-minus"></i>') : $('#challenges' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#challenges' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
            challengePanelVis[uniqKey] = false;
        }
    });
}

// Toggles the accordion panels of the rules panel
let toggleRulesPanel = function(pnl) {
    rulesPanelVis[pnl] = !rulesPanelVis[pnl];
    Object.keys(rulesPanelVis).forEach((uniqKey) => {
        if (uniqKey === pnl) {
            rulesPanelVis[pnl] ? $('.panel-' + pnl).addClass('visible') : $('.panel-' + pnl).removeClass('visible');
            rulesPanelVis[pnl] ? $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-minus"></i>') : $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
            rulesPanelVis[uniqKey] = false;
        }
    });
}

// Toggles the hide/show checked tasks setting
let toggleHideCompletedTasks = function(e) {
    e.preventDefault();
    e.cancelBubble = true;
    actuallyHideChecked = !actuallyHideChecked;
    toggleHiddenTasks(settings['hideChecked'] && actuallyHideChecked);
    $(`.tasks-checkmark i`).removeClass(actuallyHideChecked ? 'fa-eye-slash' : 'fa-eye').addClass(actuallyHideChecked ? 'fa-eye' : 'fa-eye-slash');
}

// ----------------------------------------------------------

// Other Functions

// ----------------------------------------------------------

// Check if on mobile
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// Once page has loaded, page is centered and initial chunks are selected/unlocked (from url)
let doneLoading = function() {
    if (onMobile) {
        $('.modal, .entry-content, .menu9, .menu9 .accordion, .menu9 .panel, .modal-content, .open-rules-container, .help-content, .lock-pin').addClass('mobile');
        $('.center').css({ 'height': '40px', 'width': '90px', 'font-size': '12px' });
        $('.pick, .roll2, .unpick').css({ 'height': '20px', 'width': '90px', 'font-size': '12px' });
        $('.gohighscore, .gobugreport, .godiscord, .gopatreon, .godocumentation, .gosearch, .gonotes, .hiddenInfo, .help-button, .gohome, .about-button, .open-manual-outer-container:not(.mobile-item), .open-complete-container').hide().remove();
        $('.menu2, .menu6, .menu7, .menu8, .menu9, .menu10, .menu11, .menu13, .settings, .help2').hide();
        $('.hr').css({ 'width': '10vw' });
        $('.block, .block > .title, .block button').css({ 'font-size': '4.5vw' });
        $('.menu3').css({ 'width': '110px', 'height': '15px', 'bottom': '30px' });
        $('#chunkInfo1, #chunkInfo2').css({ 'font-size': '12px' });
        $('.or').css({ 'font-size': '4vw' });
        $('.block > .description').css({ 'font-size': '4vw' });
        $('.block .pin.entry').css({ 'font-size': '5vw', 'width': '60%' });
        $('.lock-pin').css({ 'font-size': '3vw', 'width': '100%' });
        $('#lock-unlock').css({ 'padding': '0' });
        $('.gomobiletasks').show();
        $('#unlock-entry').height('4vh');
        centerCanvas('quick');
    } else {
        $('.gomobiletasks, .menu12, .menu13').hide();
    }
    $('#unlock-entry').prop('disabled', true);
    $('.loading').fadeOut(1000);
    setTimeout(() => {
        if ($('.pin.entry').is(':autofill')) {
            if (!$('.pin.entry').val().match(/^[a-z0-9\!\"\;\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]*$/i) || $('.pin.entry').val().length > 16) {
                $(this).val(prevValueLockPin);
            } else {
                prevValueLockPin = $('.pin.entry').val();
                if ($('.pin.entry').val().length >= 4 && $('.pin.entry').val().length <= 16) {
                    $('#unlock-entry').prop('disabled', false);
                    $('.pin.entry').removeClass('wrong');
                } else {
                    $('#unlock-entry').prop('disabled', true);
                }
            }
        }
    }, 500);
}

// Creates board of boxes, sets initial sizes of scalable elements, and hides certain elements if needed
let setupMap = function() {
    if (!atHome) {
        $('.body').show();
        $('#page1, #page1extra, #page1search, #import-menu, #highscore-menu, #highscore-menu2, #help-menu, .entry-home-menu-container, .entry-home-menu-extra').hide();
        if (locked) {
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).hide();
            $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.open-manual-outer-container').css('opacity', 0).hide();
            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
            $('.pin.entry').focus();
        } else {
            $('.center').css('margin-top', '15px');
        }
        if (locked === undefined || locked) {
            locked = true;
            $('.lock-closed, .lock-opened').hide();
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            $('.roll2, .unpick').css('opacity', 0).hide();
            $('.open-manual-outer-container').css('opacity', 0).hide();
            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        }
        !mid && (mid = window.location.href.split('?')[1]);
        document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker RS3';
        $('.toptitle2').text(mid.split('-')[0].toUpperCase());
        if (mid === 'jvb') { // Chunky Boys
            $('.toptitle2').text('(not a sponsor)');
        }
        toggleChallengesPanel('active');
        loadData(true);
    }
}

// Toggles the tasks window on mobile
let openMobileTasks = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        if (testMode) {
            $('.test-hint').toggle();
        }
        $('.menu9').toggle();
        $('.gomobiletasks').toggleClass('fa-tasks').toggleClass('fa-map');
        $('.gomobiletasks').attr('title', $('.gomobiletasks').hasClass('fa-tasks') ? 'Tasks' : 'Map');
        mobileTasksOpen = !$('.gomobiletasks').hasClass('fa-tasks');
    }
}

// Update chunk info
let updateChunkInfo = function() {
    if (infoCollapse && chunkInfoOn) {
        $('.menu8').hide();
        $('.hiddenInfo').show();
    }
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        let id = -1;
        if (infoLockedId !== -1) {
            id = decodeQueryParam(infoLockedId);
        }
        let visible = '';
        Object.keys(infoPanelVis).forEach((id) => {
            if (infoPanelVis[id]) {
                visible = id;
            }
        });
        if (chunkInfoOn) {
            $('.menu8').show();
            $('.hiddenInfo').hide();
        }
        if ($('.infoid').is(':hidden') && id > 0) {
            $('.infostartup').hide();
            $('.infoid').show();
            $('#infoname').show();
            $('#infomonsters').show();
            $('#infonpcs').show();
            $('#infospawns').show();
            $('#infoshops').show();
            $('#infofeatures').show();
            $('#infoquests').show();
            $('#infoclues').show();
            $('#infoconnections').show();
            $('#infochallenges').show();
            if (visible !== '') {
                $('.panel-' + visible).show();
            }
        } else if (id === -1) {
            $('.infostartup').show();
            $('.infoid').hide();
            $('#infoname').hide();
            $('#infomonsters').hide();
            $('#infonpcs').hide();
            $('#infospawns').hide();
            $('#infoshops').hide();
            $('#infofeatures').hide();
            $('#infoquests').hide();
            $('#infoclues').hide();
            $('#infoconnections').hide();
            $('#infochallenges').hide();
            if (visible !== '') {
                $('.panel-' + visible).hide();
            }
            if (infoCollapse && chunkInfoOn) {
                $('.menu8').hide();
                $('.hiddenInfo').show();
            }
            return;
        }
        let monsterStr = '';
        let npcStr = '';
        let objectStr = '';
        let spawnStr = '';
        let shopStr = '';
        let questStr = '';
        let connectStr = '';
        let clueStr = '';
        if (!!chunkInfo['chunks'][id]) {
            let monstersTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Monster'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Monster']).sort().forEach((name) => {
                    if (!monstersTemp[name]) {
                        monstersTemp[name] = 0;
                    }
                    monstersTemp[name] += chunkInfo['chunks'][id]['Sections'][section]['Monster'][name];
                });
            });
            !!chunkInfo['chunks'][id]['Monster'] && Object.keys(chunkInfo['chunks'][id]['Monster']).sort().forEach((name) => {
                if (!monstersTemp[name]) {
                    monstersTemp[name] = 0;
                }
                monstersTemp[name] += chunkInfo['chunks'][id]['Monster'][name];
            });
            !!monstersTemp && Object.keys(monstersTemp).sort().forEach((name) => {
                monsterStr += (monstersTemp[name] === 1 ? '' : monstersTemp[name] + ' ') + `<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name)}" target="_blank">` + name + '</a>, ';
            });
            monsterStr.length > 0 && (monsterStr = monsterStr.substring(0, monsterStr.length - 2));

            let npcsTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['NPC'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['NPC']).sort().forEach((name) => {
                    if (!npcsTemp[name]) {
                        npcsTemp[name] = 0;
                    }
                    npcsTemp[name] += chunkInfo['chunks'][id]['Sections'][section]['NPC'][name];
                });
            });
            !!chunkInfo['chunks'][id]['NPC'] && Object.keys(chunkInfo['chunks'][id]['NPC']).sort().forEach((name) => {
                if (!npcsTemp[name]) {
                    npcsTemp[name] = 0;
                }
                npcsTemp[name] += chunkInfo['chunks'][id]['NPC'][name];
            });
            !!npcsTemp && Object.keys(npcsTemp).sort().forEach((name) => {
                npcStr += (npcsTemp[name] === 1 ? '' : npcsTemp[name] + ' ') + `<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name)}" target="_blank">` + name + '</a>, ';
            });
            npcStr.length > 0 && (npcStr = npcStr.substring(0, npcStr.length - 2));

            let spawnsTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Spawn'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Spawn']).sort().forEach((name) => {
                    if (!spawnsTemp[name]) {
                        spawnsTemp[name] = 0;
                    }
                    spawnsTemp[name] += chunkInfo['chunks'][id]['Sections'][section]['Spawn'][name];
                });
            });
            !!chunkInfo['chunks'][id]['Spawn'] && Object.keys(chunkInfo['chunks'][id]['Spawn']).sort().forEach((name) => {
                if (!spawnsTemp[name]) {
                    spawnsTemp[name] = 0;
                }
                spawnsTemp[name] += chunkInfo['chunks'][id]['Spawn'][name];
            });
            !!spawnsTemp && Object.keys(spawnsTemp).sort().forEach((name) => {
                spawnStr += (spawnsTemp[name] === 1 ? '' : spawnsTemp[name] + ' ') + `<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name)}" target="_blank">` + name + '</a>, ';
            });
            spawnStr.length > 0 && (spawnStr = spawnStr.substring(0, spawnStr.length - 2));

            let shopsTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Shop'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Shop']).sort().forEach((name) => {
                    shopsTemp[name] = true;
                });
            });
            !!chunkInfo['chunks'][id]['Shop'] && Object.keys(chunkInfo['chunks'][id]['Shop']).sort().forEach((name) => {
                shopsTemp[name] = true;
            });
            !!shopsTemp && Object.keys(shopsTemp).sort().forEach((name) => {
                shopStr += `<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name)}" target="_blank">` + name + '</a>, ';
            });
            shopStr.length > 0 && (shopStr = shopStr.substring(0, shopStr.length - 2));

            let objectsTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Object'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Object']).sort().forEach((name) => {
                    if (!objectsTemp[name]) {
                        objectsTemp[name] = 0;
                    }
                    objectsTemp[name] += chunkInfo['chunks'][id]['Sections'][section]['Object'][name];
                });
            });
            !!chunkInfo['chunks'][id]['Object'] && Object.keys(chunkInfo['chunks'][id]['Object']).sort().forEach((name) => {
                if (!objectsTemp[name]) {
                    objectsTemp[name] = 0;
                }
                objectsTemp[name] += chunkInfo['chunks'][id]['Object'][name];
            });
            !!objectsTemp && Object.keys(objectsTemp).sort().forEach((name) => {
                objectStr += (objectsTemp[name] === 1 ? '' : objectsTemp[name] + ' ') + `<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name)}" target="_blank">` + name + '</a>, ';
            });
            objectStr.length > 0 && (objectStr = objectStr.substring(0, objectStr.length - 2));

            let questsTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Quest'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Quest']).sort().forEach((name) => {
                    if (questsTemp[name] !== 'first') {
                        questsTemp[name] = chunkInfo['chunks'][id]['Sections'][section]['Quest'][name];
                    }
                });
            });
            !!chunkInfo['chunks'][id]['Quest'] && Object.keys(chunkInfo['chunks'][id]['Quest']).sort().forEach((name) => {
                if (questsTemp[name] !== 'first') {
                    questsTemp[name] = chunkInfo['chunks'][id]['Quest'][name];
                }
            });
            !!questsTemp && Object.keys(questsTemp).sort().forEach((name) => {
                questStr += `<a class='${(questsTemp[name] === 'first' ? 'bold link' : 'link')}' href="${"https://runescape.wiki/w/" + encodeForUrl(name)}" target="_blank">` + name + `</a> <span onclick="getQuestInfo('` + encodeRFC5987ValueChars(name) + `')"><i class="quest-icon fas fa-info-circle"></i></span>, `;
            });
            questStr.length > 0 && (questStr = questStr.substring(0, questStr.length - 2));

            let namesList = {};
            let connectsTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Connect'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Connect']).sort().forEach((name) => {
                    let realName = name;
                    let passedName = name;
                    if (!!chunkInfo['chunks'][name]['Name']) {
                        realName = chunkInfo['chunks'][name]['Name'];
                        passedName = chunkInfo['chunks'][name]['Name'];
                    } else if (!!chunkInfo['chunks'][name]['Nickname']) {
                        realName = chunkInfo['chunks'][name]['Nickname'] + '(' + name + ')';
                    }
                    if (namesList[realName] !== realName) {
                        namesList[realName] = realName;
                        connectsTemp[name] = {
                            realName,
                            passedName
                        };
                    }
                });
            });
            !!chunkInfo['chunks'][id]['Connect'] && Object.keys(chunkInfo['chunks'][id]['Connect']).sort().forEach((name) => {
                let realName = name;
                let passedName = name;
                if (!!chunkInfo['chunks'][name]['Name']) {
                    realName = chunkInfo['chunks'][name]['Name'];
                    passedName = chunkInfo['chunks'][name]['Name'];
                } else if (!!chunkInfo['chunks'][name]['Nickname']) {
                    realName = chunkInfo['chunks'][name]['Nickname'] + '(' + name + ')';
                }
                if (namesList[realName] !== realName) {
                    namesList[realName] = realName;
                    connectsTemp[name] = {
                        realName,
                        passedName
                    };
                }
            });
            !!connectsTemp && Object.keys(connectsTemp).sort().forEach((name) => {
                let { realName, passedName } = connectsTemp[name];
                connectStr += `<span class='link' onclick=redirectPanelCanvas('${encodeRFC5987ValueChars(passedName)}')>${decodeQueryParam(realName)}</span>` + ', ';
            });
            connectStr.length > 0 && (connectStr = connectStr.substring(0, connectStr.length - 2));
            connectStr = connectStr.split(', ').sort((a, b) => {
                return $(a).text() > $(b).text() ? 1 : -1;
            });
            connectStr = connectStr.join(', ');

            let cluesTemp = {};
            !!chunkInfo['chunks'][id]['Sections'] && Object.keys(chunkInfo['chunks'][id]['Sections']).forEach((section) => {
                !!chunkInfo['chunks'][id]['Sections'][section]['Clue'] && Object.keys(chunkInfo['chunks'][id]['Sections'][section]['Clue']).sort().forEach((name) => {
                    if (!cluesTemp[name]) {
                        cluesTemp[name] = 0;
                    }
                    cluesTemp[name] += chunkInfo['chunks'][id]['Sections'][section]['Clue'][name];
                });
            });
            !!chunkInfo['chunks'][id]['Clue'] && Object.keys(chunkInfo['chunks'][id]['Clue']).sort().forEach((name) => {
                if (!cluesTemp[name]) {
                    cluesTemp[name] = 0;
                }
                cluesTemp[name] += chunkInfo['chunks'][id]['Clue'][name];
            });
            !!cluesTemp && clueTiers.forEach((tier) => {
                if (cluesTemp.hasOwnProperty(tier.toLowerCase())) {
                    clueStr += cluesTemp[tier.toLowerCase()] + ' ' + tier + ', ';
                }
            });
            clueStr.length > 0 && (clueStr = clueStr.substring(0, clueStr.length - 2));
        }
        $('.infoid-content').html((!!chunkInfo['chunks'][id] && !!chunkInfo['chunks'][id]['Nickname']) ? (chunkInfo['chunks'][id]['Nickname'] + ' (' + id + ')') : decodeQueryParam(id));
        $('.panel-monsters').html(monsterStr || 'None');
        $('.panel-npcs').html(npcStr || 'None');
        $('.panel-spawns').html(spawnStr || 'None');
        $('.panel-shops').html(shopStr || 'None');
        $('.panel-features').html(objectStr || 'None');
        $('.panel-quests').html(questStr || 'None');
        $('.panel-clues').html(clueStr || 'None');
        $('.panel-connections').html(connectStr || 'None');
        $('.panel-challenges').html(`<div class="noscroll calculating"><div class='noscroll display-button' onclick='calcFutureChallenges()'>Calculate Tasks</div></div>`);
        $('#infochallenges .expand').hide();
        expandChallengeStr = '';
    }
}

// Checks if skill has primary training
let checkPrimaryMethod = function(skill, valids, baseChunkData, wantMethods) {
    let valid = false;
    let methods = {};
    let hardValid = false;
    if (skill === 'Quest' || skill === 'Diary' || skill === 'BiS' || skill === 'Extra') {
        hardValid = true;
    } else if (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0) {
        hardValid = true;
        methods['Manually added skill'] = 1;
    } else if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1) {
        methods['Passive Leveling'] = 1;
    } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill)) {
        methods['Quest Xp Rewards'] = 1;
    } else if (!!completedChallenges[skill] && Object.keys(completedChallenges[skill]).length > 0) {
        hardValid = true;
    }
    let tempValid = false;
    !!universalPrimary[skill] && universalPrimary[skill].forEach((line) => {
        let tempTempValid = true;
        if (line === 'Primary[+]') {
            let primaryValid = false;
            !!valids[skill] && Object.keys(valids[skill]).forEach((challenge) => {
                let bestBoost = 0;
                if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost')) {
                    let ownsCrystalSaw = false;
                    Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach((boost) => {
                        if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]))) {
                            if (boost !== 'Crystal saw') {
                                if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('%+')) {
                                    let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                    let possibleBoost = Math.floor(valids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    possibleBoost = Math.floor((valids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    if (possibleBoost > bestBoost) {
                                        bestBoost = possibleBoost;
                                    }
                                } else if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('xp*')) {
                                    let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('xp*');
                                    let tempXp = 0;
                                    let possibleBoost = 0;
                                    while (parseInt(Object.keys(xpTable).filter(lvl => xpTable[lvl] > tempXp)[0]) + possibleBoost < valids[skill][challenge]) {
                                        tempXp += parseInt(stringSplit[0]);
                                        possibleBoost = Math.floor(tempXp / parseInt(stringSplit[0])) * parseInt(stringSplit[1]);
                                    }
                                    if (possibleBoost > bestBoost) {
                                        bestBoost = possibleBoost;
                                    }
                                } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                    bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                }
                            } else if (skill === 'Construction') {
                                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw[+]')) {
                                    ownsCrystalSaw = true;
                                }
                            }
                        }
                    });
                    if (ownsCrystalSaw) {
                        bestBoost += 3;
                    }
                }
                if (((chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'] || rules['Secondary Primary'])) && (chunkInfo['challenges'][skill][challenge]['Level'] === 1 || (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && chunkInfo['challenges'][skill][challenge]['Level'] <= passiveSkill[skill] + bestBoost) || ((skillQuestXp.hasOwnProperty(skill) && chunkInfo['challenges'][skill][challenge]['Level'] <= skillQuestXp[skill]['level'] + bestBoost)) || wantMethods) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || chunkInfo['challenges'][skill][challenge]['Manual']) {
                    if (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil')) {
                        primaryValid = true;
                        methods[challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
                    }
                }
            });
            !primaryValid && (tempTempValid = false);
        } else if (line === 'Monster[+]') {
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!monsterExists) {
                tempTempValid = false;
            } else {
                methods['Attack monsters'] = 1;
            }
        } else if (line === 'Bones[+]') {
            let bonesExists = false;
            !!baseChunkData['items'] && boneItems.forEach((bone) => {
                if (!!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(bone)) {
                    bonesExists = true;
                }
            });
            if (!bonesExists) {
                tempTempValid = false;
            } else {
                methods['Bury bones'] = 1;
            }
        } else if (line === 'Combat[+]') {
            let combatExists = false;
            combatSkills.forEach((skill2) => {
                if (checkPrimaryMethod(skill2, valids, baseChunkData)) {
                    combatExists = true;
                }
            });
            if (!combatExists) {
                tempTempValid = false;
            } else {
                methods['Train combat'] = 1;
            }
        } else if (line === 'Ranged[+]') {
            let validRanged = false;
            !!baseChunkData['items'] && Object.keys(chunkInfo['codeItems']['ammoTools']).forEach((ammoItem) => {
                let tempItem = ammoItem + '*';
                let ammoValid = true;
                if (ammoItem === 'No ammo') {
                    //
                } else {
                    if (tempItem.replaceAll(/\*/g, '').includes('[+]')) {
                        if (!itemsPlus[tempItem.replaceAll(/\*/g, '')]) {
                            ammoValid = false;
                            return;
                        } else {
                            let tempSecondary = true;
                            itemsPlus[tempItem.replaceAll(/\*/g, '')].filter((plus) => { return !!baseChunkData['items'][plus] }).forEach((plus) => {
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
                    Object.keys(chunkInfo['codeItems']['ammoTools'][ammoItem]).forEach((item) => {
                        if (!!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(item.replaceAll(/\*/g, ''))) {
                            if (rangedItems.hasOwnProperty(item.replaceAll(/\*/g, '')) && (rangedItems[item.replaceAll(/\*/g, '')] === 1 || (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill['Ranged'] > 1 && rangedItems[item.replaceAll(/\*/g, '')] <= passiveSkill['Ranged']) || ((!!skillQuestXp && skillQuestXp.hasOwnProperty('Ranged') && rangedItems[item.replaceAll(/\*/g, '')] <= skillQuestXp['Ranged']['level'])) || (highestCurrent.hasOwnProperty('Ranged') && valids.hasOwnProperty('Ranged') && valids['Ranged'].hasOwnProperty(highestCurrent['Ranged']) && valids['Ranged'][highestCurrent['Ranged']] >= rangedItems[item.replaceAll(/\*/g, '')]))) {
                                if (item.includes('*')) {
                                    let tempSecondary = !(!!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).filter((source) => { return (!baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('secondary-') && (!processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || (baseChunkData['items'][item.replaceAll(/\*/g, '')][source]['primary-'] && (!processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0);
                                    if (!tempSecondary) {
                                        innerValid = true
                                        let tempIt = item;
                                        if (ammoItem !== 'No ammo' && !ammoItem.includes('[+]')) {
                                            tempIt += ' + ' + ammoItem;
                                        } else if (ammoItem.includes('[+]') && !!chunkInfo['codeItems']['itemsPlusNames'][ammoItem]) {
                                            tempIt += ' + ' + chunkInfo['codeItems']['itemsPlusNames'][ammoItem];
                                        }
                                        methods[tempIt] = rangedItems[item.replaceAll(/\*/g, '')];
                                    }
                                } else {
                                    innerValid = true;
                                    let tempIt = item;
                                    if (ammoItem !== 'No ammo' && !ammoItem.includes('[+]')) {
                                        tempIt += ' + ' + ammoItem;
                                    } else if (ammoItem.includes('[+]') && !!chunkInfo['codeItems']['itemsPlusNames'][ammoItem]) {
                                        tempIt += ' + ' + chunkInfo['codeItems']['itemsPlusNames'][ammoItem];
                                    }
                                    methods[tempIt] = rangedItems[item.replaceAll(/\*/g, '')];
                                }
                            }
                        }
                    });
                    innerValid && (validRanged = true);
                }
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
    valid = tempValid;
    if (hardValid) {
        valid = true;
    }
    if (!valid) {
        methods = {};
    }
    if (wantMethods) {
        return methods;
    } else {
        return valid;
    }
}

// Finds the current challenge in each skill 2
let calcCurrentChallenges2 = function(tempChallengeArr) {
    !tempChallengeArr && (tempChallengeArr = tempChallengeArrSaved);
    setupCurrentChallenges(tempChallengeArr);
    infoPanelVis['challenges'] && updateChunkInfo();
};

// Sets up data for displaying
setupCurrentChallenges = function(tempChallengeArr, noDisplay, noClear) {
    !rules['Show Skill Tasks'] && challengeArr.forEach((line) => {
        skillNames.forEach((skill) => {
            if (line.includes(skill + '-challenge')) {
                let index = challengeArr.indexOf(line);
                challengeArr.splice(index, 1);
            }
        });
    });
    if (tempChallengeArr !== false) {
        oldChallengeArr = tempChallengeArr;
        challengeArr = [];
        rules['Show Skill Tasks'] && challengeArr.push(`<div class="marker marker-skill noscroll" onclick="expandActive('skill')"><i class="expand-button fas ${activeSubTabs['skill'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Skill Tasks</span></div>`);
        rules['Show Skill Tasks'] && Object.keys(tempChallengeArr).sort().forEach((skill) => {
            let skillTask = tempChallengeArr[skill];
            let boost = 0;
            if (!!tempChallengeArr[skill] && tempChallengeArr[skill].match(/\{[0-9]+\}/g)) {
                skillTask = tempChallengeArr[skill].replaceAll(/\{[0-9]+\}/g, '');
                boost = tempChallengeArr[skill].match(/\{[0-9]+\}/g)[0].match(/\d+/)[0];
            }
            if (!!skillTask && (!backlog[skill] || (!backlog[skill].hasOwnProperty(skillTask) && !backlog[skill].hasOwnProperty(skillTask.replaceAll('#', '/')))) && (!completedChallenges[skill] || (!completedChallenges[skill][skillTask] && !completedChallenges[skill][skillTask.replaceAll('#', '/')]))) {
                if (!!skillTask && !!altChallenges[skill] && altChallenges[skill].hasOwnProperty(chunkInfo['challenges'][skill][skillTask]['Level']) && globalValids.hasOwnProperty(skill) && globalValids[skill].hasOwnProperty(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]) && (!backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]))) {
                    !!altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']] && challengeArr.push(`<div class="challenge skill-challenge noscroll clickable ${skill + '-challenge'} ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]]) && 'hide-backlog'} ${!activeSubTabs['skill'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']])}', '${skill}', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('${skill}', '${encodeRFC5987ValueChars(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']])}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${(boost > 0 ? (((chunkInfo['challenges'][skill][altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]]['Level'] - boost) <= 0 ? 1 : (chunkInfo['challenges'][skill][altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]]['Level'] - boost)) + '] (+' + boost + ')') : chunkInfo['challenges'][skill][altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']]]['Level'] + ']')} <span class="inner noscroll">${skill}</b>: ${decodeQueryParam(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']].split('~')[0])}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']].split('|')[1]))}" target="_blank">${decodeQueryParam(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']].split('~')[1].split('|').join(''))}</a>${decodeQueryParam(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']].split('~')[2])}</span></span></label> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(altChallenges[skill][chunkInfo['challenges'][skill][skillTask]['Level']])}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
                } else {
                    !!skillTask && challengeArr.push(`<div class="challenge skill-challenge noscroll clickable ${skill + '-challenge'} ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][skillTask]) && 'hide-backlog'} ${!activeSubTabs['skill'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(skillTask)}', '${skill}', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][skillTask]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('${skill}', '${encodeRFC5987ValueChars(skillTask)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${(boost > 0 ? (((chunkInfo['challenges'][skill][skillTask]['Level'] - boost) <= 0 ? 1 : (chunkInfo['challenges'][skill][skillTask]['Level'] - boost)) + '] (+' + boost + ')') : chunkInfo['challenges'][skill][skillTask]['Level'] + ']')} <span class="inner noscroll">${skill}</b>: ${skillTask.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((skillTask.split('|')[1]))}" target="_blank">${skillTask.split('~')[1].split('|').join('')}</a>${skillTask.split('~')[2]}</span></span></label> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(skillTask)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
                }
            }
        });
        rules['Show Skill Tasks'] && Object.keys(highestCurrent).forEach((skill) => {
            if (!!checkedChallenges[skill] && Object.keys(checkedChallenges[skill])[0] === highestCurrent[skill]) {
                $('.' + skill + '-challenge > input').prop('checked', true);
            }
        });
    }
    challengeArr = challengeArr.filter(line => !line.includes('Extra-') && !line.includes('BiS-') && !line.includes('Quest-') && !line.includes('marker-extra') && !line.includes('marker-bis') && !line.includes('marker-quest'));
    !!globalValids['BiS'] && Object.keys(globalValids['BiS']).length > 0 && rules['Show Best in Slot Tasks'] && challengeArr.push(`<div class="marker marker-bis noscroll" onclick="expandActive('bis')"><i class="expand-button fas ${activeSubTabs['bis'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">BiS Tasks</span></div>`);
    !!globalValids['BiS'] && rules['Show Best in Slot Tasks'] && Object.keys(globalValids['BiS']).forEach((challenge) => {
        !!globalValids['BiS'][challenge] && globalValids['BiS'][challenge].split(' BiS ')[0].split('/​').forEach((bit) => {
            if (altChallenges.hasOwnProperty('BiS') && altChallenges['BiS'].hasOwnProperty(bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]) && bestEquipmentAltsGlobal.hasOwnProperty(bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]) && bestEquipmentAltsGlobal[bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]].includes(altChallenges['BiS'][bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]].split('|')[1].charAt(0).toUpperCase() + altChallenges['BiS'][bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]].split('|')[1].slice(1))) {
                highestOverall[bit.replaceAll(' ', '_') + '-' + globalValids['BiS'][challenge].split(' BiS ')[1].split(' BiS ').join('-')] = altChallenges['BiS'][bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]].split('|')[1].charAt(0).toUpperCase() + altChallenges['BiS'][bit + ' BiS ' + globalValids['BiS'][challenge].split(' BiS ')[1]].split('|')[1].slice(1);
            }
        });
        if ((!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty(challenge) && !backlog['BiS'].hasOwnProperty(challenge.replaceAll('#', '/')))) && (!completedChallenges['BiS'] || (!completedChallenges['BiS'][challenge] && !completedChallenges['BiS'][challenge.replaceAll('#', '/')])) && Object.values(highestOverall).map(function(y) { return y.toLowerCase() }).includes(challenge.split('|')[1].toLowerCase())) {
            challengeArr.push(`<div class="challenge bis-challenge noscroll clickable ${'BiS-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['BiS'] && !!checkedChallenges['BiS'][challenge]) && 'hide-backlog'} ${!activeSubTabs['bis'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'BiS', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['BiS'] && !!checkedChallenges['BiS'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('BiS', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${chunkInfo['challenges']['BiS'][challenge]['Label']}]</b> <span class="inner noscroll">${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((challenge.split('|')[1]))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${challenge.split('~')[2]}</span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'BiS')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
        }
    });
    !!globalValids['Quest'] && Object.keys(globalValids['Quest']).length > 0 && rules['Show Quest Tasks'] && challengeArr.push(`<div class="marker marker-quest noscroll" onclick="expandActive('quest')"><i class="expand-button fas ${activeSubTabs['quest'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Quest Tasks</span></div>`);
    !!globalValids['Quest'] && rules['Show Quest Tasks'] && Object.keys(globalValids['Quest']).sort(function(a, b) { return a.replaceAll(/ /g, '_').replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll('A_', '').replaceAll('The_', '').localeCompare(b.replaceAll(/ /g, '_').replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll('A_', '').replaceAll('The_', '')) }).forEach((challenge) => {
        if ((!backlog['Quest'] || (!backlog['Quest'].hasOwnProperty(challenge) && !backlog['Quest'].hasOwnProperty(challenge.replaceAll('#', '/')))) && (!completedChallenges['Quest'] || (!completedChallenges['Quest'][challenge] && !completedChallenges['Quest'][challenge.replaceAll('#', '/')])) && globalValids['Quest'][challenge]) {
            if (chunkInfo['challenges']['Quest'][challenge].hasOwnProperty('QuestPoints')) {
                challengeArr.push(`<div class="challenge quest-challenge noscroll clickable ${'Quest-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && 'hide-backlog'} ${!activeSubTabs['quest'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Quest', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Quest', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[Quest] <span class="inner noscroll"><a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a></b>: ${challenge.split('~')[2].substring(1)}</span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Quest')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            } else if (!rules['Show Quest Tasks Complete']) {
                challengeArr.push(`<div class="challenge quest-challenge noscroll clickable ${'Quest-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && 'hide-backlog'} ${!activeSubTabs['quest'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Quest', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Quest', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[Quest] <span class="inner noscroll"><a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a></b>: Up to <a href='javascript:openQuestSteps("Quest", "${encodeForUrl(challenge)}")' class='internal-link noscroll'>step ${challenge.split('~')[2]}</a></span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Quest')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            }
        }
    });
    !!globalValids['Diary'] && Object.keys(globalValids['Diary']).length > 0 && rules['Show Diary Tasks'] && challengeArr.push(`<div class="marker marker-diary noscroll" onclick="expandActive('diary')"><i class="expand-button fas ${activeSubTabs['diary'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Diary Tasks</span></div>`);
    !!globalValids['Diary'] && rules['Show Diary Tasks'] && Object.keys(globalValids['Diary']).forEach((challenge) => {
        if ((!backlog['Diary'] || (!backlog['Diary'].hasOwnProperty(challenge) && !backlog['Diary'].hasOwnProperty(challenge.replaceAll('#', '/')))) && (!completedChallenges['Diary'] || (!completedChallenges['Diary'][challenge] && !completedChallenges['Diary'][challenge.replaceAll('#', '/')])) && globalValids['Diary'][challenge] && (!rules['Show Diary Tasks Complete'] || chunkInfo['challenges']['Diary'][challenge].hasOwnProperty('ManualShow'))) {
            challengeArr.push(`<div class="challenge diary-challenge noscroll clickable ${'Diary-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Diary'] && !!checkedChallenges['Diary'][challenge]) && 'hide-backlog'} ${!activeSubTabs['diary'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Diary', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Diary'] && !!checkedChallenges['Diary'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Diary', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[Diary] <span class="inner noscroll"><a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a></b>: <a href='javascript:openQuestSteps("Diary", "${encodeForUrl(challenge)}")' class='internal-link noscroll'>${challenge.split('~')[2]}</a></span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Diary')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
        }
    });
    let doneSubMarker = {};
    !!globalValids['Extra'] && Object.keys(globalValids['Extra']).length > 0 && challengeArr.push(`<div class="marker marker-extra noscroll" onclick="expandActive('extra')"><i class="expand-button fas ${activeSubTabs['extra'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Other Tasks</span></div>`);
    !!globalValids['Extra'] && Object.keys(globalValids['Extra']).sort(function(a, b) { return ((/\d/).test(a) && (/\d/).test(b) && (chunkInfo['challenges']['Extra'][a]['Label'] + a).split('(')[0].localeCompare((chunkInfo['challenges']['Extra'][b]['Label'] + b).split('(')[0]) === 0) ? (chunkInfo['challenges']['Extra'][a]['Label'] + a).match(/\d+/)[0] - (chunkInfo['challenges']['Extra'][b]['Label'] + b).match(/\d+/)[0] : (chunkInfo['challenges']['Extra'][a]['Label'] + a).split('(')[0].localeCompare((chunkInfo['challenges']['Extra'][b]['Label'] + b).split('(')[0]) }).forEach((challenge) => {
        if ((!backlog['Extra'] || (!backlog['Extra'].hasOwnProperty(challenge) && !backlog['Extra'].hasOwnProperty(challenge.replaceAll('#', '/')))) && (!completedChallenges['Extra'] || (!completedChallenges['Extra'][challenge] && !completedChallenges['Extra'][challenge.replaceAll('#', '/')]))) {
            if (!!chunkInfo['challenges']['Extra'][challenge] && chunkInfo['challenges']['Extra'][challenge]['Label'] === 'Kill X') {
                challengeArr.push(`<div class="challenge extra-challenge noscroll clickable ${'Extra-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Extra', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Extra', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${chunkInfo['challenges']['Extra'][challenge]['Label']}]</b> <span class="inner noscroll">${challenge.split('~')[0].replaceAll(' X ', ' ' + rules['Kill X Amount'] + ' ')}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${challenge.split('~')[2]}</span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Extra')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            } else if (!!chunkInfo['challenges']['Extra'][challenge] && chunkInfo['challenges']['Extra'][challenge]['Label'] === 'All Droptables') {
                if (!doneSubMarker[`AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`]) {
                    if (!activeSubTabs.hasOwnProperty(`AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`)) {
                        activeSubTabs[`AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`] = true;
                    }
                    challengeArr.push(`<div class="marker submarker submarker-extra marker-AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')} ${!activeSubTabs['extra'] ? 'stay-hidden-sub' : ''} noscroll" onclick="expandActive('AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '')}', true)"><i class="expand-button fas ${activeSubTabs['AllDroptables-' + chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '')] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0]} Droptable</span></div>`);
                    doneSubMarker[`AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`] = true;
                }
                challengeArr.push(`<div class="challenge extra-challenge noscroll clickable doubletab AllDroptables-${chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase()}-challenge ${'Extra-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${activeSubTabs.hasOwnProperty('AllDroptables-' + chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')) && !activeSubTabs['AllDroptables-' + chunkInfo['challenges']['Extra'][challenge]['Monsters'][0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')] ? 'stay-hidden-sub' : ''} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Extra', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Extra', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${(!!chunkInfo['challenges']['Extra'][challenge] ? ('<b class="noscroll">[' + chunkInfo['challenges']['Extra'][challenge]['Label'] + ']</b> ') : '')} <span class="inner noscroll">${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${challenge.split('~')[2]}</span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Extra')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            } else if (!!chunkInfo['challenges']['Extra'][challenge] && chunkInfo['challenges']['Extra'][challenge]['Label'] === 'All Shops') {
                if (!doneSubMarker[`AllShops-${challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`]) {
                    if (!activeSubTabs.hasOwnProperty(`AllShops-${challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`)) {
                        activeSubTabs[`AllShops-${challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`] = true;
                    }
                    challengeArr.push(`<div class="marker submarker submarker-extra marker-AllShops-${challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')} ${!activeSubTabs['extra'] ? 'stay-hidden-sub' : ''} noscroll" onclick="expandActive('AllShops-${challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}', true)"><i class="expand-button fas ${activeSubTabs['AllShops-' + challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">${challenge.split(':')[0]} Stock</span></div>`);
                    doneSubMarker[`AllShops-${challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')}`] = true;
                }
                challengeArr.push(`<div class="challenge extra-challenge noscroll clickable doubletab AllShops-${challenge.split(':')[0].replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${'Extra-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${activeSubTabs.hasOwnProperty('AllShops-' + challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll(/,/g, '')) && !activeSubTabs['AllShops-' + challenge.split(':')[0].replaceAll(/'/g, '').replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll("'", '').replaceAll('!', '').replaceAll(/,/g, '')] ? 'stay-hidden-sub' : ''} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Extra', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Extra', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${(!!chunkInfo['challenges']['Extra'][challenge] ? ('<b class="noscroll">[' + chunkInfo['challenges']['Extra'][challenge]['Label'] + ']</b> ') : '')} <span class="inner noscroll">${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${challenge.split('~')[2]}</span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Extra')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            } else {
                challengeArr.push(`<div class="challenge extra-challenge noscroll clickable ${'Extra-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}" onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', 'Extra', 'current')"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('Extra', '${encodeRFC5987ValueChars(challenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${(!!chunkInfo['challenges']['Extra'][challenge] ? ('<b class="noscroll">[' + chunkInfo['challenges']['Extra'][challenge]['Label'] + ']</b> ') : '')} <span class="inner noscroll">${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(challenge.split('~')[1].split('|').join(''))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${challenge.split('~')[2]}</span></span></label></span> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(challenge)}', 'Extra')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            }
        }
    });
    if (challengeArr.length < 1) {
        challengeArr = [];
    }
    let backlogArr = setupBacklogArr();
    let completedArr = [];
    Object.keys(completedChallenges).forEach((skill) => {
        if (skill === 'Extra') {
            Object.keys(completedChallenges[skill]).forEach((name) => {
                completedArr.push(`<div class="challenge noscroll ${'Extra-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}">${name.split('~')[0]}<a class='noscroll link' href="${"https://runescape.wiki/w/" + encodeForUrl((name.split('|')[1]))}" target="_blank">${name.split('~')[1].split('|').join('')}</a>${name.split('~')[2]} <span class="arrow noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="uncompleteChallenge('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-undo-alt noscroll"></i></span></div>`);
            });
        } else if (skill === 'Quest') {
            Object.keys(completedChallenges[skill]).forEach((name) => {
                completedArr.push(`<div class="challenge noscroll ${'Quest-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}">${name.split('~')[0]}<b class='noscroll'>[Quest] <a class="noscroll link" href="${"https://runescape.wiki/w/" + encodeForUrl((name.split('|')[1]))}" target="_blank">${name.split('~')[1].split('|').join('')}</a></b>: ${(!name.includes('Complete the quest') ? 'Up to step ' : ' ') + name.split('~')[2]} <span class="arrow noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="uncompleteChallenge('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-undo-alt noscroll"></i></span></div>`);
            });
        } else if (skill === 'Diary') {
            Object.keys(completedChallenges[skill]).forEach((name) => {
                completedArr.push(`<div class="challenge noscroll ${'Diary-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}">${name.split('~')[0]}<b class='noscroll'>[Diary]</b> <b class="noscroll"><a class="noscroll link" href="${"https://runescape.wiki/w/" + encodeForUrl((name.split('|')[1]))}" target="_blank">${name.split('~')[1].split('|').join('')}</a></b>: ${name.split('~')[2]} <span class="arrow noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="uncompleteChallenge('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-undo-alt noscroll"></i></span></div>`);
            });
        } else if (skill === 'BiS') {
            Object.keys(completedChallenges[skill]).forEach((name) => {
                completedArr.push(`<div class="challenge noscroll ${'BiS-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}"><b class='noscroll'>[BiS]</b> ${name.split('~')[0]}<a class='noscroll link' href="${"https://runescape.wiki/w/" + encodeForUrl((name.split('|')[1]))}" target="_blank">${name.split('~')[1].split('|').join('')}</a>${name.split('~')[2]} <span class="arrow noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="uncompleteChallenge('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-undo-alt noscroll"></i></span></div>`);
            });
        } else {
            !!chunkInfo['challenges'][skill] && Object.keys(completedChallenges[skill]).forEach((name) => {
                !!chunkInfo['challenges'][skill][name] && completedArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b class="noscroll">[${chunkInfo['challenges'][skill][name]['Level']}] ${skill}</b>: ${name.split('~')[0]}<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl((name.split('|')[1]))}" target="_blank">${name.split('~')[1].split('|').join('')}</a>${name.split('~')[2]} <span class="arrow noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="uncompleteChallenge('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-undo-alt noscroll"></i></span></div>`);
            });
        }
    });
    if (completedArr.length < 1) {
        completedArr.push('No tasks currently completed.');
    }
    if (noDisplay) {
        oldSavedChallengeArr = challengeArr;
    } else {
        setCurrentChallenges(backlogArr, completedArr, false, noClear);
        changeChallengeColor();
    }
    $(`.panel-active .link, .panel-active .internal-link, .panel-active input, .panel-active .checkbox__control, .checkbox__input`).click(function(e) {
        e.stopPropagation();
    });
}

// Toggles the subtabs for the active tasks tab
let expandActive = function(subTab, isSub) {
    activeSubTabs[subTab] = !activeSubTabs[subTab];
    if (activeSubTabs[subTab]) {
        $('.marker-' + subTab + ' .expand-button').addClass('fa-caret-down').removeClass('fa-caret-right');
        $('.challenge.' + subTab + '-challenge').removeClass(!isSub ? 'stay-hidden' : 'stay-hidden-sub');
        !isSub && $('.submarker-' + subTab).removeClass('stay-hidden-sub');
    } else {
        $('.marker-' + subTab + ' .expand-button').addClass('fa-caret-right').removeClass('fa-caret-down');
        $('.challenge.' + subTab + '-challenge').addClass(!isSub ? 'stay-hidden' : 'stay-hidden-sub');
        !isSub && $('.submarker-' + subTab).addClass('stay-hidden-sub');
    }
}

// Finds the future challenge in each skill given a possible new chunk
let calcFutureChallenges = function() {
    let chunks = {};
    let challengeStr = '';
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).forEach((chunkId) => {
        chunks[parseInt(chunkId)] = true;
    });
    if (chunks[infoLockedId]) {
        $('.panel-challenges').html(challengeStr || 'None (chunk is already unlocked)');
        $('#infochallenges .expand').hide();
        expandChallengeStr = '';
        return;
    }
    $('.panel-challenges').html(`<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>`);
    $('#infochallenges .expand').hide();
    expandChallengeStr = '';
    chunks[infoLockedId] = true;
    let i = 0;
    while (i < Object.keys(chunks).length) {
        !!chunkInfo['chunks'][Object.keys(chunks)[i]] && !!chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect']).forEach((id) => {
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name']]) {
                chunks[chunkInfo['chunks'][parseInt(id)]['Name']] = true;
            }
        });
        i++;
    }
    let manualSectionsModified = {};
    !!manualSections && Object.keys(manualSections).forEach((chunk) => {
        if (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(chunk)) {
            manualSectionsModified[chunk] = manualSections[chunk];
        }
    });
    tempUnlockedSections = JSON.parse(JSON.stringify(manualSectionsModified));
    tempUnlockedSections = combineJSONs(tempUnlockedSections, findConnectedSections((Object.keys(chunks).length > 0 ? chunks : {...tempChunks['unlocked'], ...manualAreas}) || {}, tempUnlockedSections));
    let tempSections = {};
    if (!tempUnlockedSections.hasOwnProperty(infoLockedId) && chunkInfo['sections'].hasOwnProperty(infoLockedId) && Object.keys(chunkInfo['sections'][infoLockedId]).filter((section) => section !== "0").length > 0) {
        Object.keys(chunkInfo['sections'][infoLockedId]).forEach((sec) => {
            if (!tempSections[infoLockedId]) {
                tempSections[infoLockedId] = {};
            }
            tempSections[infoLockedId][sec] = true;
        });
    }
    tempSections = combineJSONs(tempSections, manualSections);
    myWorker2.terminate();
    myWorker2 = new Worker("./worker.js?v=6.2.2.1");
    myWorker2.onmessage = workerOnMessage;
    myWorker2.postMessage(['future', chunks, rules, chunkInfo, skillNames, processingSkill, maybePrimary, combatSkills, monstersPlus, objectsPlus, chunksPlus, itemsPlus, mixPlus, npcsPlus, tasksPlus, tools, elementalRunes, manualTasks, completedChallenges, backlog, "1/" + rules['Rare Drop Amount'], universalPrimary, elementalStaves, rangedItems, boneItems, highestCurrent, dropTables, possibleAreas, randomLoot, magicTools, bossLogs, bossMonsters, minigameShops, manualEquipment, checkedChallenges, backloggedSources, altChallenges, manualMonsters, slayerLocked, passiveSkill, f2pSkills, assignedXpRewards, mid === diary2Tier, manualAreas, "1/" + rules['Secondary Primary Amount'], mid === manualAreasOnly, tempSections, settings['optOutSections']]);
    workerOut++;
}

// Finds the future challenge in each skill given a possible new chunk 2
let calcFutureChallenges2 = function(valids, baseChunkDataLocal) {
    let highestChallenge = {};
    let challengeStr = '';
    let clueData = {
        'easy': 0,
        'medium': 0,
        'hard': 0,
        'elite': 0,
        'master': 0
    };

    Object.keys(valids).forEach((skill) => {
        let highestCompletedLevel = 0;
        let highestCompletedLevelBoost = 0;
        !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach((name) => {
            if (!!chunkInfo['challenges'][skill][name] && chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
                if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoBoost')) {
                    let bestBoost = 0;
                    let ownsCrystalSaw = false;
                    Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach((boost) => {
                        if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]))) {
                            if (boost !== 'Crystal saw') {
                                if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('%+')) {
                                    let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                    let possibleBoost = Math.floor(globalValids[skill][name] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    possibleBoost = Math.floor((globalValids[skill][name] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    if (possibleBoost > bestBoost) {
                                        bestBoost = possibleBoost;
                                    }
                                } else if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('xp*')) {
                                    let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('xp*');
                                    let tempXp = 0;
                                    let possibleBoost = 0;
                                    while (parseInt(Object.keys(xpTable).filter(lvl => xpTable[lvl] > tempXp)[0]) + possibleBoost < globalValids[skill][name]) {
                                        tempXp += parseInt(stringSplit[0]);
                                        possibleBoost = Math.floor(tempXp / parseInt(stringSplit[0])) * parseInt(stringSplit[1]);
                                    }
                                    if (possibleBoost > bestBoost) {
                                        bestBoost = possibleBoost;
                                    }
                                } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                    bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                }
                            } else if (skill === 'Construction') {
                                if (chunkInfo['challenges'][skill][name].hasOwnProperty('Items') && chunkInfo['challenges'][skill][name]['Items'].includes('Saw[+]')) {
                                    ownsCrystalSaw = true;
                                }
                            }
                        }
                    });
                    highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'] - (bestBoost + (ownsCrystalSaw ? 3 : 0));
                    highestCompletedLevelBoost = bestBoost + (ownsCrystalSaw ? 3 : 0);
                } else {
                    highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'];
                }
            }
        });
        if (!!highestCurrent[skill]) {
            if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][highestCurrent[skill]].hasOwnProperty('NoBoost')) {
                let bestBoost = 0;
                let ownsCrystalSaw = false;
                Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach((boost) => {
                    if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]))) {
                        if (boost !== 'Crystal saw') {
                            if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('%+')) {
                                let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                let possibleBoost = Math.floor(globalValids[skill][highestCurrent[skill]] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                possibleBoost = Math.floor((globalValids[skill][highestCurrent[skill]] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                if (possibleBoost > bestBoost) {
                                    bestBoost = possibleBoost;
                                }
                            } else if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('xp*')) {
                                let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('xp*');
                                let tempXp = 0;
                                let possibleBoost = 0;
                                while (parseInt(Object.keys(xpTable).filter(lvl => xpTable[lvl] > tempXp)[0]) + possibleBoost < globalValids[skill][highestCurrent[skill]]) {
                                    tempXp += parseInt(stringSplit[0]);
                                    possibleBoost = Math.floor(tempXp / parseInt(stringSplit[0])) * parseInt(stringSplit[1]);
                                }
                                if (possibleBoost > bestBoost) {
                                    bestBoost = possibleBoost;
                                }
                            } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                            }
                        } else if (skill === 'Construction') {
                            if (chunkInfo['challenges'][skill][highestCurrent[skill]].hasOwnProperty('Items') && chunkInfo['challenges'][skill][highestCurrent[skill]]['Items'].includes('Saw[+]')) {
                                ownsCrystalSaw = true;
                            }
                        }
                    }
                });
                if (globalValids[skill][highestCurrent[skill]] - (bestBoost + (ownsCrystalSaw ? 3 : 0)) > highestCompletedLevel) {
                    highestCompletedLevel = chunkInfo['challenges'][skill][highestCurrent[skill]]['Level'] - (bestBoost + (ownsCrystalSaw ? 3 : 0));
                    highestCompletedLevelBoost = bestBoost + (ownsCrystalSaw ? 3 : 0);
                }
            } else {
                if (globalValids[skill][highestCurrent[skill]] > highestCompletedLevel) {
                    highestCompletedLevel = chunkInfo['challenges'][skill][highestCurrent[skill]]['Level'];
                }
            }
        }
        checkPrimaryMethod(skill, valids, baseChunkDataLocal) && Object.keys(valids[skill]).forEach((challenge) => {
            let bestBoost = 0;
            if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost')) {
                let ownsCrystalSaw = false;
                Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach((boost) => {
                    if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0]))) {
                        if (boost !== 'Crystal saw') {
                            if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('%+')) {
                                let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                let possibleBoost = Math.floor(globalValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                possibleBoost = Math.floor((globalValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                if (possibleBoost > bestBoost) {
                                    bestBoost = possibleBoost;
                                }
                            } else if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string' && chunkInfo['codeItems']['boostItems'][skill][boost].includes('xp*')) {
                                let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('xp*');
                                let tempXp = 0;
                                let possibleBoost = 0;
                                while (parseInt(Object.keys(xpTable).filter(lvl => xpTable[lvl] > tempXp)[0]) + possibleBoost < globalValids[skill][challenge]) {
                                    tempXp += parseInt(stringSplit[0]);
                                    possibleBoost = Math.floor(tempXp / parseInt(stringSplit[0])) * parseInt(stringSplit[1]);
                                }
                                if (possibleBoost > bestBoost) {
                                    bestBoost = possibleBoost;
                                }
                            } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                            }
                        } else if (skill === 'Construction') {
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw[+]')) {
                                ownsCrystalSaw = true;
                            }
                        }
                    }
                });
                bestBoost = bestBoost + (ownsCrystalSaw ? 3 : 0);
            }
            if (skill === 'Quest' || skill === 'Diary' || skill === 'BiS' || skill === 'Extra') {
                if ((!globalValids.hasOwnProperty(skill) || !globalValids[skill].hasOwnProperty(challenge)) && valids[skill][challenge] && !chunkInfo['challenges'][skill][challenge]['NeverShow'] && (!completedChallenges[skill] || !completedChallenges[skill][challenge])) {
                    if ((skill === 'Quest' && rules["Show Quest Tasks"] && (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') || !rules["Show Quest Tasks Complete"])) || (skill === 'Diary' && rules["Show Diary Tasks"] && (chunkInfo['challenges'][skill][challenge].hasOwnProperty('ManualShow') || !rules["Show Diary Tasks Complete"])) || (skill === 'BiS' && rules["Show Best in Slot Tasks"]) || (skill === 'Extra')) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((challenge.split('|')[1]))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${(chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') ? ' complete quest' : challenge.split('~')[2])} <span class='noscroll' onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', '${skill}', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span></span>, `;
                            }
                        } else {
                            challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((challenge.split('|')[1]))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${(chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') ? ' complete quest' : challenge.split('~')[2])} <span class='noscroll' onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', '${skill}', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span></span>, `;
                        }
                    }
                }
            } else {
                if (valids[skill][challenge] !== false && ((chunkInfo['challenges'][skill][challenge]['Level'] - bestBoost) > highestCompletedLevel || (highestCompletedLevel < 1)) && !chunkInfo['challenges'][skill][challenge]['NeverShow'] && (!completedChallenges[skill] || !completedChallenges[skill][challenge])) {
                    if (((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] > chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) || ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] === chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'] || (!!chunkInfo['challenges'][skill][challenge]['Priority'] && chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])))) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                highestChallenge[skill] = challenge;
                                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('ClueTier') && !globalValids[skill].hasOwnProperty(challenge) && valids[skill][challenge]) {
                                    clueData[chunkInfo['challenges'][skill][challenge]['ClueTier']]++;
                                }
                            }
                        } else {
                            highestChallenge[skill] = challenge;
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('ClueTier') && !globalValids[skill].hasOwnProperty(challenge) && valids[skill][challenge]) {
                                clueData[chunkInfo['challenges'][skill][challenge]['ClueTier']]++;
                            }
                        }
                    } else if ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] === chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && chunkInfo['challenges'][skill][challenge]['Primary'] && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'] || (!!chunkInfo['challenges'][skill][challenge]['Priority'] && chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                highestChallenge[skill] = challenge;
                            }
                        } else {
                            highestChallenge[skill] = challenge;
                        }
                    }
                }
            }
        });
        !highestChallenge[skill] || (chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary']) && (highestChallenge[skill] = undefined);
        if (!!highestChallenge[skill] && skill !== 'Quest' && skill !== 'Nonskill') {
            if (skill !== 'Quest' && skill !== 'Diary' && skill !== 'BiS' && skill !== 'Extra' && rules["Show Skill Tasks"]) {
                challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">${highestChallenge[skill].split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((highestChallenge[skill].split('|')[1]))}" target="_blank">${highestChallenge[skill].split('~')[1].split('|').join('')}</a>${highestChallenge[skill].split('~')[2]} <span class='noscroll' onclick="showDetails('${encodeRFC5987ValueChars(highestChallenge[skill])}', '${skill}', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span></span>, `;
            }
        }
    });
    challengeStr.length > 0 && (challengeStr = challengeStr.substring(0, challengeStr.length - 2));
    return challengeStr;
}

// Opens the expanded future challenges window
let expandFutureChallenges = function(event) {
    event.stopPropagation();
    openNewTasksModal(expandChallengeStr.replaceAll('</span>,', '</span><br />') || 'None', true);
}

// Prints all items from all tasks (debug)
let printTaskItems = function() {
    let taskItems = {};
    !!chunkInfo['challenges'] && skillNames.forEach((skill) => {
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] }).forEach((name) => {
            !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach((item) => {
                if (item.replaceAll(/\*/g, '').includes('[+]')) {
                    if (itemsPlus[item.replaceAll(/\*/g, '')]) {
                        itemsPlus[item.replaceAll(/\*/g, '')].forEach((plus) => {
                            taskItems[plus] = true;
                        });
                    }
                } else {
                    taskItems[item.replaceAll(/\*/g, '')] = true;
                }
            });
        });
    });
    console.info(taskItems);
}

// Prints all levels for tasks (debug)
let printTaskLevels = function() {
    let taskLevels = {};
    !!chunkInfo['challenges'] && skillNames.forEach((skill) => {
        taskLevels[skill] = {};
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] }).forEach((name) => {
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Level')) {
                if (!taskLevels[skill][chunkInfo['challenges'][skill][name]['Level']]) {
                    taskLevels[skill][chunkInfo['challenges'][skill][name]['Level']] = [];
                }
                taskLevels[skill][chunkInfo['challenges'][skill][name]['Level']].push(name);
            }
        });
        Object.keys(taskLevels[skill]).forEach((level) => {
            let fullPriority = true;
            taskLevels[skill][level].forEach((name) => {
                if (!chunkInfo['challenges'][skill][name].hasOwnProperty('Priority')) {
                    fullPriority = false;
                }
            });
            if (taskLevels[skill][level].length < 2 || fullPriority) {
                delete taskLevels[skill][level];
            }
        });
    });
    console.info(taskLevels);
}

// Prints all untaken mapId's (debug)
let printUntakenMids = function() {
    let char1, char2, char3, char4, charSet;
    let untakenMids = [];
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    databaseRef.child('mapids').once('value', function(snap) {
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                for (let k = 0; k < 26; k++) {
                    for (let m = -1; m < 0; m++) { // optional 4th character
                        char1 = letters[i];
                        char2 = letters[j];
                        char3 = letters[k];
                        char4 = m >= 0 ? letters[m] : '';
                        charSet = char1 + char2 + char3 + char4;
                        if (!snap.val()[charSet]) {
                            untakenMids.push(charSet);
                        }
                    }
                }
            }
        }
        console.info(JSON.stringify(untakenMids));
    });
}

// Prints all differences with the split chunkinfo (debug)
let printSplitChunksDiff = function() {
    // Clears empty subobjects from object
    let clearEmpties = function(obj) {
        typeof obj === 'object' && Object.keys(obj).forEach((subObj) => {
            if (typeof obj[subObj] === 'object' && Object.keys(obj).length === 0) {
                delete obj[subObj];
            } else if (typeof obj[subObj] === 'object') {
                obj[subObj] = clearEmpties(obj[subObj]);
                if (obj[subObj] === null) {
                    delete obj[subObj];
                }
            }
        });
        if (Object.keys(obj).length === 0) {
            return null;
        } else {
            return obj;
        }
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
        Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach((key) => {
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
            result = JSON.parse(JSON.stringify((clearEmpties(result))));
        }
        return result;
    }

    let diffArr = {};
    $.getJSON('./chunkpicker-chunkinfo-export-split.json', function(data) {
        let chunkInfoSplit = data;
        let chunks2 = {};
        Object.keys(chunkInfoSplit['chunks']).forEach((chunk) => {
            chunks2[chunk] = {};
            if (chunkInfoSplit['chunks'][chunk].hasOwnProperty('Sections')) {
                let tempSections = chunkInfoSplit['chunks'][chunk]['Sections'];
                delete chunkInfoSplit['chunks'][chunk]['Sections'];
                chunks2[chunk] = {...chunkInfoSplit['chunks'][chunk]};
                Object.keys(tempSections).forEach((section) => {
                    Object.keys(tempSections[section]).forEach((type) => {
                        if (!chunks2[chunk][type]) {
                            chunks2[chunk][type] = {};
                        }
                        Object.keys(tempSections[section][type]).forEach((it) => {
                            if (!chunks2[chunk][type][it]) {
                                if (type === 'Quest') {
                                    chunks2[chunk][type][it] = tempSections[section][type][it];
                                } else if (type === 'Diary') {
                                    // ---
                                } else if (type === 'Connect' || type === 'Shop') {
                                    chunks2[chunk][type][it] = true;
                                } else {
                                    chunks2[chunk][type][it] = 0;
                                }
                            }
                            if (type !== 'Quest' && type !== 'Diary' && type !== 'Connect' && type !== 'Shop') {
                                chunks2[chunk][type][it] += tempSections[section][type][it];
                            } else if (type === 'Diary') {
                                delete chunkInfo['chunks'][chunk][type];
                                delete chunks2[chunk][type];
                            }
                        });
                    });
                });
            } else {
                chunks2[chunk] = {...chunkInfoSplit['chunks'][chunk]};
            }
        });
        chunkInfoSplit['chunks'] = {...chunks2};
        diffArr = diff(chunkInfo, chunkInfoSplit);
        console.info(diffArr);
    });
}

// Prints differences in chunk sections (debug)
let printChunkSectionDifferences = function() {
    !!chunkInfo['sections'] && Object.keys(chunkInfo['sections']).forEach((chunkId) => {
        if (!chunkInfo['sections'].hasOwnProperty(chunkId)) {
            console.error(chunkId, 'has no section connection object');
        }
        !!chunkInfo['sections'][chunkId] && Object.keys(chunkInfo['sections'][chunkId]).forEach((sec) => {
            if (sec === '0') {
                if (Object.keys(chunkInfo['sections'][chunkId]).length > 1) {
                    console.error(chunkId, 'has section 0 and other sections');
                }
                if (!chunkInfo['chunks'].hasOwnProperty(chunkId)) {
                    console.error(chunkId, 'has no chunkInfo');
                } else if (chunkInfo['chunks'][chunkId].hasOwnProperty('Sections')) {
                    console.error(chunkId, 'has both section 0 and Sections object');
                }
            } else {
                let loadAnImage = new Image();
                loadAnImage.onerror = function() {console.error(chunkId + '-' + sec +'.png does not exist')};
                loadAnImage.src = `/resources/section_overlays/${chunkId + '-' + sec}.png`;
                if (!chunkInfo['chunks'].hasOwnProperty(chunkId)) {
                    console.error(chunkId, 'has no chunkInfo');
                } else if (!chunkInfo['chunks'][chunkId].hasOwnProperty('Sections')) {
                    console.error(chunkId, 'has no Sections object but it should');
                } else if (!chunkInfo['chunks'][chunkId]['Sections'].hasOwnProperty(sec.toString())) {
                    console.error(chunkId, 'has no section', sec, 'chunkInfo');
                }
            }
            chunkInfo['sections'][chunkId][sec].filter((connectedChunk) => !connectedChunk.includes('???')).forEach((connectedChunk) => {
                if (connectedChunk.includes('-')) {
                    if (!chunkInfo['chunks'].hasOwnProperty(connectedChunk.split('-')[0])) {
                        console.error(connectedChunk.split('-')[0], 'has no chunkInfo');
                    } else if (!chunkInfo['chunks'][connectedChunk.split('-')[0]].hasOwnProperty('Sections')) {
                        console.error(connectedChunk, 'is referred to as a split chunk by', chunkId, '-', sec, 'but has no Sections object');
                    } else if (!chunkInfo['chunks'][connectedChunk.split('-')[0]]['Sections'].hasOwnProperty(connectedChunk.split('-')[1].toString())) {
                        console.error(connectedChunk, 'is referred to by', chunkId, '-', sec, 'but has no section', connectedChunk.split('-')[1], 'chunkInfo');
                    }
                } else {
                    if (!chunkInfo['chunks'].hasOwnProperty(connectedChunk)) {
                        console.error(connectedChunk, 'has no chunkInfo');
                    } else if (chunkInfo['chunks'][connectedChunk].hasOwnProperty('Sections')) {
                        console.error(connectedChunk, 'is referred to as a whole chunk by', chunkId, '-', sec, 'but has a Sections object');
                    }
                }
            });
        });
    });

    !!chunkInfo['chunks'] && Object.keys(chunkInfo['chunks']).filter((chunkId) => !isNaN(parseInt(chunkId)) && chunkInfo['chunks'][chunkId].hasOwnProperty('Nickname')).forEach((chunkId) => {
        if (!chunkInfo['chunks'].hasOwnProperty(chunkId)) {
            console.error(chunkId, 'has no chunkInfo');
        } else if (!chunkInfo['chunks'][chunkId].hasOwnProperty('Sections')) {
            if (!chunkInfo['sections'].hasOwnProperty(chunkId)) {
                console.error(chunkId, 'has no section connection object');
            } else if (Object.keys(chunkInfo['sections'][chunkId]).length > 1) {
                console.error(chunkId, 'has multiple sections but no Sections object');
            }
        } else {
            !!chunkInfo['chunks'][chunkId]['Sections'] && Object.keys(chunkInfo['chunks'][chunkId]['Sections']).forEach((sec) => {
                if (sec === '0') {
                    console.error(chunkId, 'has Sections object and section 0 chunkInfo');
                } else {
                    let loadAnImage = new Image();
                    loadAnImage.onerror = function() {console.error(chunkId + '-' + sec +'.png does not exist')};
                    loadAnImage.src = `/resources/section_overlays/${chunkId + '-' + sec}.png`;
                    if (!chunkInfo['sections'].hasOwnProperty(chunkId)) {
                        console.error(chunkId, 'has no section connection object');
                    } else if (chunkInfo['sections'][chunkId].hasOwnProperty('0')) {
                        console.error(chunkId, 'has section', sec, 'chunkInfo but has a section 0 connection');
                    } else if (!chunkInfo['sections'][chunkId].hasOwnProperty(sec)) {
                        console.error(chunkId, 'has no section', sec, 'connection');
                    }
                }
            });
        }
    });

    !!chunkInfo['challenges'] && Object.keys(chunkInfo['challenges']).forEach((skill) => {
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).filter((name) => chunkInfo['challenges'][skill][name].hasOwnProperty('Chunks')).forEach((name) => {
            !!chunkInfo['challenges'][skill][name] && chunkInfo['challenges'][skill][name].hasOwnProperty('Chunks') && chunkInfo['challenges'][skill][name]['Chunks'].forEach((chunkId) => {
                if (!isNaN(chunkId.split('-')[0])) {
                    if (chunkId.includes('-') && !chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections')) {
                        console.error(chunkId, 'has no Section object but is referred to with a section', `(${skill}, ${name})`);
                    } else if (!chunkId.includes('-') && chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections')) {
                        console.error(chunkId, 'has a Section object but is referred to as a whole chunk', `(${skill}, ${name})`);
                    } else if (chunkId.includes('-') && chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections') && !chunkInfo['chunks'][chunkId.split('-')[0]]['Sections'].hasOwnProperty(chunkId.split('-')[1])) {
                        console.error(chunkId, 'has no Section', chunkId.split('-')[1], 'but is referred to with that section', `(${skill}, ${name})`);
                    }
                } else if (chunkId.includes('[+]')) {
                    chunksPlus.hasOwnProperty(chunkId) && chunksPlus[chunkId].forEach((plus) => {
                        if (!isNaN(plus.split('-')[0])) {
                            if (plus.includes('-') && !chunkInfo['chunks'][plus.split('-')[0]].hasOwnProperty('Sections')) {
                                console.error(plus, 'has no Section object but is referred to with a section', `[${chunkId}] (${skill}, ${name})`);
                            } else if (!plus.includes('-') && chunkInfo['chunks'][plus.split('-')[0]].hasOwnProperty('Sections')) {
                                console.error(plus, 'has a Section object but is referred to as a whole chunk', `[${chunkId}] (${skill}, ${name})`);
                            } else if (plus.includes('-') && chunkInfo['chunks'][plus.split('-')[0]].hasOwnProperty('Sections') && !chunkInfo['chunks'][plus.split('-')[0]]['Sections'].hasOwnProperty(plus.split('-')[1])) {
                                console.error(plus, 'has no Section', plus.split('-')[1], 'but is referred to with that section', `[${chunkId}] (${skill}, ${name})`);
                            }
                        }
                    });
                }
            });
        });
    });

    !!chunkInfo['taskUnlocks'] && Object.keys(chunkInfo['taskUnlocks']).filter((type) => type !== 'Items').forEach((type) => {
        !!chunkInfo['taskUnlocks'][type] && Object.keys(chunkInfo['taskUnlocks'][type]).forEach((el) => {
            !!chunkInfo['taskUnlocks'][type][el] && Object.keys(chunkInfo['taskUnlocks'][type][el]).forEach((chunkId) => {
                if (!isNaN(chunkId.split('-')[0])) {
                    if (chunkId.includes('-') && !chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections')) {
                        console.error(chunkId, 'has no Section object but is referred to with a section', `(${type}, ${el})`);
                    } else if (!chunkId.includes('-') && chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections')) {
                        console.error(chunkId, 'has a Section object but is referred to as a whole chunk', `(${type}, ${el})`);
                    } else if (chunkId.includes('-') && chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections') && !chunkInfo['chunks'][chunkId.split('-')[0]]['Sections'].hasOwnProperty(chunkId.split('-')[1])) {
                        console.error(chunkId, 'has no Section', chunkId.split('-')[1], 'but is referred to with that section', `(${type}, ${el})`);
                    }
                }
            });
        });
    });
}

// Prints missing equipment icons (debug)
let checkEquipmentIcons = function() {
    let totalMissingCount = 0;
    !!chunkInfo['equipment'] && Object.keys(chunkInfo['equipment']).forEach((equip) => {
        let loadAnImage = new Image();
        loadAnImage.onerror = function() {console.error(equip + `.png does not exist (${++totalMissingCount})`)};
        loadAnImage.src = `/resources/equipment_icons/${equip.replaceAll(/ /g, '_')}.png`;
    });
}

// Sets given panel to a loading screen
let setCalculating = function(panelClass, useOld) {
    if (useOld) {
        if (!!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).length >= 100) {
            $(panelClass).css({ 'min-height': $(panelClass).height() - 5 + 'px'}).html(`<div class="noscroll calculating outer-loading-bar"><span class='loading-bar-text'>Loading Tasks</span><span class='inner-loading-bar'></span></div>`);
            $(panelClass + ' > i').css('line-height', $(panelClass).height() + 'px');
        } else {
            $(panelClass).css({ 'min-height': $(panelClass).height() - 5 + 'px'}).html('<div class="noscroll calculating"><i class="noscroll fas fa-spinner fa-spin"></i></div>');
            $(panelClass + ' > i').css('line-height', $(panelClass).height() + 'px');
        }
    } else if ($(panelClass).height() > 0) {
        $(panelClass).css({ 'min-height': $(panelClass).height() - 5 + 'px', 'font-size': 'max(min(10.4vw, 18px), ' + $(panelClass).height() / 5 + 'px)' }).addClass('calculating').html('<i class="fas fa-spinner fa-spin"></i>');
        $(panelClass + ' > i').css('line-height', $(panelClass).height() + 'px');
    }
}

// Opens the manual areas modal
let openManualAreas = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        manualAreasModalOpen = true;
        $('#searchManualAreas').val('');
        filterByUnlockedManualAreas = false;
        filterByLockedManualAreas = false;
        $('.changeManualAreasFilterBy').prop('checked', false);
        $('.changeManualAreasFilterBy2').prop('checked', false);
        (mid === manualAreasOnly) ? $('.changeManualAreasFilterBy2-container').show() : $('.changeManualAreasFilterBy2-container').hide();
        searchManualAreas();
        $('#myModal31').show();
        modalOutsideTime = Date.now();
        $('#searchManualAreas').focus();
    }
}

// Toggle filtering of manual areas by unlocked-only
let changeManualAreasFilterBy = function() {
    filterByUnlockedManualAreas = !filterByUnlockedManualAreas;
    if (filterByUnlockedManualAreas) {
        filterByLockedManualAreas = false;
        $('.changeManualAreasFilterBy2').prop('checked', false);
    }
    searchManualAreas();
}

// Toggle filtering of manual areas by locked-only
let changeManualAreasFilterBy2 = function() {
    filterByLockedManualAreas = !filterByLockedManualAreas;
    if (filterByLockedManualAreas) {
        filterByUnlockedManualAreas = false;
        $('.changeManualAreasFilterBy').prop('checked', false);
    }
    searchManualAreas();
}

// Searches for matching names within manual areas data
let searchManualAreas = function() {
    let searchTemp = $('#searchManualAreas').val().toLowerCase();
    $('#manual-areas-data').empty();
    Object.keys(chunkInfo['challenges']['Nonskill']).filter(task => { return chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('UnlocksArea') && task.toLowerCase().includes(searchTemp.toLowerCase()) && (!filterByUnlockedManualAreas || (possibleAreas.hasOwnProperty(task) && possibleAreas[task])) && (!filterByLockedManualAreas || !possibleAreas.hasOwnProperty(task) || !possibleAreas[task]) }).sort().forEach((area) => {
        $('#manual-areas-data').append(`<div class='outer-manual-area noscroll'><span class='manual-area-btn enable-manual-area-btn noscroll${(!testMode && (viewOnly || inEntry || locked)) ? ' locked' : ''}${manualAreas.hasOwnProperty(area) && manualAreas[area] ? ' selected-area' : ''}${manualAreas.hasOwnProperty(area) && !manualAreas[area] ? ' grey-area' : ''}' onclick='setManualArea("${encodeRFC5987ValueChars(area)}", ${true})'>Enable</span><span class='manual-area-btn disable-manual-area-btn noscroll${(!testMode && (viewOnly || inEntry || locked)) ? ' locked' : ''}${manualAreas.hasOwnProperty(area) && !manualAreas[area] ? ' selected-area' : ''}${manualAreas.hasOwnProperty(area) && manualAreas[area] ? ' grey-area' : ''}' onclick='setManualArea("${encodeRFC5987ValueChars(area)}", ${false})'>Disable</span><span class='manual-area-text noscroll${possibleAreas.hasOwnProperty(area) && possibleAreas[area] ? ' green' : ''}'><a class='noscroll link' href="${"https://runescape.wiki/w/" + encodeForUrl(area)}" target='_blank'>${area.replaceAll(/#/g, '#\u200B').replaceAll(/\//g, '/\u200B')}</a></span></div>`);
    });
    if ($('#manual-areas-data').children().length === 0) {
        $('#manual-areas-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Sets the manual area given to the value given
let setManualArea = function(area, value) {
    if (!(!testMode && (viewOnly || inEntry || locked))) {
        area = decodeQueryParam(area);
        if (value === manualAreas[area]) {
            delete manualAreas[area];
            delete possibleAreas[area];
        } else {
            manualAreas[area] = value;
            possibleAreas[area] = value;
        }
        searchManualAreas();
        calcCurrentChallengesCanvas(true);
        setData();
    }
}

// Opens the chunk sections modal
let openChunkSections = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        chunkSectionsModalOpen = true;
        $('#searchChunkSections').val('');
        searchChunkSections();
        $('#myModal42').show();
        modalOutsideTime = Date.now();
        $('#searchChunkSections').focus();
        document.getElementById('chunk-sections-data').scrollTop = 0;
    }
}

// Searches for matching names within manual areas data
let searchChunkSections = function() {
    let searchTemp = $('#searchChunkSections').val().toLowerCase();
    $('#chunk-sections-data').empty();
    let chunkImageUrls = [];
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).filter(chunkId => chunkInfo['sections'].hasOwnProperty(chunkId) && Object.keys(chunkInfo['sections'][chunkId]).filter(section => section !== "0").length > 0 && (chunkId.toLowerCase().includes(searchTemp.toLowerCase()) || (chunkInfo['chunks'][chunkId].hasOwnProperty('Nickname') && chunkInfo['chunks'][chunkId]['Nickname'].toLowerCase().includes(searchTemp.toLowerCase())))).sort((a, b) => parseInt(a) - parseInt(b)).forEach((chunkId) => {
        let coords = convertToXY(chunkId);
        chunkImageUrls.push('./resources/chunk_images/row-' + (coords.y + 1) + '-column-' + (coords.x + 1) + '.png');
    });
    preloadImages(chunkImageUrls);
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).filter(chunkId => chunkInfo['sections'].hasOwnProperty(chunkId) && Object.keys(chunkInfo['sections'][chunkId]).filter(section => section !== "0").length > 0 && (chunkId.toLowerCase().includes(searchTemp.toLowerCase()) || (chunkInfo['chunks'][chunkId].hasOwnProperty('Nickname') && chunkInfo['chunks'][chunkId]['Nickname'].toLowerCase().includes(searchTemp.toLowerCase())))).sort((a, b) => parseInt(a) - parseInt(b)).forEach((chunkId) => {
        let coords = convertToXY(chunkId);
        $('#chunk-sections-data').append(`<div class='outer-chunk-section noscroll' onclick='openChunkSectionPicker("${chunkId}")' title='${chunkInfo['chunks'][chunkId]['Nickname']}'><img src='${'./resources/chunk_images/row-' + (coords.y + 1) + '-column-' + (coords.x + 1) + '.png'}' /><span class='chunk-section-text noscroll'>${chunkId}</span></div>`);
    });
    if ($('#chunk-sections-data').children().length === 0) {
        $('#chunk-sections-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Finds all connected sub-chunk sections based on inputted manual sections
let findConnectedSections = function(chunksIn, sections) {
    let added = false;
    Object.keys(chunkInfo['sections']).filter((chunk) => chunksIn.hasOwnProperty(chunk)).forEach((chunk) => {
        Object.keys(chunkInfo['sections'][chunk]).filter((sec) => sec !== "0" && (!sections.hasOwnProperty(chunk) || !sections[chunk].hasOwnProperty(sec))).forEach((sec) => {
            if (settings['optOutSections'] || (chunkInfo['sections'][chunk][sec].filter((connection) => (connection.includes('-') ? (sections.hasOwnProperty(connection.split('-')[0]) && sections[connection.split('-')[0]].hasOwnProperty(connection.split('-')[1])) : chunksIn.hasOwnProperty(connection))).length > 0) || (!!chunkInfo['chunks'][chunk] && chunkInfo['chunks'][chunk].hasOwnProperty('Sections') && !!chunkInfo['chunks'][chunk]['Sections'][sec] && chunkInfo['chunks'][chunk]['Sections'][sec].hasOwnProperty('Connect') && Object.keys(chunkInfo['chunks'][chunk]['Sections'][sec]['Connect']).filter((subChunk) => !!chunkInfo['chunks'][subChunk] && chunkInfo['chunks'][subChunk].hasOwnProperty('Name') && chunksIn.hasOwnProperty(chunkInfo['chunks'][subChunk]['Name']) && chunksIn[chunkInfo['chunks'][subChunk]['Name']] !== false && chunkInfo['chunks'][subChunk]['Name'] !== 'Zanaris').length > 0)) {
                if (!sections[chunk]) {
                    sections[chunk] = {};
                }
                sections[chunk][sec] = true;
                added = true;
            }
        });
    });
    if (added) {
        return findConnectedSections(chunksIn, sections);
    } else {
        return sections;
    }
}

// Section helper function
let resetSectionVars = async function(chunkId) {
    let coords = convertToXY(chunkId);
    sectionMainUrl = './resources/chunk_images/row-' + (coords.y + 1) + '-column-' + (coords.x + 1) + '.png';
    sectionUrls = {};
    !!chunkInfo['sections'][chunkId] && Object.keys(chunkInfo['sections'][chunkId]).forEach((section) => {
        sectionUrls[section] = './resources/section_overlays/' + chunkId + '-' + section + '.png';
    });
    await preloadImages([sectionMainUrl, ...Object.values(sectionUrls)]);
    sectionChunkId = chunkId;
    hoveredNumSection = '-1';
    sectionImgs = [];
    selectedSections = {};
    !!chunkInfo['sections'][chunkId] && Object.keys(chunkInfo['sections'][chunkId]).forEach((section) => {
        let imgSection = new Image();
        imgSection.crossOrigin = 'anonymous';
        imgSection.src = sectionUrls[section];
        sectionImgs[section] = imgSection;
        if (manualSections[chunkId] && manualSections[chunkId].hasOwnProperty(section)) {
            selectedSections[section] = manualSections[chunkId][section];
        }
    });
    sectionImgMain = new Image();
    sectionImgMain.crossOrigin = 'anonymous';
    sectionImgMain.src = sectionMainUrl;
    canvasSection = document.getElementById('chunk-section-picker-canvas');
    contextSection = canvasSection.getContext('2d');
    sectionImgMain.onload = function() {
        redrawSectionCanvas();
    }
}

// Opens the chunk section picker modal
let openChunkSectionPicker = async function(chunkId, calculateAfter) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        await resetSectionVars(chunkId);
        chunkSectionPickerModalOpen = true;
        chunkSectionCalculateAfter = calculateAfter;
        $(`.chunk-section-picker-chunk-id`).text(chunkId);
        $('#chunk-section-picker-selectall-btn').prop("checked", false).prop('disabled', !(testMode || !(viewOnly || inEntry || locked)));
        $('#save-chunk-section-picker-button').text(!(testMode || !(viewOnly || inEntry || locked)) ? 'Close' : 'Save');
        $(`.chunk-section-picker-btns`).empty();
        !!chunkInfo['sections'][chunkId] && Object.keys(chunkInfo['sections'][chunkId]).forEach((sec) => {
            if (!(testMode || !(viewOnly || inEntry || locked))) {
                $(`.chunk-section-picker-btns`).append(`<span id='section-btn-${sec}' class='section-btn locked'>Section ${sec}</span>`);
            } else {
                $(`.chunk-section-picker-btns`).append(`<span id='section-btn-${sec}' class='section-btn' onmouseover="hoverSectionCanvas('${sec}')" onmouseout="hoverSectionCanvas('-1')" onclick="selectSectionCanvas('${sec}')">Section ${sec}</span>`);
            }
            if (selectedSections[sec]) {
                $(`#section-btn-${sec}`).addClass('green-section-btn').removeClass('red-section-btn');
            } else if (selectedSections[sec] === false) {
                $(`#section-btn-${sec}`).addClass('red-section-btn').removeClass('green-section-btn');
            } else {
                $(`#section-btn-${sec}`).removeClass('red-section-btn').removeClass('green-section-btn');
            }
        });
        $('#chunk-section-picker-selectall-btn').prop('checked', Object.keys(selectedSections).filter(num => selectedSections[num]).length === Object.keys(sectionUrls).length);
        redrawSectionCanvas();
        $('#myModal43').show();
        modalOutsideTime = Date.now();
    }
}

// Redraws the section canvas
let redrawSectionCanvas = function() {
    contextSection.globalAlpha = 1;
    contextSection.drawImage(sectionImgMain, 0, 0);
    if (hoveredNumSection === '-1') {
        contextSection.globalAlpha = 0.75;
    } else {
        contextSection.globalAlpha = 0.5;
    }
    !!chunkInfo['sections'][sectionChunkId] && Object.keys(chunkInfo['sections'][sectionChunkId]).forEach((section) => {
        if (selectedSections[section] || (unlockedSections.hasOwnProperty(sectionChunkId) && unlockedSections[sectionChunkId][section] && selectedSections[section] !== false)) {
            contextSection.drawImage(sectionImgs[section], 0, 0);
        }
    });
    if (hoveredNumSection !== '-1') {
        contextSection.fillStyle = 'rgba(0, 0, 0, 0.4)';
        contextSection.fillRect(0, 0, 700, 500);
        contextSection.globalAlpha = 0.75;
        let imgSection = new Image();
        imgSection.crossOrigin = 'anonymous';
        imgSection.src = sectionUrls[hoveredNumSection];
        contextSection.drawImage(imgSection, 0, 0);
    }
}

// On-hover section canvas
let hoverSectionCanvas = function(section) {
    hoveredNumSection = section;
    redrawSectionCanvas();
}

// On-select section canvas
let selectSectionCanvas = function(section) {
    if (selectedSections[section]) {
        selectedSections[section] = false;
        $(`#section-btn-${section}`).addClass('red-section-btn').removeClass('green-section-btn');
    } else if (selectedSections[section] === false) {
        delete selectedSections[section];
        $(`#section-btn-${section}`).removeClass('red-section-btn').removeClass('green-section-btn');
    } else {
        selectedSections[section] = true;
        $(`#section-btn-${section}`).addClass('green-section-btn').removeClass('red-section-btn');
    }
    $('#chunk-section-picker-selectall-btn').prop('checked', Object.keys(selectedSections).filter(num => selectedSections[num]).length === Object.keys(sectionUrls).length);
    redrawSectionCanvas();
}

// Selects all chunk sections
let selectAllChunkSections = function() {
    !!chunkInfo['sections'][sectionChunkId] && Object.keys(chunkInfo['sections'][sectionChunkId]).forEach((section) => {
        if ($('#chunk-section-picker-selectall-btn').prop('checked')) {
            selectedSections[section] = true;
            $(`#section-btn-${section}`).addClass('green-section-btn').removeClass('red-section-btn');
        } else {
            delete selectedSections[section];
            $(`#section-btn-${section}`).removeClass('red-section-btn').removeClass('green-section-btn');
        }
    });
    redrawSectionCanvas();
}

// Unsets incorrect search
let searchingPlayerMaps = function() {
    $('#searchPlayerMaps').removeClass('wrong');
    $('#searchPlayerMapsButton').attr('disabled', false);
}

// Searches for player maps by player username
let searchPlayerMaps = function() {
    databaseRef.child('highscores/players/' + $('#searchPlayerMaps').val().toLowerCase().replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('[+]', ' ')).once('value', function(snap) {
        if (!!snap.val()) {
            $('#searchPlayerMaps').removeClass('wrong');
            window.location.assign(window.location.href.split('?')[0] + '?' + snap.val());
        } else if (contentCreators.hasOwnProperty($('#searchPlayerMaps').val().toLowerCase().replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('[+]', ' '))) {
            $('#searchPlayerMaps').removeClass('wrong');
            window.location.assign(window.location.href.split('?')[0] + '?' + contentCreators[$('#searchPlayerMaps').val().toLowerCase().replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('[+]', ' ')]);
        } else {
            $('#searchPlayerMaps').addClass('wrong');
            $('#searchPlayerMapsButton').attr('disabled', true);
        }
    });
}

// Opens the add random event loot modal
let openRandomAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
    randomModalOpen = true;
    $('#random-data').html('<div><div class="random-list" onclick="openRandomList()">Show Added Items</div><div class="random-cancel" onclick="addRandomLoot(true)">Cancel</div><div class="random-proceed disabled" onclick="addRandomLoot()">Add item</div></div>');
    $('#random-dropdown').empty().append(`<option value='${'Select an item'}'>${'Select an item'}</option>`);
    randomLootChoices.forEach((loot) => {
        $('#random-dropdown').append(`<option value="${loot}">${loot}</option>`);
    });
    $('#myModal6').show();
}

// Opens the list of random items added modal
let openRandomList = function() {
    randomListModalOpen = true;
    $('#randomlist-data').empty();
    Object.keys(randomLoot).sort().forEach((loot) => {
        $('#randomlist-data').append(`<div class='randomlist-item ${loot.replaceAll("'", "").replaceAll(" ", "_").replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-loot'} noscroll'>${loot}<span class='noscroll' onclick="removeRandomLoot('${loot}')"><i class="fas fa-times noscroll"></i></span></div>`);
    });
    if ($('#randomlist-data').children().length === 0) {
        $('#randomlist-data').append(`<div class="noscroll results"><span class="noscroll">No items</span></div>`);
    }
    $('#myModal8').show();
    modalOutsideTime = Date.now();
}

// Removes passed item from added random loot
let removeRandomLoot = function(item) {
    if (randomLoot.hasOwnProperty(item)) {
        delete randomLoot[item];
        $('#randomlist-data').children('.' + item.replaceAll("'", "").replaceAll(" ", "_").replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-loot').remove();
        if ($('#randomlist-data').children().length === 0) {
            $('#randomlist-data').append(`<div class="noscroll results"><span class="noscroll">No items</span></div>`);
        }
        calcCurrentChallengesCanvas(true);
        setData();
    }
}

// Triggers onchange of random selection to validate submit button
let randomChange = function() {
    let val = $('#random-dropdown').val();
    if (val !== 'Select an item') {
        $('.random-proceed').removeClass('disabled');
    } else {
        $('.random-proceed').addClass('disabled');
    }
}

// Submits picked random loot if one is chosen, then closes modal either way
let addRandomLoot = function(close) {
    if (close) {
        $('#myModal6').hide();
        randomModalOpen = false;
    } else {
        let loot = $('#random-dropdown').val();
        if (loot !== 'Select an item') {
            if (loot !== '') {
                randomLoot[loot] = true;
                calcCurrentChallengesCanvas(true);
                setData();
            }
            $('#myModal6').hide();
            randomModalOpen = false;
        }
    }
}

// Shuffles the inputted array
let shuffle = function(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Opens the quest steps modal
let openQuestSteps = function(skill, challenge) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        challenge = decodeQueryParam(challenge);
        let tier = null;
        if (challenge.includes('#XX')) {
            tier = challenge.split('|')[1].split('#XX')[1];
            challenge = challenge.replaceAll('#XX' + tier, '');
        }
        questStepsModalOpen = true;
        let quest = skill === 'Diary' ? challenge.split('~')[1].split('|').join('').split('#')[0] : challenge.split('~')[1].split('|').join('');
        $('.quest-steps-title').html(`<a class='noscroll link' href="${"https://runescape.wiki/w/" + encodeForUrl(quest)}" target='_blank'>${quest}</a>`);
        $('.quest-steps-data').empty();
        $('.quest-steps-data').append(`<div class='noscroll step step-header'><span class='noscroll step-table-header ${skill === 'Diary' ? 'diary-size' : ''}'>Step</span><span class='noscroll description-table-header ${skill === 'Diary' ? 'diary-size' : ''}'>Description</span></div>`);
        if (challenge.split('~').length > 2 && challenge.split('~')[2] === '') {
            if (skill === 'Diary') {
                Object.keys(chunkInfo['challenges'][skill]).filter(line => chunkInfo['challenges'][skill][line]['BaseQuest'] === quest && chunkInfo['challenges'][skill][line].hasOwnProperty('Description')).forEach((line) => {
                    $('.quest-steps-data').append(`<div class='noscroll step${diaryProgress.hasOwnProperty(challenge.split('|')[1]) && diaryProgress[challenge.split('|')[1]]['allTasks'].includes(line) ? ' highlighted' : ''}${line.split('|')[1].split('#')[1] === tier ? ' diary-start' : ''}'><span class='noscroll step-step diary-size'>${skill === 'Diary' ? line.split('|~')[1].replaceAll('Task ', diaryTierAbr[line.split('~')[1].split('|').join('').split('#')[1]]) : line.split('|~')[1]}</span><span class='noscroll step-description diary-size'>${chunkInfo['challenges'][skill][line]['Description']}</span><span class="quest-steps-info" onclick="showDetails('${encodeRFC5987ValueChars(line)}', '${skill}', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
                });
            } else {
                if (questProgress[challenge.split('|')[1]] === 'Complete the quest') {
                    Object.keys(chunkInfo['challenges'][skill]).filter(line => chunkInfo['challenges'][skill][line]['BaseQuest'] === quest && chunkInfo['challenges'][skill][line].hasOwnProperty('Description')).forEach((line) => {
                        $('.quest-steps-data').append(`<div class='noscroll step highlighted'><span class='noscroll step-step'>${skill === 'Diary'? line.split('|~')[1].replaceAll('Task ', diaryTierAbr[line.split('~')[1].split('|').join('').split('#')[1]]) : line.split('|~')[1]}</span><span class='noscroll step-description'>${chunkInfo['challenges'][skill][line]['Description']}</span><span class="quest-steps-info" onclick="showDetails('${encodeRFC5987ValueChars(line)}', '${skill}', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
                    });
                } else {
                    Object.keys(chunkInfo['challenges'][skill]).filter(line => chunkInfo['challenges'][skill][line]['BaseQuest'] === quest && chunkInfo['challenges'][skill][line].hasOwnProperty('Description')).forEach((line) => {
                        $('.quest-steps-data').append(`<div class='noscroll step${questProgress.hasOwnProperty(challenge.split('|')[1]) && questProgress[challenge.split('|')[1]].includes(line) ? ' highlighted' : ''}'><span class='noscroll step-step'>${skill === 'Diary'? line.split('|~')[1].replaceAll('Task ', diaryTierAbr[line.split('~')[1].split('|').join('').split('#')[1]]) : line.split('|~')[1]}</span><span class='noscroll step-description'>${chunkInfo['challenges'][skill][line]['Description']}</span><span class="quest-steps-info" onclick="showDetails('${encodeRFC5987ValueChars(line)}', '${skill}', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
                    });
                }
            }
        } else {
            if (skill === 'Diary') {
                Object.keys(chunkInfo['challenges'][skill]).filter(line => chunkInfo['challenges'][skill][line]['BaseQuest'] === quest && chunkInfo['challenges'][skill][line].hasOwnProperty('Description')).forEach((line) => {
                    $('.quest-steps-data').append(`<div class='noscroll step${line === challenge ? ' highlighted' : ''}'><span class='noscroll step-step diary-size'>${line.split('|~')[1].replaceAll('Task ', diaryTierAbr[line.split('~')[1].split('|').join('').split('#')[1]])}</span><span class='noscroll step-description'>${chunkInfo['challenges'][skill][line]['Description']}</span><span class="quest-steps-info" onclick="showDetails('${encodeRFC5987ValueChars(line)}', '${skill}', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
                });
            } else {
                Object.keys(chunkInfo['challenges'][skill]).filter(line => chunkInfo['challenges'][skill][line]['BaseQuest'] === quest && chunkInfo['challenges'][skill][line].hasOwnProperty('Description')).forEach((line) => {
                    $('.quest-steps-data').append(`<div class='noscroll step${line === challenge ? ' highlighted' : ''}'><span class='noscroll step-step'>${line.split('|~')[1]}</span><span class='noscroll step-description'>${chunkInfo['challenges'][skill][line]['Description']}</span><span class="quest-steps-info" onclick="showDetails('${encodeRFC5987ValueChars(line)}', '${skill}', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
                });
            }
        }

        $('#myModal25').show();
        modalOutsideTime = Date.now();
        if (tier !== null) {
            !!$('.quest-steps-data .diary-start')[0] && $('.quest-steps-data .diary-start')[0].scrollIntoView({
                behavior: 'auto',
            });
        } else {
            !!$('.quest-steps-data .highlighted')[0] && $('.quest-steps-data .highlighted')[0].scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
    }
}

// Opens the friends list modal
let openFriendsList = function() {
    onMobile && hideMobileMenu();
    friendsListModalOpen = true;
    $('.friends-list-data').empty();
    $('.friends-list-data').append(`<div class='addEntry noscroll' onclick='openFriendsListAdd()'>Add Map Entry</div>`);
    Object.keys(friends).sort((a, b) => { return friends[a].toLowerCase().localeCompare(friends[b].toLowerCase()) }).forEach((friendMid) => {
        $('.friends-list-data').append(`<div class='noscroll friend-item'><a class='noscroll link' href='https://source-chunk.github.io/chunk-picker-rs3/?${friendMid.toLowerCase()}' target='_blank'>${friends[friendMid]} (${friendMid})</a><i class="friend-item-x fas fa-times noscrollhard" onclick="removeFriend('${friendMid}', '${friends[friendMid]}')"></i></div>`);
    });
    Object.keys(friendsAlt).sort((a, b) => { return friendsAlt[a].toLowerCase().localeCompare(friendsAlt[b].toLowerCase()) }).forEach((friendMid) => {
        $('.friends-list-data').append(`<div class='noscroll friend-item'><a class='noscroll link' href='https://source-chunk.github.io/chunk-picker-v2/?${friendMid.toLowerCase()}' target='_blank'>${friendsAlt[friendMid]} (${friendMid})</a><i class="friend-item-x fas fa-times noscrollhard" onclick="removeFriend('${friendMid}', '${friendsAlt[friendMid]}')"></i></div>`);
    });
    $('#myModal26').show();
    modalOutsideTime = Date.now();
    document.getElementById('friends-list-data').scrollTop = 0;
    settingsOpen && settingsMenu();
}

// Opens the friends add modal
let openFriendsListAdd = function() {
    friendsAddModalOpen = true;
    $('#submit-friend-button').prop('disabled', true);
    $('.mid-friend').val('');
    $('.name-friend').val('');
    $(".altsite-friend-checkbox").prop("checked", false);
    $('#myModal27').show();
    modalOutsideTime = Date.now();
    $('.mid-friend').focus();
}

let removeFriend = function(friendMid, friendName) {
    if (friendsAlt.hasOwnProperty(friendMid) && friendsAlt[friendMid] === friendName) {
        delete friendsAlt[friendMid];
    } else if (friends.hasOwnProperty(friendMid) && friends[friendMid] === friendName) {
        delete friends[friendMid];
    }
    setData();
    openFriendsList();
}

// Opens the add locked slayer task modal
let openSlayerLocked = function() {
    slayerLockedModalOpen = true;
    $('#slayer-locked-input').val('');
    $('#slayer-locked-data').html('<div><div class="slayer-locked-cancel" onclick="addSlayerLocked(true)">Cancel</div><div class="slayer-locked-proceed disabled" onclick="addSlayerLocked()">Lock Slayer</div></div>');
    $('#slayer-locked-dropdown').empty().append(`<option value='${'Select a task'}'>${'Select a task'}</option>`);
    $('#slayer-locked-dropdown').append(`<option value="${'Manually Locked'}">${"Manually Locked"}</option>`);
    Object.keys(slayerTasks).forEach((task) => {
        $('#slayer-locked-dropdown').append(`<option value="${task}">${task}</option>`);
    });
    $('#myModal22').show();
}

// Triggers onchange of slayer locked selection to validate submit button
let slayerLockedChange = function() {
    let val = $('#slayer-locked-dropdown').val();
    let val2 = $('#slayer-locked-input').val();
    if (val !== 'Select a task') {
        if (!!val2 && !isNaN(parseInt(val2)) && parseInt(val2) >= 0 && parseInt(val2) <= 120 && parseInt(val2) % 1 === 0) {
            $('.slayer-locked-proceed').removeClass('disabled');
        } else {
            $('.slayer-locked-proceed').addClass('disabled');
        }
    } else {
        $('.slayer-locked-proceed').addClass('disabled');
    }
}

// Submits picked slayer task/level if one is chosen, then closes modal either way
let addSlayerLocked = function(close) {
    if (close) {
        $('#myModal22').hide();
        slayerLockedModalOpen = false;
    } else {
        let task = $('#slayer-locked-dropdown').val();
        let level = !!$('#slayer-locked-input').val() ? parseInt($('#slayer-locked-input').val()) : NaN;
        if (task !== 'Select a task' && !isNaN(level) && level >= 0 && level <= 120 && level % 1 === 0) {
            if (task !== '') {
                slayerLocked = {};
                slayerLocked['monster'] = task;
                slayerLocked['level'] = level;
                calcCurrentChallengesCanvas(true);
                setData();
                openHighest2();
            }
            $('#myModal22').hide();
            slayerLockedModalOpen = false;
        }
    }
}

// Opens the outer manual modal
let openManualAddOuter = function() {
    onMobile && hideMobileMenu();
    manualOuterModalOpen = true;
    $('#myModal20').show();
    modalOutsideTime = Date.now();
}

// Opens the manual add monsters modal
let openMonstersAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
    monsterModalOpen = true;
    $('#myModal21').show();
    modalOutsideTime = Date.now();
    $('#searchMonsters').val('').focus();
    searchMonsters();
}

// Searches for matching names within monsters
let searchMonsters = function() {
    let searchTemp = $('#searchMonsters').val().toLowerCase();
    $('.monsters-data').empty();
    baseChunkDataTotal = {
        'Items': {},
        'Monsters': {},
        'NPCs': {},
        'Objects': {}
    };
    Object.keys(chunkInfo['challenges']).forEach((skill) => {
        Object.keys(chunkInfo['challenges'][skill]).forEach((challenge) => {
            Object.keys(baseChunkDataTotal).forEach((section) => {
                chunkInfo['challenges'][skill][challenge].hasOwnProperty(section) && chunkInfo['challenges'][skill][challenge][section].forEach((el) => {
                    if (!chunkInfo['codeItems'][section.toLowerCase() + 'Plus'].hasOwnProperty(el.replaceAll('*', ''))) {
                        baseChunkDataTotal[section][el.replaceAll('*', '')] = true;
                    } else {
                        chunkInfo['codeItems'][section.toLowerCase() + 'Plus'][el.replaceAll('*', '')].forEach((plus) => {
                            baseChunkDataTotal[section][plus.replaceAll('*', '')] = true;
                        });
                    }
                });
            });
            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Output')) {
                if (!chunkInfo['skillItems'][skill] || !chunkInfo['skillItems'][skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Output'].replaceAll('*', ''))) {
                    baseChunkDataTotal['Items'][chunkInfo['challenges'][skill][challenge]['Output'].replaceAll('*', '')] = true;
                } else {
                    Object.keys(chunkInfo['skillItems'][skill][chunkInfo['challenges'][skill][challenge]['Output'].replaceAll('*', '')]).forEach((item) => {
                        baseChunkDataTotal['Items'][item.replaceAll('*', '')] = true;
                    });
                }
            }
        });
    });
    Object.keys(chunkInfo['equipment']).forEach((equip) => {
        baseChunkDataTotal['Items'][equip] = true;
    });
    let monstersList = {...chunkInfo['drops'], ...chunkInfo['skillItems']['Slayer']};
    Object.keys(monstersList).forEach((monster) => {
        baseChunkDataTotal['Monsters'][monster] = true;
    });
    if (Object.keys(baseChunkDataTotal).length > 0 && Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200 || filterByCheckedMonsters) {
        Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).length > 0 && Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).sort().forEach((item) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Items'] && !!manualMonsters['Items'][item] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(item.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'Items')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(item.replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).length > 0 && Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).sort().forEach((monster) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(monster.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'Monsters')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(monster.replace(/[!'()*]/g, escape))}' target='_blank'>${monster.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).length > 0 && Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).sort().forEach((npc) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc] && "checked"} type="checkbox" onclick="checkOffMonster('${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '')}', 'NPCs')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(npc.replace(/[!'()*]/g, escape))}' target='_blank'>${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).length > 0 && Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).sort().forEach((object) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Objects'] && !!manualMonsters['Objects'][object] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(object.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'Objects')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(object.replace(/[!'()*]/g, escape))}' target='_blank'>${object.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
    } else if (Object.keys(baseChunkDataTotal).length > 0) {
        Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).length > 0 && Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).sort().forEach((item) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Items'] && !!manualMonsters['Items'][item] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(item.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'Items')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(item.replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).length > 0 && Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).sort().forEach((monster) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(monster.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'Monsters')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(monster.replace(/[!'()*]/g, escape))}' target='_blank'>${monster.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).length > 0 && Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).sort().forEach((npc) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(npc.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'NPCs')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(npc.replace(/[!'()*]/g, escape))}' target='_blank'>${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).length > 0 && Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).sort().forEach((object) => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Objects'] && !!manualMonsters['Objects'][object] && "checked"} type="checkbox" onclick="checkOffMonster('${encodeRFC5987ValueChars(object.replaceAll(/~/g, '').replaceAll(/\|/g, ''))}', 'Objects')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(object.replace(/[!'()*]/g, escape))}' target='_blank'>${object.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        $('.monsters-data').append(`<div class="noscroll results ${Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp).length + Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp).length + Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp).length + Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase() === searchTemp).length > 0 ? 'results-alt': ''}"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.monsters-data').children().length === 0) {
        $('.monsters-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering of monsters by checked-only
let changeMonstersFilterBy = function() {
    filterByCheckedMonsters = !filterByCheckedMonsters;
    searchMonsters();
}

// Checks off the given monster
let checkOffMonster = function(monster, type) {
    monster = decodeQueryParam(monster);
    if (!manualMonsters[type]) {
        manualMonsters[type] = {};
    }
    if (!manualMonsters[type][monster]) {
        manualMonsters[type][monster] = true;
    } else {
        delete manualMonsters[type][monster];
        if (!manualMonsters[type]) {
            delete manualMonsters[type];
        }
    }
    setData();
    calcCurrentChallengesCanvas(true);
}

// Opens the manual add tasks modal
let openManualAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
    fullChallengeArr = {};
    Object.keys(chunkInfo['challenges']).forEach((skill) => {
        if (skill !== 'Nonskill' && skill !== 'BiS') {
            Object.keys(chunkInfo['challenges'][skill]).forEach((challenge) => {
                if (!fullChallengeArr[challenge]) {
                    fullChallengeArr[challenge] = [];
                }
                fullChallengeArr[challenge].push(skill);
            });
        }
    });
    manualModalOpen = true;
    $('#myModal').show();
    modalOutsideTime = Date.now();
    $('#searchManual').val('').focus();
    searchManualTasks();
}

// Filters the full list of challenges
let searchManualTasks = function() {
    let searchTemp = $('#searchManual').val().toLowerCase();
    $('.challenge-data').empty();
    if (Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().replaceAll('~', '').replaceAll('|', '').includes(searchTemp)).length <= 100 || filterByChecked) {
        Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().replaceAll('~', '').replaceAll('|', '').includes(searchTemp)).sort().forEach((challenge) => {
            if (!filterByChecked || (!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge])) {
                $('.challenge-data').append(`<div class="noscroll result-item"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('${encodeRFC5987ValueChars(challenge)}')" />${challenge.replaceAll(/~/g, '').replaceAll(/\|/g, '')}<span onclick="showDetails('${encodeRFC5987ValueChars(challenge)}', '${fullChallengeArr[challenge][0]}', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
            }
        });
    } else {
        $('.challenge-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().replaceAll('~', '').replaceAll('|', '').includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.challenge-data').children().length === 0) {
        $('.challenge-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering by checked-only
let changeFilterBy = function() {
    filterByChecked = !filterByChecked;
    searchManualTasks();
}

// Adds the given challenge to the manual list
let addManualTask = function(challenge) {
    challenge = decodeQueryParam(challenge);
    fullChallengeArr[challenge].forEach((skill) => {
        if (skill !== 'BiS' && (!manualTasks[skill] || !manualTasks[skill][challenge])) {
            if (!manualTasks[skill]) {
                manualTasks[skill] = {};
            }
            manualTasks[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'] || true;
            chunkInfo['challenges'][skill][challenge]['Manual'] = true;
        } else if (skill !== 'BiS') {
            delete manualTasks[skill][challenge];
            delete chunkInfo['challenges'][skill][challenge]['Manual'];
            delete chunkInfo['challenges'][skill][challenge]['ManualValid'];
            if (Object.keys(manualTasks[skill]).length === 0) {
                delete manualTasks[skill];
            }
        }
    });
    calcCurrentChallengesCanvas(true);
}

// Opens the manual complete tasks modal
let openManualComplete = function() {
    completeModalOpen = true;
    $('#myModal14').show();
    modalOutsideTime = Date.now();
}

// Opens the clipboard modal
let openClipboard = function() {
    onMobile && hideMobileMenu();
    clipboardModalOpen = true;
    $('#myModal38').show();
    settingsOpen = false;
    $('.settings-menu').hide();
    $('.settings').css({ 'color': 'var(--colorText)' });
    modalOutsideTime = Date.now();
}

// Opens the search within my chunks modal
let openSearch = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        searchModalOpen = true;
        $('#myModal10').show();
        modalOutsideTime = Date.now();
        $('#searchChunks').val('').focus();
        searchWithinChunks();
    }
}

// Searches for matching names within chunk data
let searchWithinChunks = function() {
    let searchTemp = $('#searchChunks').val().toLowerCase();
    $('.searchchunks-data').empty();
    onlyInitialData ? $(`.searchchunks-initwarning`).show() : $(`.searchchunks-initwarning`).hide();
    if (searchTemp.startsWith('~') && searchTemp.toLowerCase() === '~items' && Object.keys(baseChunkData).length > 0) {
        Object.keys(baseChunkData['items']).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(baseChunkData['items']).length > 0 && Object.keys(baseChunkData['items']).sort().forEach((item) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("items", "${encodeRFC5987ValueChars(item)}")'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
    } else if (searchTemp.startsWith('~') && searchTemp.toLowerCase() === '~monsters' && Object.keys(baseChunkData).length > 0) {
        Object.keys(baseChunkData['monsters']).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(baseChunkData['monsters']).length > 0 && Object.keys(baseChunkData['monsters']).sort().forEach((monster) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("monsters", "${encodeRFC5987ValueChars(monster)}")'>${monster.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
    } else if (searchTemp.startsWith('~') && searchTemp.toLowerCase() === '~npcs' && Object.keys(baseChunkData).length > 0) {
        Object.keys(baseChunkData['npcs']).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(baseChunkData['npcs']).length > 0 && Object.keys(baseChunkData['npcs']).sort().forEach((npc) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("npcs", "${encodeRFC5987ValueChars(npc)}")'>${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
    } else if (searchTemp.startsWith('~') && searchTemp.toLowerCase() === '~objects' && Object.keys(baseChunkData).length > 0) {
        Object.keys(baseChunkData['objects']).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(baseChunkData['objects']).length > 0 && Object.keys(baseChunkData['objects']).sort().forEach((object) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("objects", "${encodeRFC5987ValueChars(object)}")'>${object.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
    } else if (searchTemp.startsWith('~') && searchTemp.toLowerCase() === '~shops' && Object.keys(baseChunkData).length > 0) {
        Object.keys(baseChunkData['shops']).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Shops</b></div>`);
        Object.keys(baseChunkData['shops']).length > 0 && Object.keys(baseChunkData['shops']).sort().forEach((shop) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("shops", "${encodeRFC5987ValueChars(shop)}")'>${shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
    } else if (searchTemp.startsWith('~') && Object.keys(baseChunkData).length > 0) { //TEMP (missing searchTerms)
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Items') && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Items') && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).sort().forEach((item) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("items", "${encodeRFC5987ValueChars(item)}")'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Monsters') && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Monsters') && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).sort().forEach((monster) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("monsters", "${encodeRFC5987ValueChars(monster)}")'>${monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|NPCs') && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">NPCs</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|NPCs') && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).sort().forEach((npc) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("npcs", "${encodeRFC5987ValueChars(npc)}")'>${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Objects') && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Objects') && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).sort().forEach((object) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("objects", "${encodeRFC5987ValueChars(object)}")'>${object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Shops') && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Shops</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Shops') && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/~/g, '').replaceAll(/\|/g, ''))).sort().forEach((shop) => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("shops", "${encodeRFC5987ValueChars(shop)}")'>${shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
    } else {
        if (Object.keys(baseChunkData).length > 0 && Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) {
            Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
            Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).length > 0 && Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).sort().forEach((item) => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("items", "${encodeRFC5987ValueChars(item)}")'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
            Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach((monster) => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("monsters", "${encodeRFC5987ValueChars(monster)}")'>${monster.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
            Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach((npc) => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("npcs", "${encodeRFC5987ValueChars(npc)}")'>${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
            Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach((object) => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("objects", "${encodeRFC5987ValueChars(object)}")'>${object.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Shops</b></div>`);
            Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach((shop) => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("shops", "${encodeRFC5987ValueChars(shop)}")'>${shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
            });
        } else if (Object.keys(baseChunkData).length > 0) {
            $('.searchchunks-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
        }
    }
    if ($('.searchchunks-data').children().length === 0) {
        $('.searchchunks-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Finds gcd
let gcd = function(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, Math.floor(a % b));
};

// Finds even fraction
let findFraction = function(fraction) {
    let len = fraction.toString().length - 2;

    let denominator = Math.pow(10, len);
    let numerator = fraction * denominator;

    let divisor = gcd(numerator, denominator);

    numerator = numerator / divisor;
    denominator = denominator / divisor;
    return 1 + '/' + (+(Math.round((denominator/numerator) + "e+2")  + "e-2")).toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Opens the search details modal
let openSearchDetails = function(category, name, prevCategory, prevName) {
    name = decodeQueryParam(name);
    searchDetailsModalOpen = true;
    if (prevCategory && prevName) {
        $('.searchdetails-back').show().html(`<i class="fas fa-arrow-left noscrollhard" onclick="openSearchDetails('${prevCategory}', '${prevName}')"></i>`);
    } else {
        $('.searchdetails-back').hide();
    }
    $('.searchdetails-data').empty();
    $('.searchdetails-title').text(name.replaceAll(/\|~/g, '').replaceAll(/~\|/g, '').replaceAll(/\*/g, ''));
    let skills = [...skillNames];
    skills.push('Nonskill');
    let formattedSources = [];
    Object.keys(baseChunkData[category][name]).forEach((source) => {
        let formattedSource = '';
        let alreadyPushed = false;
        if (typeof baseChunkData[category][name][source] === "boolean" || !skills.includes(baseChunkData[category][name][source].split('-')[1])) {
            if (chunkInfo['chunks'].hasOwnProperty(source)) {
                let realName = source;
                if (!!chunkInfo['chunks'][source]['Name']) {
                    realName = chunkInfo['chunks'][source]['Name'];
                } else if (!!chunkInfo['chunks'][source]['Nickname']) {
                    realName = chunkInfo['chunks'][source]['Nickname'] + '(' + source + ')';
                }
                formattedSource += realName.replaceAll(/~\|/g, '').replaceAll(/\|~/g, '').replaceAll(/\*/g, '');
            } else {
                let shownSource = source;
                if (shownSource.includes('|')) {
                    shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                }
                formattedSource += `<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeURI(shownSource.replaceAll(/~\|/g, '').replaceAll(/\|~/g, '').replaceAll(/\*/g, ''))}" target="_blank">${shownSource.replaceAll(/~\|/g, '').replaceAll(/\|~/g, '').replaceAll(/\*/g, '')}</a>`;
            }
        }
        if (typeof baseChunkData[category][name][source] !== "boolean" && skills.includes(baseChunkData[category][name][source].split('-')[1])) {
            formattedSource += baseChunkData[category][name][source].split('-')[1].replaceAll(/\*/g, '');
            formattedSource += ` (${source.replaceAll(/~\|/g, '').replaceAll(/\|~/g, '').replaceAll(/\*/g, '')})`;
            formattedSource += `<span class='double-search-icon' onclick="showDetails('` + encodeRFC5987ValueChars(source).replaceAll(/\~/g, '\~\\').replaceAll(/\|/g, '\|\\') + `', '` + baseChunkData[category][name][source].split('-')[1].replaceAll(/\*/g, '') + `')"><i class="quest-icon fas fa-info-circle"></i></span>`;
        } else if (typeof baseChunkData[category][name][source] !== "boolean" && !baseChunkData[category][name][source].includes('primary') && !baseChunkData[category][name][source].includes('secondary') && baseChunkData[category][name][source] !== 'shop') {
            formattedSource += `-${baseChunkData[category][name][source].replaceAll(/\*/g, '')}`;
        } else if (typeof baseChunkData[category][name][source] !== "boolean") {
            if (baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '') === 'drop' && dropTablesGlobal.hasOwnProperty(source) && dropTablesGlobal[source].hasOwnProperty(name)) {
                let tempFormattedSource;
                !!dropTablesGlobal[source][name] && Object.keys(dropTablesGlobal[source][name]).forEach((amount) => {
                    tempFormattedSource = formattedSource;
                    tempFormattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}, qty: ${amount}, ${dropTablesGlobal[source][name][amount]})`;
                    tempFormattedSource += `<span class='double-search-icon' onclick='openSearchDetails("monsters", "${encodeRFC5987ValueChars(source)}", "${category}", "${encodeRFC5987ValueChars(name)}")'><i class="fas fa-search"></i></span>`;
                    formattedSources.push(tempFormattedSource);
                    alreadyPushed = true;
                });
            } else if (baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '') === 'drop' && dropRatesGlobal.hasOwnProperty(source) && dropRatesGlobal[source].hasOwnProperty(name)) {
                formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}, ${dropRatesGlobal[source][name]})`;
            } else if (baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '') === 'drop' && chunkInfo['challenges']['Slayer'].hasOwnProperty(source) && chunkInfo['challenges']['Slayer'][source].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][source]['Output']) && chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source]['Output']].hasOwnProperty(name)) {
                let dropRate = isNaN(Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source]['Output']][name])[0]) ? Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source]['Output']][name])[0] : findFraction(parseFloat(Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source]['Output']][name])[0].split('/')[0].replaceAll('~', '')) / parseFloat(Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source]['Output']][name])[0].split('/')[1]));
                formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}, ${dropRate})`;
                formattedSource += `<span class='double-search-icon' onclick='openSearchDetails("monsters", "${encodeRFC5987ValueChars(source.split('|')[1].charAt(0).toUpperCase() + source.split('|')[1].slice(1))}", "${category}", "${encodeRFC5987ValueChars(name)}")'><i class="fas fa-search"></i></span>`;
            } else {
                formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')})`;
                if (baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '') === 'shop') {
                    formattedSource += `<span class='double-search-icon' onclick='openSearchDetails("shops", "${encodeRFC5987ValueChars(source)}", "${category}", "${encodeRFC5987ValueChars(name)}")'><i class="fas fa-search"></i></span>`;
                }
            }
        }
        if (!alreadyPushed) {
            formattedSources.push(formattedSource);
        }
    });
    formattedSources.sort().forEach((formattedSource) => {
        $('.searchdetails-data').append(`<div class="noscroll results">${formattedSource.replaceAll(/\|~/g, '').replaceAll(/~\|/g, '').replaceAll(/\*/g, '').replaceAll('\~\\', '~').replaceAll('\|\\', '|')}</div>`);
    });
    $('#myModal11').show();
    modalOutsideTime = Date.now();
    document.getElementById('searchdetails-data').scrollTop = 0;
}

// Opens the highest modal
let openHighest = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        highestModalOpen = true;
        let combatStyles = [];
        combatStyles.push('Melee');
        combatStyles.push('Ranged');
        combatStyles.push('Magic');
        if (!rules['F2P']) {
            combatStyles.push('Necromancy');
        }
        if (rules['Show Best in Slot Prayer Tasks']) {
            combatStyles.push('Prayer');
        }
        if (rules['Show Best in Slot Defensive Tasks']) {
            combatStyles.push('Melee Tank');
            combatStyles.push('Ranged Tank');
            combatStyles.push('Magic Tank');
            if (!rules['F2P']) {
                combatStyles.push('Necromancy Tank');
            }
        }
        if (rules['Show Best in Slot Weight Tasks']) {
            combatStyles.push('Weight Reducing');
        }
        if (rules['Show Best in Slot Melee Style Tasks']) {
            combatStyles.splice(combatStyles.indexOf('Melee'), 1, 'Stab', 'Slash', 'Crush');
        }
        let slots = ['Head', 'Neck', 'Back', 'Torso', 'Legs', 'Main hand weapon', 'Off-hand weapon', 'Ammo', 'Hands', 'Feet', 'Ring', 'Pocket'];
        if (rules['Show Best in Slot 1H and 2H']) {
            slots.splice(slots.indexOf('Main hand weapon'), 0, '2h weapon');
            slots.splice(slots.indexOf('Ammo'), 0, 'Ammo (2h)');
        }
        if (rules['Show Best in Slot Shield']) {
            slots.splice(slots.indexOf('Off-hand weapon') + 1, 0, 'Off-hand');
        }
        $('.highest-title').empty();
        $('.highest-data').empty();
        combatStyles.forEach((combatStyle) => {
            let prayerBonus = 0;
            $('.highest-title').append(`<div class='noscroll style-button ${combatStyle.replaceAll(' ', '_')}-button' onclick='switchHighestTab("${combatStyle.replaceAll(' ', '_')}")' title='${combatStyle}'><span class='noscroll'><img class='noscroll slot-icon' src='./resources/${combatStyle.replaceAll(' ', '_')}_combat.png' /></span></div>`);
            $('.highest-data').append(`<div class='noscroll style-body ${combatStyle.replaceAll(' ', '_')}-body'><div class='highest-subtitle noscroll'>${combatStyle}${combatStyle === 'Prayer' ? ` <span class="prayer-bonus">(<img class='noscroll slot-icon' src='./resources/Prayer_combat.png' /> +<span class="prayer-bonus-inner">${prayerBonus}</span>)</span>` : ''}${(testMode || !(viewOnly || inEntry || locked)) && combatStyle !== 'Skills' && combatStyle !== 'Slayer' ? `<div class='noscroll'><span class='noscroll addEquipment' onclick='addEquipment()'>Add additional equipment</span></div>` : ''}</div></div>`);
            slots.forEach((slot) => {
                if (highestOverall.hasOwnProperty(combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()) && highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()] !== 'N/A') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll item-pic'><img class='noscroll slot-icon' src='./resources/Clean_slot.png' title='${slot}' /><img class='noscroll' src="./resources/equipment_icons/${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()].replaceAll(/ /g, '_')}.png" onError='this.onerror=null;this.src="./resources/${slot}_slot.png"' /><img class='noscroll slot-icon hidden-slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /></span><span class='noscroll slot-text'><a class='link' href="${"https://runescape.wiki/w/" + encodeURI(highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()])}" target="_blank">${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]}</a></span><span class='double-search-icon' onclick='openSearchDetails("items", "${encodeRFC5987ValueChars(highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()])}")'><i class="fas fa-search"></i></span></div>`);
                    !!chunkInfo['equipment'][highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]] && (prayerBonus += chunkInfo['equipment'][highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]]['prayer']);
                } else if (highestOverall.hasOwnProperty(combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()) && highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()] === 'N/A') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot.replaceAll(' ', '_')}_slot.png' title='${slot}' /><span class='noscroll slot-text'>${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]}</span></div>`);
                    !!chunkInfo['equipment'][highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]] && (prayerBonus += chunkInfo['equipment'][highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]]['prayer']);
                } else if (slot !== 'Ammo (2h)') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot.replaceAll(' ', '_')}_slot.png' title='${slot}' /><span class='noscroll slot-text'>None</span></div>`);
                    !!chunkInfo['equipment'][highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]] && (prayerBonus += chunkInfo['equipment'][highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]]['prayer']);
                }
            });
            if (combatStyle === 'Prayer') {
                $('.Prayer-body .prayer-bonus-inner').html(prayerBonus);
            }
        });
        if (highestTab === undefined || !combatStyles.includes(highestTab)) {
            highestTab = combatStyles[0];
        }
        $('.style-body').hide();
        $(`.${highestTab}-button`).addClass('active-tab');
        $(`.${highestTab}-body`).show();
        $('#myModal12').show();
        modalOutsideTime = Date.now();
        document.getElementById('highest-data').scrollTop = 0;
    }
}

// Opens the highest2 modal
let openHighest2 = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        highest2ModalOpen = true;
        let combatStyles = [];
        let primarySkill = [];
        if (rules['Show Skill Tasks']) {
            combatStyles.push('Skills');
            skillNames.forEach((skill) => {
                primarySkill[skill] = checkPrimaryMethod(skill, globalValids, baseChunkData);
            });
        }
        combatStyles.push('Quests');
        combatStyles.push('Diaries');
        if (rules['Show Skill Tasks']) {
            combatStyles.push('Slayer');
        }
        //combatStyles.push('Clues'); //TEMP (missing clue tasks)
        //combatStyles.push('Shooting Stars'); //TEMP (missing shooting star locations)
        $('.highest2-title').empty();
        $('.highest2-data').empty();
        combatStyles.forEach((combatStyle) => {
            $('.highest2-title').append(`<div class='noscroll style-button ${combatStyle.replaceAll(' ', '_')}-button' onclick='switchHighest2Tab("${combatStyle.replaceAll(' ', '_')}")' title='${combatStyle}'><span class='noscroll'><img class='noscroll slot-icon' src='./resources/${combatStyle.replaceAll(' ', '_')}_combat.png' /></span></div>`);
            $('.highest2-data').append(`<div class='noscroll style-body ${combatStyle.replaceAll(' ', '_')}-body'><div class='highest-subtitle noscroll'>${combatStyle}</div></div>`);
            if (combatStyle === 'Skills') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll qps'>Quest Points: ${questPointTotal}</div>`);
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row row-header'><span class='noscroll icon-table-header'>Skill</span><span class='noscroll text-table-header'>Highest Task</span><span class='noscroll button-table-header ${onMobile ? 'mobile' : ''}'>Skill Training</span>${settings['allTasks'] ? `<span class='noscroll button2-table-header'>All Tasks</span>` : ''}</div>`);
                skillNames.filter(skill => { return skill !== 'Combat' }).sort().forEach((skill) => {
                    let skillTask = highestOverall[skill];
                    let boost = 0;
                    if (!!highestOverall[skill] && highestOverall[skill].match(/\{[0-9]+\}/g)) {
                        skillTask = highestOverall[skill].replaceAll(/\{[0-9]+\}/g, '');
                        boost = highestOverall[skill].match(/\{[0-9]+\}/g)[0].match(/\d+/)[0];
                    }
                    let completedNum = checkedAllTasks.hasOwnProperty(skill) && globalValids.hasOwnProperty(skill) ? Math.min(Object.keys(checkedAllTasks[skill]).filter(task => globalValids[skill].hasOwnProperty(task) && (!backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task))).length, Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length) : 0;
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll skill-icon-wrapper'><img class='noscroll skill-icon' src='./resources/${skill}_skill.png' title='${skill}' /></span><span class='noscroll skill-text'>${(testMode || !(viewOnly || inEntry || locked)) ? `<span class='noscroll edit-highest' onclick='openPassiveModal("${skill}")'><i class="noscroll fas fa-edit"></i></span>` : ''}${(!!skillTask ? '<b class="noscroll">[' + (boost > 0 ? (chunkInfo['challenges'][skill][skillTask]['Level'] - boost) + '] (+' + boost + ')' : chunkInfo['challenges'][skill][skillTask]['Level'] + ']') + '</b> ' : '') + (skillTask || 'None').replaceAll('~', '').replaceAll('|', '')} ${skillTask ? `<span class="task-info" onclick="showDetails('${encodeRFC5987ValueChars(skillTask)}', '${skill}', '')"><i class="info-icon fas fa-info-circle"></i></span>` : ''}</span><span class='noscroll skill-button ${onMobile ? 'mobile' : ''} ${(primarySkill[skill] ? 'active' : '')}'>${primarySkill[skill] ? `<div class='noscroll methods-button' onclick='viewPrimaryMethodsOrTasks("${skill}", false)'>View Methods</div></span>` : `<div class='noscroll'>None</div></span>`}${settings['allTasks'] ? `<span class='noscroll skill-button2 ${(!!globalValids[skill] && Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length > 0 ? 'active' : '')}'>${!!globalValids[skill] && Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length > 0 ? `<div class='noscroll tasks-button ${skill}-tasks-button ${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length > completedNum ? 'yellow' : 'green'}' onclick='viewPrimaryMethodsOrTasks("${skill}", true)'>Tasks <span class='noscroll'>(${completedNum}/${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length})</span></div></span>` : `<div class='noscroll'>None</div></span>`}` : ''}</div>`);
                });
            } else if (combatStyle === 'Slayer') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-header'>Slayer is currently <b class='noscroll slayer-locked-status ${!!slayerLocked ? 'red' : 'green'}'>${!!slayerLocked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-unlock"></i>'} ${!!slayerLocked ? 'LOCKED' : 'UNLOCKED'}</b> ${!!slayerLocked ? '(' + `<a class='noscroll' href='${"https://runescape.wiki/w/" + encodeURI(slayerLocked['monster'].replace(/[!'()*]/g, escape))}' target='_blank'>${slayerLocked['monster'].replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a>` + ')' : ''} ${!!slayerLocked ? ' at Level ' + slayerLocked['level'] : ''}</div>`);
                (testMode || !(viewOnly || inEntry || locked)) && !!slayerLocked && $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-unlock-container'><span class='noscroll slayer-unlock-button' onclick='unlockSlayer()'><i class="fas fa-unlock"></i>Manually Unlock</span></div>`);
                (testMode || !(viewOnly || inEntry || locked)) && $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-lock-container'><span class='noscroll slayer-lock-button' onclick='openSlayerLocked()'>${!!slayerLocked ? '<i class="fas fa-edit"></i>' : '<i class="fas fa-lock"></i>'}${!!slayerLocked ? 'Change Locked Monster' : 'Lock Slayer'}</span></div>`);
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<hr class='noscroll'>`);
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-task-calc-title'>Slayer Task Calculator</div>`);
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-calc-container'><span class="noscroll"><span class="noscroll combat-level-label">Combat Level:</span> <input class="noscroll combat-level-input" value="${prevValueLevelInput['Combat']}" /></span><span class="noscroll"><span class="noscroll combat-level-label">Slayer Level:</span> <input class="noscroll slayer-level-input" value="${prevValueLevelInput['Slayer']}" /></span><button class="noscroll calc-slayer-tasks-button" onclick="calculateSlayerTasks()">Calculate Doable Tasks</button></div>`);
                $('.combat-level-input').on('input', function(e) {
                    if (!e.target.value.match(/^[0-9]*$/i)) {
                        $(this).val(prevValueLevelInput['Combat']);
                    } else {
                        prevValueLevelInput['Combat'] = e.target.value;
                    }
                });
                $('.slayer-level-input').on('input', function(e) {
                    if (!e.target.value.match(/^[0-9]*$/i)) {
                        $(this).val(prevValueLevelInput['Slayer']);
                    } else {
                        prevValueLevelInput['Slayer'] = e.target.value;
                    }
                });
                if (slayerTasksCalculated) {
                    calculateSlayerTasks();
                }
            } else if (combatStyle === 'Quests') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll qps'>Quest Points: ${questPointTotal}<i class="noscroll fas fa-filter" title="Filter" onclick="openQuestFilterContextMenu()"></i></div>`);
                Object.keys(chunkInfo['quests']).filter(quest => { return quest === 'break' || quest === 'break2' || questFilterType === 'all' || (questFilterType === 'complete' && questProgress.hasOwnProperty(quest) && (questProgress[quest] === 'Complete the quest')) || (questFilterType === 'incomplete' && questProgress.hasOwnProperty(quest) && Array.isArray(questProgress[quest])) || (questFilterType === 'unstarted' && !questProgress.hasOwnProperty(quest)) }).forEach((quest) => {
                    if (quest === 'break' || quest === 'break2') {
                        $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<hr class='noscroll' />`);
                    } else {
                        $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row${questProgress.hasOwnProperty(quest) ? (questProgress[quest] === 'Complete the quest' ? ' complete' : ' incomplete') : ''}'><span class='noscroll quest-text internal-link' onclick="openQuestSteps('Quest', '~|${encodeForUrl(quest)}|~')">${quest.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</span>${(testMode || !(viewOnly || inEntry || locked)) && (chunkInfo['challenges'].hasOwnProperty('Quest') && chunkInfo['challenges']['Quest'].hasOwnProperty(`~|${quest}|~ Complete the quest`) && chunkInfo['challenges']['Quest'][`~|${quest}|~ Complete the quest`].hasOwnProperty('XpReward') && Object.keys(chunkInfo['challenges']['Quest'][`~|${quest}|~ Complete the quest`]['XpReward']).filter(skill => { return !skillNames.includes(skill) }).length > 0 && questProgress.hasOwnProperty(quest) && questProgress[quest] === 'Complete the quest') ? `<span class='noscroll xp-button${(!assignedXpRewards.hasOwnProperty('Quest') || !assignedXpRewards['Quest'].hasOwnProperty(`~|${quest}|~ Complete the quest`) || Object.keys(assignedXpRewards['Quest'][`~|${quest}|~ Complete the quest`]).includes('None')) ? ' unset' : ''}' onclick="openXpRewardModalWithFormat('Quest', '~|${encodeRFC5987ValueChars(quest)}|~ Complete the quest')">xp</span>` : ''}</div>`);
                    }
                });
                if (Object.keys(chunkInfo['quests']).filter(quest => { return questFilterType === 'all' || (questFilterType === 'complete' && questProgress.hasOwnProperty(quest) && (questProgress[quest] === 'Complete the quest')) || (questFilterType === 'incomplete' && questProgress.hasOwnProperty(quest) && Array.isArray(questProgress[quest])) || (questFilterType === 'unstarted' && !questProgress.hasOwnProperty(quest)) }).length === 0) {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).empty().append(`<div class='highest-subtitle noscroll'>${combatStyle}</div><div class='noscroll qps'>Quest Points: ${questPointTotal}<i class="noscroll fas fa-filter" title="Filter" onclick="openQuestFilterContextMenu()"></i></div>`).append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No quests ${questFilterType}</span></span></div>`);
                }
            } else if (combatStyle === 'Diaries') {
                Object.keys(chunkInfo['diaries']).forEach((diary) => {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row ${diary.replaceAll(' ', '_').replaceAll("'", '')}'><span class='noscroll outer-diary-text'>${diary.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</div>`);
                    chunkInfo['diaries'][diary].split(', ').forEach((tier) => {
                        $(`.${combatStyle.replaceAll(' ', '_')}-body > .${diary.replaceAll(' ', '_').replaceAll("'", '')}`).append(`<div class='noscroll${(diaryProgress.hasOwnProperty(diary) && diaryProgress[diary].hasOwnProperty(tier)) ? (diaryProgress[diary][tier]['done'] ? ' complete' : ' incomplete') : ''}'><span class='noscroll diary-text internal-link' onclick="openQuestSteps('Diary', '~|${encodeForUrl(diary)}#XX${tier}|~')">${tier}</span>${(testMode || !(viewOnly || inEntry || locked)) && (diaryProgress.hasOwnProperty(diary) && diaryProgress[diary].hasOwnProperty(tier) && diaryProgress[diary][tier]['done']) ? `<span class='noscroll xp-button${(!assignedXpRewards.hasOwnProperty('Diary') || !assignedXpRewards['Diary'].hasOwnProperty(`~|${diary}#${tier}|~ Complete the ${tier} Diary`) || Object.keys(assignedXpRewards['Diary'][`~|${diary}#${tier}|~ Complete the ${tier} Diary`]).includes('None')) ? ' unset' : ''}' onclick="openXpRewardModalWithFormat('Diary', '~|${diary}#${tier}|~ Complete the ${tier} Diary')">xp</span>` : ''}</div>`);
                    });
                });
            } else if (combatStyle === 'Clues') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row row-header'><span class='noscroll tier-table-header'>Tier</span><span class='noscroll possible-table-header'>Possible Steps</span><span class='noscroll percent-table-header'>Completion Chance with <input type="number" class="noscroll clue-steps-input" value="${prevValueLevelInput['ClueSteps'] || 0}" /> Doable Steps</span></div>`);
                $('.clue-steps-input').on('input', function(e) {
                    if (e.target.value < 0) {
                        $(this).val(parseInt(prevValueLevelInput['ClueSteps']));
                    } else {
                        prevValueLevelInput['ClueSteps'] = e.target.value || 0;
                        $(`.${combatStyle.replaceAll(' ', '_')}-body .row:not(.row-header)`).remove();
                        clueTiers.forEach((tier) => {
                            let chance = 0;
                            let baseChance = (numClueTasksPossible[tier.toLowerCase()] / numClueTasks[tier.toLowerCase()]) || 0;
                            Object.keys(clueStepAmounts[tier]).forEach((numSteps) => {
                                if (parseInt(prevValueLevelInput['ClueSteps']) >= parseInt(numSteps)) {
                                    chance += clueStepAmounts[tier][numSteps];
                                } else {
                                    chance += Math.pow(baseChance, (parseInt(numSteps) - parseInt(prevValueLevelInput['ClueSteps']))) * clueStepAmounts[tier][numSteps];
                                }
                            });
                            $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll clue-tier'><img class='noscroll tier-icon' src='./resources/${tier}_clue.png' title='${tier}' />${tier} <span onclick="openClueChunks('${tier.toLowerCase()}')"><i class="clue-info-icon fas fa-info-circle"></i></span></span></span><span class='noscroll clue-possible'>${numClueTasksPossible[tier.toLowerCase()]} / ${numClueTasks[tier.toLowerCase()]} (${Math.round((baseChance * 100) * 100) / 100}%) <span onclick="openDoableClueSteps('${tier.toLowerCase()}')"><i class="clue-info-icon fas fa-info-circle"></i></span></span><span class='noscroll clue-percent'> ${(Math.round((chance * 100) * 100) / 100).toLocaleString(undefined, {minimumIntegerDigits: 2, minimumFractionDigits: 2})}%</span></div>`);
                        });
                    }
                });
                clueTiers.forEach((tier) => {
                    let chance = 0;
                    let baseChance = (numClueTasksPossible[tier.toLowerCase()] / numClueTasks[tier.toLowerCase()]) || 0;
                    Object.keys(clueStepAmounts[tier]).forEach((numSteps) => {
                        if (parseInt(prevValueLevelInput['ClueSteps']) >= parseInt(numSteps)) {
                            chance += clueStepAmounts[tier][numSteps];
                        } else {
                            chance += Math.pow(baseChance, parseInt(numSteps)) * clueStepAmounts[tier][numSteps];
                        }
                    });
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll clue-tier'><img class='noscroll tier-icon' src='./resources/${tier}_clue.png' title='${tier}' />${tier} <span onclick="openClueChunks('${tier.toLowerCase()}')"><i class="clue-info-icon fas fa-info-circle"></i></span></span></span><span class='noscroll clue-possible'>${numClueTasksPossible[tier.toLowerCase()]} / ${numClueTasks[tier.toLowerCase()]} (${Math.round((baseChance * 100) * 100) / 100}%) <span onclick="openDoableClueSteps('${tier.toLowerCase()}')"><i class="clue-info-icon fas fa-info-circle"></i></span></span><span class='noscroll clue-percent'> ${(Math.round((chance * 100) * 100) / 100).toLocaleString(undefined, {minimumIntegerDigits: 2, minimumFractionDigits: 2})}%</span></div>`);
                });
            } else if (combatStyle === 'Shooting Stars') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row row-header'><span class='noscroll region-table-header'>Region</span><span class='noscroll sites-table-header'>Possible Sites</span></div>`);
                let totalSites = 0;
                let totalPossibleSites = 0;
                !!starRegions && Object.keys(starRegions).forEach((region) => {
                    let possibleSites = starRegions[region];
                    let baseChance = (possibleSites / starRegionsPossible[region]) || 0;
                    totalSites += starRegionsPossible[region];
                    totalPossibleSites += possibleSites;
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll star-region'>${region}</span><span class='noscroll star-sites'>${possibleSites} / ${starRegionsPossible[region]} (${Math.round((baseChance * 100) * 100) / 100}%)</span></div>`);
                });
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row total'><span class='noscroll star-region'>Total</span><span class='noscroll star-sites'>${totalPossibleSites} / ${totalSites} (${Math.round((((totalPossibleSites / totalSites) || 0) * 100) * 100) / 100}%)</span></div>`);
            }
        });
        if (highestTab2 === undefined) {
            highestTab2 = combatStyles[0];
        }
        $('.style-body').hide();
        $(`.${highestTab2}-button`).addClass('active-tab');
        $(`.${highestTab2}-body`).show();
        $('#myModal12_2').show();
        modalOutsideTime = Date.now();
        document.getElementById('highest2-data').scrollTop = 0;
    }
}

// Changes what the quests are filtered by
let filterQuests = function(opt) {
    questFilterType = opt;
    openHighest2();
}

// Opens the add passive skill modal
let openPassiveModal = function(skill) {
    passiveSkillModalOpen = true;
    $('#passive-skill-input').val((!!passiveSkill && passiveSkill.hasOwnProperty(skill)) ? passiveSkill[skill] : 1);
    $('.passive-skill-name').text(skill);
    $('#passive-skill-data').html(`<div><div class="passive-skill-cancel" onclick="addPassiveSkill(true)">Cancel</div><div class="passive-skill-proceed disabled" onclick="addPassiveSkill(false, '${skill}')">Add Passive Levels</div></div>`);
    $('#myModal28').show();
    $('#passive-skill-input').focus();
}

// Triggers onchange of passive skill selection to validate submit button
let passiveLockedChange = function() {
    let val = $('#passive-skill-input').val();
    if (!!val && !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 120 && parseInt(val) % 1 === 0) {
        $('.passive-skill-proceed').removeClass('disabled');
    } else {
        $('.passive-skill-proceed').addClass('disabled');
    }
}

// Adds passive skill
let addPassiveSkill = function(close, skill) {
    if (close) {
        $('#myModal28').hide();
        passiveSkillModalOpen = false;
    } else {
        let level = !!$('#passive-skill-input').val() ? parseInt($('#passive-skill-input').val()) : NaN;
        if (!isNaN(level) && level >= 0 && level <= 120 && level % 1 === 0) {
            if (!passiveSkill) {
                passiveSkill = {};
            }
            passiveSkill[skill] = level;
            calcCurrentChallengesCanvas(true);
            setData();
            $('#myModal28').hide();
            passiveSkillModalOpen = false;
        }
    }
}

// Unlocks training Slayer
let unlockSlayer = function() {
    slayerLocked = null;
    setData();
    calcCurrentChallengesCanvas(true);
    openHighest2();
}

// Checks if slayer locked monster is unlocked
let checkSlayerLocked = function() {
    if (!!slayerLocked && !!slayerTasks && slayerTasks.hasOwnProperty(slayerLocked['monster'])) {
        !!slayerTasks[slayerLocked['monster']] && Object.keys(slayerTasks[slayerLocked['monster']]).forEach((monster) => {
            if (!!baseChunkData['monsters'] && baseChunkData['monsters'].hasOwnProperty(monster)) {
                unlockSlayer();
                return;
            }
        });
        /*if (slayerLocked['monster'] !== 'Manually Locked' && tempChunks.hasOwnProperty('unlocked') && tempChunks['unlocked'].hasOwnProperty('12342')) {
            wildySlayerChunks.forEach((chunk) => {
                if (tempChunks['unlocked'].hasOwnProperty(chunk) || possibleAreas.hasOwnProperty(chunk)) {
                    unlockSlayer();
                    return;
                }
            });
        }*/ // TEMP (no wilderness slayer master programmed)
    }
}

// Calculated doable vs assignable slayer tasks from all reachable slayer masters
let calculateSlayerTasks = function() {
    slayerTasksCalculated = true;
    let slayerMasterGetTasks = {
        'Turael/Spria': 'Receive a slayer assignment from ~|Turael|~',
        'Jacquelyn': 'Receive a slayer assignment from ~|Jacquelyn|~',
        'Vannaka': 'Receive a slayer assignment from ~|Vannaka|~',
        'Mazchna/Achtryn': 'Receive a slayer assignment from ~|Mazchna|~',
        'Chaeldar': 'Receive a slayer assignment from ~|Chaeldar|~',
        'Sumona': 'Receive a slayer assignment from ~|Sumona|~',
        'Duradel/Lapalok': 'Receive a slayer assignment from ~|Duradel|~',
        'Kuradal': 'Receive a slayer assignment from ~|Kuradal|~',
        'Morvran': 'Receive a slayer assignment from ~|Morvran|~',
        'Mandrith': 'Receive a slayer bounty from ~|Mandrith|~',
        'Laniakea': 'Receive a slayer assignment from ~|Laniakea|~'
    };
    $(`.Slayer-body .row, .Slayer-body .slayer-table-wrapper`).remove();
    $(`.Slayer-body`).append(`<div class='noscroll slayer-table-wrapper'></div>`);
    $(`.Slayer-body .slayer-table-wrapper`).append(`<div class='noscroll row row-header'><span class='noscroll master-table-header'>Slayer Master</span><span class='noscroll tasks-table-header'>Possible Tasks</span><span class='noscroll info-table-header'>Info</span></div>`);
    prevValueLevelInput['Combat'] = ((prevValueLevelInput['Combat'] || 3) > 138) ? 138 : (((prevValueLevelInput['Combat'] || 3) < 3) ? 3 : (prevValueLevelInput['Combat'] || 3));
    prevValueLevelInput['Slayer'] = ((prevValueLevelInput['Slayer'] || 1) > 120) ? 120 : (((prevValueLevelInput['Slayer'] || 1) < 1) ? 1 : (prevValueLevelInput['Slayer'] || 1));
    prevValueLevelInput['ignoreCombatLevel'] = $(`.ignore-combat-level-input`).is(":checked");
    prevValueLevelInput['krystiliaSlayerCreatures'] = $(`.krystilia-slayer-creatures-input`).is(":checked");
    $('.combat-level-input').val(prevValueLevelInput['Combat']);
    $('.slayer-level-input').val(prevValueLevelInput['Slayer']);
    assignableSlayerTasks = {};
    globalValids.hasOwnProperty('Slayer') && Object.keys(chunkInfo['slayerMasterTasks']).filter(master => { return baseChunkData.hasOwnProperty('npcs') && baseChunkData['npcs'].hasOwnProperty(master.split('/')[0]) && globalValids['Slayer'].hasOwnProperty(slayerMasterGetTasks[master]) }).forEach((master) => {
        let doableWeight = 0;
        let assignableWeight = 0;
        if (!assignableSlayerTasks[master]) {
            assignableSlayerTasks[master] = {};
        }
        Object.keys(chunkInfo['slayerMasterTasks'][master]).forEach((monster) => {
            let monsterDetails = chunkInfo['slayerMasterTasks'][master][monster];
            let isDoable = true;
            let isAssignable = true;
            if (!$(`.ignore-combat-level-input`).is(":checked") && monsterDetails.hasOwnProperty('CombatLevel') && prevValueLevelInput['Combat'] < monsterDetails['CombatLevel']) {
                isAssignable = false;
            }
            if (monsterDetails.hasOwnProperty('Level') && prevValueLevelInput['Slayer'] < monsterDetails['Level']) {
                isAssignable = false;
            }
            if (!$(`.krystilia-slayer-creatures-input`).is(":checked") && monsterDetails.hasOwnProperty('KrystiliaSlayerCreatures')) {
                isAssignable = false;
            }
            monsterDetails.hasOwnProperty('Tasks') && Object.keys(monsterDetails['Tasks']).filter(task => { return monsterDetails['Tasks'][task] === 'Quest' && task !== '~|Song of the Elves|~ Complete the quest' }).forEach((task) => {
                if (task.includes('Complete the quest') && questProgress[task.split('|')[1]] !== 'Complete the quest') {
                    isAssignable = false;
                } else if (!task.includes('Complete the quest') && questProgress[task.split('|')[1]] !== 'Complete the quest') {
                    let tempValid = false;
                    !!questProgress[task.split('|')[1]] && questProgress[task.split('|')[1]].forEach((step) => {
                        if (task === step) {
                            tempValid = true;
                        }
                    });
                    if (!tempValid) {
                        isAssignable = false;
                    }
                }
            });
            monsterDetails.hasOwnProperty('Skills') && Object.keys(monsterDetails['Skills']).forEach((skill) => {
                if (!(!!highestOverall[skill] && ((globalValids[skill].hasOwnProperty(highestOverall[skill].split('{')[0]) && globalValids[skill][highestOverall[skill].split('{')[0]] >= monsterDetails['Skills'][skill]) || (chunkInfo['challenges'][skill].hasOwnProperty(highestOverall[skill].split('{')[0]) && chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]]['Level'] >= monsterDetails['Skills'][skill])))) {
                    isAssignable = false;
                }
            });
            if (isAssignable) {
                assignableWeight += monsterDetails['Weight'];

                let tempDoable = false;
                slayerTasks.hasOwnProperty(monster.split(' - ')[0]) && Object.keys(slayerTasks[monster.split(' - ')[0]]).forEach((subMonster) => {
                    if (baseChunkData.hasOwnProperty('monsters') && baseChunkData['monsters'].hasOwnProperty(subMonster)) {
                        tempDoable = true;
                    }
                });
                if (!tempDoable) {
                    isDoable = false;
                }
                monsterDetails.hasOwnProperty('Chunks') && monsterDetails['Chunks'].forEach((chunkId) => {
                    if (chunkId.includes('[+]') && (!chunksPlus[chunkId] || chunksPlus[chunkId].filter((plus) => { return savedChunks.hasOwnProperty(plus) }).length === 0)) {
                        isDoable = false;
                    } else if (!chunkId.includes('[+]') && !savedChunks.hasOwnProperty(chunkId)) {
                        isDoable = false;
                    }
                });

                monsterDetails.hasOwnProperty('Tasks') && Object.keys(monsterDetails['Tasks']).filter(task => { return monsterDetails['Tasks'][task] !== 'Quest' || task === '~|Song of the Elves|~ Complete the quest' }).forEach((task) => {
                    if (!globalValids.hasOwnProperty(monsterDetails['Tasks'][task]) || !globalValids[monsterDetails['Tasks'][task]].hasOwnProperty(task)) {
                        isDoable = false;
                    }
                });

                if (isDoable) {
                    doableWeight += monsterDetails['Weight'];
                    assignableSlayerTasks[master][monster] = true;
                } else {
                    assignableSlayerTasks[master][monster] = false;
                }
            } else {
                assignableSlayerTasks[master][monster] = null;
            }
        });
        $(`.Slayer-body .slayer-table-wrapper`).append(`<div class='noscroll row'><span class='noscroll slayer-master'>${master}</span><span class='noscroll slayer-task'>${Object.values(assignableSlayerTasks[master]).filter(el => { return el }).length} / ${Object.values(assignableSlayerTasks[master]).filter(el => { return el !== null }).length} (${(Math.round(((doableWeight/assignableWeight) * 100) * 100) / 100) || 0}% weighted)</span><span class='noscroll slayer-info'><span onclick="openSlayerMasterInfo('${master}')"><i class="slayer-info-icon fas fa-info-circle"></i></span></span></div>`);
    });
    setData();
}

// Shows specific task info on the given slayer master
let openSlayerMasterInfo = function(master) {
    slayerMasterInfoModalOpen = true;
    $('.slayermasterinfo-data').empty();
    $('.slayermasterinfo-title').text(master);
    Object.keys(assignableSlayerTasks[master]).forEach((monster) => {
        if (monster.includes(' - ')) {
            $('.slayermasterinfo-data').append(`<div class="noscroll results ${assignableSlayerTasks[master][monster]}"><a class='noscroll link' href='https://runescape.wiki/w/Slayer_task/${monster.split(' - ')[0]}' target='_blank'>${monster.split(' - ')[0]}</a> - <a class='noscroll link' href="https://runescape.wiki/w/${encodeForUrl(monster.split(' - ')[1])}" target='_blank'>${monster.split(' - ')[1]}</a></div>`);
        } else {
            $('.slayermasterinfo-data').append(`<div class="noscroll results ${assignableSlayerTasks[master][monster]}"><a class='noscroll link' href='https://runescape.wiki/w/${monster}_(Slayer_assignment)' target='_blank'>${monster}</a></div>`);
        }
    });
    $('#myModal32').show();
    document.getElementById('slayermasterinfo-data').scrollTop = 0;
}

// Shows any doable clue steps of the given tier
let openDoableClueSteps = function(tier) {
    doableClueStepsModalOpen = true;
    $('.doablecluesteps-data').empty();
    $('.doablecluesteps-title').text(tier.charAt(0).toUpperCase() + tier.slice(1) + ' Clue Steps:');
    $('.doablecluesteps-subtitle').html(`<a class='noscroll link' href='https://runescape.wiki/w/Treasure_Trails/Full_guide/${tier.charAt(0).toUpperCase() + tier.slice(1)}' target='_blank'>Wiki</a>`);
    possibleClueTasks[tier].forEach((step) => {
        if (step.includes('http')) {
            $('.doablecluesteps-data').append(`<div class="noscroll results ${step.replaceAll(' ', '-')}"><img src="${step}" /></div>`);
        } else {
            $('.doablecluesteps-data').append(`<div class="noscroll results ${step.replaceAll(' ', '-')}">${step}</div>`);
        }
    });
    if (possibleClueTasks[tier].length === 0) {
        $('.doablecluesteps-data').append(`<div class="noscroll no-results">No doable steps</div>`);
    }
    $('#myModal33').show();
    document.getElementById('doablecluesteps-data').scrollTop = 0;
}

// Shows all chunks needed for the given clue tier
let openClueChunks = function(tier) {
    clueChunksModalOpen = true;
    $('.cluechunks-data').empty();
    $('.cluechunks-title').text(tier.charAt(0).toUpperCase() + tier.slice(1) + ' Chunks:');
    let unlocked = { ...possibleAreas };
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).forEach((chunkId) => {
        unlocked[parseInt(chunkId)] = true;
    });
    let doableChunks = 0;
    Object.keys(chunkInfo['clues'][tier]).forEach((chunkId) => {
        let chunkName = chunkId;
        let aboveground = false;
        !!chunkInfo['chunks'][chunkName] && !!chunkInfo['chunks'][chunkName]['Nickname'] && (aboveground = true);
        if (aboveground) {
            questChunks.push(chunkName);
            chunkName = chunkInfo['chunks'][chunkName]['Nickname'] + ' (' + chunkName + ')';
        }
        if (unlocked.hasOwnProperty(chunkId)) {
            doableChunks++;
            $('.cluechunks-data').append(`<div class="noscroll results ${chunkId.replaceAll(' ', '-')} doable">${chunkName}</div>`);
        } else {
            $('.cluechunks-data').append(`<div class="noscroll results ${chunkId.replaceAll(' ', '-')}">${chunkName}</div>`);
        }
    });
    $('.cluechunks-subtitle').text('(' + doableChunks + '/' + Object.keys(chunkInfo['clues'][tier]).length + ')');
    $('#myModal34').show();
    document.getElementById('cluechunks-data').scrollTop = 0;
}

// Opens the add equipment modal
let addEquipment = function() {
    addEquipmentModalOpen = true;
    $('#myModal15').show();
    modalOutsideTime = Date.now();
    $('#searchAddEquipment').val('').focus();
    searchAddEquipment();
}

// Searches for matching names within equipment data
let searchAddEquipment = function() {
    let searchTemp = $('#searchAddEquipment').val().toLowerCase();
    $('.add-equipment-data').empty();
    if ((Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) || filterByCheckedEquipment) {
        Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedEquipment || !!manualEquipment[item])).length > 0 && Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedEquipment || !!manualEquipment[item])).sort().forEach((item) => {
            $('.add-equipment-data').append(`<div class="search-equipment-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualEquipment && !!manualEquipment[item.replaceAll(/~/g, '').replaceAll(/\|/g, '')] && "checked"} type="checkbox" onclick="addManualEquipment('` + encodeRFC5987ValueChars(item).replaceAll(/~/g, '').replaceAll(/\|/g, '') + `')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(item.replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
    } else if (Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0) {
        $('.add-equipment-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.add-equipment-data').children().length === 0) {
        $('.add-equipment-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering of equipment by checked-only
let changeEquipmentFilterBy = function() {
    filterByCheckedEquipment = !filterByCheckedEquipment;
    searchAddEquipment();
}

// Adds the given equipment to the manual list
let addManualEquipment = function(equip) {
    equip = decodeQueryParam(equip);
    if (!manualEquipment[equip]) {
        manualEquipment[equip] = true;
    } else {
        delete manualEquipment[equip];
    }
    setData();
    calcCurrentChallengesCanvas(true);
}

// Opens the backlog sources modal
let backlogSources = function() {
    backlogSourcesModalOpen = true;
    $('#myModal17').show();
    modalOutsideTime = Date.now();
    $('#searchBacklogSources').val('').focus();
    searchBacklogSources();
}

// Searches for matching names within sources
let searchBacklogSources = function() {
    let searchTemp = $('#searchBacklogSources').val().toLowerCase();
    $('.backlog-sources-data').empty();
    let localChunkData = {...baseChunkData};
    !!backloggedSources && Object.keys(backloggedSources).forEach((category) => {
        localChunkData[category] = {...localChunkData[category], ...backloggedSources[category]};
    });
    if ((Object.keys(localChunkData).length > 0 && Object.keys(localChunkData['items']).filter(item => !item.includes('^') && item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['monsters']).filter(monster => !monster.includes('^') && monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['npcs']).filter(npc => !npc.includes('^') && npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['objects']).filter(object => !object.includes('^') && object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['shops']).filter(shop => !shop.includes('^') && shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length <= 200) || filterByCheckedSources) {
        let tempValid = false;
        Object.keys(localChunkData['items']).filter(item => !item.includes('^') && item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['items'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-items noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(localChunkData['items']).filter(item => !item.includes('^') && item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['items'] && !!backloggedSources['items'][item]))).length > 0 && Object.keys(localChunkData['items']).filter(item => !item.includes('^') && item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['items'] && !!backloggedSources['items'][item]))).sort().forEach((item) => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['items'] && !!backloggedSources['items'][item] && "checked"} type="checkbox" onclick="backlogManualSource('items' , '${encodeRFC5987ValueChars(item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, ''))}')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(item.replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-items').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['monsters']).filter(monster => !monster.includes('^') && monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['monsters'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-monsters noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(localChunkData['monsters']).filter(monster => !monster.includes('^') && monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['monsters'] && !!backloggedSources['monsters'][monster]))).length > 0 && Object.keys(localChunkData['monsters']).filter(monster => !monster.includes('^') && monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['monsters'] && !!backloggedSources['monsters'][monster]))).sort().forEach((monster) => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['monsters'] && !!backloggedSources['monsters'][monster] && "checked"} type="checkbox" onclick="backlogManualSource('monsters' , '${encodeRFC5987ValueChars(monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, ''))}')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(monster.replace(/[!'()*]/g, escape))}' target='_blank'>${monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-monsters').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['npcs']).filter(npc => !npc.includes('^') && npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['npcs'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-npcs noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(localChunkData['npcs']).filter(npc => !npc.includes('^') && npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['npcs'] && !!backloggedSources['npcs'][npc]))).length > 0 && Object.keys(localChunkData['npcs']).filter(npc => !npc.includes('^') && npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['npcs'] && !!backloggedSources['npcs'][npc]))).sort().forEach((npc) => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['npcs'] && !!backloggedSources['npcs'][npc] && "checked"} type="checkbox" onclick="backlogManualSource('npcs' , '${encodeRFC5987ValueChars(npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, ''))}')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(npc.replace(/[!'()*]/g, escape))}' target='_blank'>${npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-npcs').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['objects']).filter(object => !object.includes('^') && object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['objects'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-objects noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(localChunkData['objects']).filter(object => !object.includes('^') && object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['objects'] && !!backloggedSources['objects'][object]))).length > 0 && Object.keys(localChunkData['objects']).filter(object => !object.includes('^') && object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['objects'] && !!backloggedSources['objects'][object]))).sort().forEach((object) => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['objects'] && !!backloggedSources['objects'][object] && "checked"} type="checkbox" onclick="backlogManualSource('objects' , '${encodeRFC5987ValueChars(object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, ''))}')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeURI(object.replace(/[!'()*]/g, escape))}' target='_blank'>${object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-objects').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['shops']).filter(shop => !shop.includes('^') && shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['shops'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-shops noscroll"><b class="noscroll">Shops</b></div>`);
        Object.keys(localChunkData['shops']).filter(shop => !shop.includes('^') && shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['shops'] && !!backloggedSources['shops'][shop]))).length > 0 && Object.keys(localChunkData['shops']).filter(shop => !shop.includes('^') && shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['shops'] && !!backloggedSources['shops'][shop]))).sort().forEach((shop) => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['shops'] && !!backloggedSources['shops'][shop] && "checked"} type="checkbox" onclick="backlogManualSource('shops' , '${encodeRFC5987ValueChars(shop.replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\*/g, ''))}')" /><a class='noscroll' href='${"https://runescape.wiki/w/" + encodeForUrl(shop.replace(/[!'()*]/g, escape))}' target='_blank'>${shop.replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-shops').remove();
        }
    } else if (Object.keys(localChunkData).length > 0) {
        $('.backlog-sources-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(localChunkData['items']).filter(item => item.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['monsters']).filter(monster => monster.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['npcs']).filter(npc => npc.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['objects']).filter(object => object.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['shops']).filter(shop => shop.replaceAll(/~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.backlog-sources-data').children().length === 0) {
        $('.backlog-sources-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering of sources by checked-only
let changeSourcesFilterBy = function() {
    filterByCheckedSources = !filterByCheckedSources;
    searchBacklogSources();
}

// Backlogs the given source
let backlogManualSource = function(category, source) {
    source = decodeQueryParam(source).replaceAll('_', ' ');
    if (!backloggedSources[category]) {
        backloggedSources[category] = {};
    }
    if (!backloggedSources[category][source]) {
        backloggedSources[category][source] = true;
    } else {
        delete backloggedSources[category][source];
        if (!backloggedSources[category]) {
            delete backloggedSources[category];
        }
    }
    setData();
    calcCurrentChallengesCanvas(true);
    let backlogArr = setupBacklogArr();
    $('.panel-backlog').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
    $('.panel-backlog > i').css('line-height', '');
    (testMode || !(viewOnly || inEntry || locked)) && $('.panel-backlog').append(`<div class='noscroll backlogSources-container'><span class='noscroll backlogSources' onclick='backlogSources()'><i class="fas fa-archive"></i>Backlog Sources</span></div>`);
    $('.panel-backlog').append(...backlogArr);
}

// Opens the sticker menu
let openStickers = function(id) {
    if (signedIn || testMode) {
        stickerModalOpen = true;
        $('.sticker-data').empty();
        $('#myModal16').show();
        modalOutsideTime = Date.now();
        document.getElementById('sticker-data').scrollTop = 0;
        let chunkNickname = chunkInfo['chunks'].hasOwnProperty(id) ? chunkInfo['chunks'][id]['Nickname'] + ' ' : '';
        $('.sticker-chunk').text(chunkNickname + '(' + id + ')');
        $('#sticker-notes-data > textarea').val(stickeredNotes[id]);
        $('.sticker-color-picker').val(stickeredColors[id] || settings['defaultStickerColor']);
        stickerChoices.forEach((sticker) => {
            let stickerName = sticker.split('-alt').join('').split('-').join(' ');
            if (sticker !== 'unset') {
                $('.sticker-data').append(`<span style='color:${$('.sticker-color-picker').val()}' class='noscroll sticker-option-container color-sticker${$('.sticker-color-picker').val() !== '#000000' ? ' black-outline' : ''} ${sticker}-tag' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')"><i class="noscroll fas fa-${sticker}" style="transform: scaleX(-1)"></i></span>`);
            } else {
                $('.sticker-data').append(`<span class='noscroll sticker-option-container black-outline unset-option' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')"><i class="noscroll fas fa-ban" style="transform: scaleX(-1)"></i></span>`);
            }
        });
        $('.sticker-data').append(`<div class='noscroll sticker-data-subheader'>OSRS Stickers</div>`);
        stickerChoicesRS3.forEach((sticker) => {
            let stickerName = sticker.split('-').join(' ');
            $('.sticker-data').append(`<span class='noscroll sticker-option-container ${sticker}-tag' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')"><img class="noscroll" src="./resources/SVG/${sticker}-osrs.svg"></span>`);
        });
        $('.sticker-data').append(`<div class='noscroll sticker-data-subheader'>Number stickers</div>`);
        stickerChoicesNumbers.forEach((sticker) => {
            let stickerName = sticker;
            $('.sticker-data').append(`<span style='color:${$('.sticker-color-picker').val()}' class='noscroll sticker-option-container color-sticker${$('.sticker-color-picker').val() !== '#000000' ? ' black-outline' : ''} ${sticker}-tag' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')">${numberStickers[sticker]}</span>`);
        });
        savedStickerId = id;
        if (stickered.hasOwnProperty(id)) {
            $(`.sticker-data > .sticker-option-container.${stickered[id]}-tag`).addClass('selected-sticker');
            savedStickerSticker = stickered[id];
        } else {
            savedStickerSticker = 'unset';
        }
    }
}

// Submits the sticker modal
let submitSticker = function() {
    let id = savedStickerId;
    let sticker = savedStickerSticker;
    if (sticker !== 'unset') {
        if (sticker === '1st') {
            stickered[id] = 'flag';
            stickeredNotes[id] = 'Starting Chunk';
            stickeredColors[id] = '#00FF00';
        } else {
            stickered[id] = sticker;
            stickeredNotes[id] = $('#sticker-notes-data > textarea').val();
            stickeredColors[id] = $('.sticker-color-picker').val();
        }
    } else if (!!id && id.length > 0) {
        delete stickered[id];
        delete stickeredNotes[id];
        delete stickeredColors[id];
    }
    tempChunks = {
        ...tempChunks,
        stickered: stickered,
        stickeredNotes: stickeredNotes,
        stickeredColors: stickeredColors
    };
    setData();
    closeSticker();
}

// Sets the given sticker on the given chunk
let setSticker = function(id, sticker) {
    savedStickerId = id;
    savedStickerSticker = sticker;
    $('.selected-sticker').removeClass('selected-sticker');
    if (sticker !== 'unset') {
        $(`.sticker-data > .sticker-option-container.${sticker}-tag`).addClass('selected-sticker');
    }
}

// Changes the sticker options color
let changeCurrentStickerColor = function() {
    $('.sticker-option-container:not(.unset-option)').css('color', $('.sticker-color-picker').val());
    if ($('.sticker-color-picker').val() !== '#000000') {
        $('.sticker-option-container.color-sticker').addClass('black-outline');
    } else {
        $('.sticker-option-container.color-sticker').removeClass('black-outline');
    }
}

// Encode string for urls
let encodeForUrl = function(str) {
    return (encodeURIComponent(str).replace(/['()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`).replace(/%(7C|60|5E)/g, (str, hex) => String.fromCharCode(parseInt(hex, 16))).replaceAll('%25', '%'));
}

// Encode string
let encodeRFC5987ValueChars = function(str, forFirebase) {
    let percentReplace = forFirebase ? '-_-' : '%';
    return (encodeURIComponent(str.replaceAll(/\./g, '%2E').replaceAll(/#/g, '%2F').replaceAll(/\//g, '%2G')).replace(/['()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`).replace(/%(7C|60|5E)/g, (str, hex) => String.fromCharCode(parseInt(hex, 16))).replaceAll('%25', '%')).replaceAll(/%/g, percentReplace);
}

// Decode string
let decodeQueryParam = function(str) {
    return decodeURIComponent(str.replaceAll('-_-', '%').replaceAll('%25', '%').replaceAll(/%2E/g, '.').replaceAll(/%2F/g, '#').replaceAll(/%2G/g, '/').replaceAll(/%2H/g, "'").replaceAll(/-2H/g, "'").replaceAll(/%2I/g, ',').replaceAll(/%2J/g, '+').replaceAll(/%2Q/g, '!').replace(/%(?![0-9a-zA-Z][0-9a-zA-Z]+)/g, '%25')).replaceAll(/%2E/g, '.').replaceAll(/%2F/g, '#').replaceAll(/%2G/g, '/').replaceAll(/%2H/g, "'").replaceAll(/-2H/g, "'").replaceAll(/%2I/g, ',').replaceAll(/%2J/g, '+').replaceAll(/%2Q/g, '!');
}

// Encode object
let encodeObject = function(obj, forFirebase) {
    if (!obj) return obj;
    if (typeof obj === 'boolean') {
        return obj;
    }
    if (typeof obj === 'string') {
        return encodeRFC5987ValueChars(obj, forFirebase);
    }
    let outputObj;
    if (Array.isArray(obj)) {
        outputObj = [];
        !!obj && obj.forEach((el) => {
            if (typeof el === 'object') {
                outputObj.push(encodeObject(el), forFirebase);
            } else if (typeof el === 'string') {
                outputObj.push(encodeRFC5987ValueChars(el, forFirebase));
            } else {
                outputObj.push(el);
            }
        });
    } else {
        outputObj = {};
        let newKey;
        Object.keys(obj).forEach((key) => {
            if (typeof key === 'string') {
                newKey = encodeRFC5987ValueChars(key, forFirebase);
            } else {
                newKey = key;
            }
            if (!isNaN(newKey)) {
                newKey = '*fb*_' + newKey;
            }
            if (typeof obj[key] === 'object') {
                outputObj[newKey] = encodeObject(obj[key], forFirebase);
            } else if (typeof obj[key] === 'string') {
                outputObj[newKey] = encodeRFC5987ValueChars(obj[key], forFirebase);
            } else {
                outputObj[newKey] = obj[key];
            }
        });
    }
    return outputObj;
}

// Decode object
let decodeObject = function(obj) {
    if (!obj) return obj;
    if (typeof obj === 'boolean') {
        return obj;
    }
    if (typeof obj === 'string') {
        return decodeQueryParam(obj);
    }
    let outputObj;
    if (Array.isArray(obj)) {
        outputObj = [];
        !!obj && obj.forEach((el) => {
            if (typeof el === 'object') {
                outputObj.push(decodeObject(el));
            } else if (typeof el === 'string') {
                outputObj.push(decodeQueryParam(el));
            } else {
                outputObj.push(el);
            }
        });
    } else {
        outputObj = {};
        let newKey;
        Object.keys(obj).forEach((key) => {
            if (typeof key === 'string') {
                newKey = decodeQueryParam(key);
            } else {
                newKey = key;
            }
            if (newKey.includes('*fb*_')) {
                newKey = newKey.split('*fb*_')[1];
            }
            if (typeof obj[key] === 'object') {
                outputObj[newKey] = decodeObject(obj[key]);
            } else if (typeof obj[key] === 'string') {
                outputObj[newKey] = decodeQueryParam(obj[key]);
            } else {
                outputObj[newKey] = obj[key];
            }
        });
    }
    return outputObj;
}

// Opens the methods modal
let viewPrimaryMethodsOrTasks = function(skill, showTasks) {
    methodsModalOpen = true;
    $('.methods-data').empty();
    if (showTasks) {
        let completedNum = checkedAllTasks.hasOwnProperty(skill) ? Math.min(Object.keys(checkedAllTasks[skill]).filter(task => globalValids[skill].hasOwnProperty(task) && (!backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task))).length, Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length) : 0;
        $('.methods-topbar').html(`${skill} Tasks <span class='noscroll ${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length > completedNum ? 'yellow' : 'green'}'>(${completedNum}/${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length})</span><i class="manual-close pic fas fa-times noscrollhard" onclick="closeMethods()"></i>`);
        !!globalValids[skill] && Object.keys(globalValids[skill]).sort(function(a, b) { return globalValids[skill][a] - globalValids[skill][b] }).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).forEach((task) => {
            $('.methods-data').append(`<div class='noscroll skill-method'><span><input class="noscroll" ${checkedAllTasks[skill] && checkedAllTasks[skill][task] && "checked"} ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''} type="checkbox" onclick="checkOffAllTask('${skill}', '${encodeRFC5987ValueChars(task)}')" /></span><span>[${globalValids[skill][task]}]: ${task.includes('~') ? `${task.replaceAll('*', '').split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((task.replaceAll('*', '').split('|')[1]))}" target="_blank">${task.replaceAll('*', '').split('~')[1].split('|').join('')}</a>${task.replaceAll('*', '').split('~')[2]}` : `${task.replaceAll('~', '').replaceAll('|', '').replaceAll('*', '')}`} ${chunkInfo['challenges'][skill].hasOwnProperty(task) ? `<span class='noscroll details-info' onclick="showDetails('${encodeRFC5987ValueChars(task)}', '${skill}', '')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span></span>` : ''}</div>`);
        });
    } else {
        $('.methods-topbar').html(`<i class="manual-close pic fas fa-times noscrollhard" onclick="closeMethods()"></i>`);
        let methods = checkPrimaryMethod(skill, globalValids, baseChunkData, true);
        Object.keys(methods).sort(function(a, b) { return methods[a] - methods[b] }).forEach((method) => {
            $('.methods-data').append(`<div class='noscroll skill-method'><span>[${methods[method]}]: ${method.includes('~') ? `${method.replaceAll('*', '').split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((method.replaceAll('*', '').split('|')[1]))}" target="_blank">${method.replaceAll('*', '').split('~')[1].split('|').join('')}</a>${method.replaceAll('*', '').split('~')[2]}` : `${method.replaceAll('~', '').replaceAll('|', '').replaceAll('*', '')}`} ${chunkInfo['challenges'][skill].hasOwnProperty(method) ? `<span class='noscroll details-info' onclick="showDetails('${encodeRFC5987ValueChars(method)}', '${skill}', '')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span></span>` : ''}</div>`);
        });
    }
    $('#myModal13').show();
    modalOutsideTime = Date.now();
    document.getElementById('methods-data').scrollTop = 0;
}

// Checks off the given task from the all tasks list
let checkOffAllTask = function(skill, task) {
    task = decodeQueryParam(task);
    if (!checkedAllTasks[skill]) {
        checkedAllTasks[skill] = {};
    }
    if (checkedAllTasks[skill][task]) {
        delete checkedAllTasks[skill][task];
        if (Object.keys(checkedAllTasks[skill]).length === 0) {
            delete checkedAllTasks[skill];
        }
    } else {
        checkedAllTasks[skill][task] = true;
    }
    let completedNum = checkedAllTasks.hasOwnProperty(skill) ? Math.min(Object.keys(checkedAllTasks[skill]).filter(task => globalValids[skill].hasOwnProperty(task) && (!backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task))).length, Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length) : 0;
    $('.methods-topbar').html(`${skill} Tasks <span class='noscroll ${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length > completedNum ? 'yellow' : 'green'}'>(${completedNum}/${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length})</span><i class="manual-close pic fas fa-times noscrollhard" onclick="closeMethods()"></i>`);
    $(`.${skill}-tasks-button`).removeClass('yellow green').addClass(Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length > completedNum ? 'yellow' : 'green');
    $(`.${skill}-tasks-button > span`).html(`(${completedNum}/${Object.keys(globalValids[skill]).filter(task => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(task)).length})`);
    setData();
}

// Switches Highest Tab
let switchHighestTab = function(tab) {
    highestTab = tab;
    $('.style-body').hide();
    $(`.style-button`).removeClass('active-tab');
    $(`.${tab}-button`).addClass('active-tab');
    $(`.${tab}-body`).show();
}

// Switches Highest Tab
let switchHighest2Tab = function(tab) {
    highestTab2 = tab;
    $('.style-body').hide();
    $(`.style-button`).removeClass('active-tab');
    $(`.${tab}-button`).addClass('active-tab');
    $(`.${tab}-body`).show();
    document.getElementById('highest2-data').scrollTop = 0;
}

// Closes the manual add tasks modal
let closeManualAdd = function() {
    manualModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal').hide();
}

// Closes the challenge details modal
let closeChallengeDetails = function() {
    detailsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal2').hide();
}

// Closes the challenge notes modal
let closeChallengeNotes = function() {
    notesModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal3').hide();
}

// Closes the rules modal
let closeRules = function() {
    rulesModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal4').hide();
}

// Closes the settings modal
let closeSettings = function() {
    settingsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal7').hide();
}

// Closes the random list modal
let closeRandomList = function() {
    randomListModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal8').hide();
}

// Closes the stats error modal
let closeStatsError = function() {
    statsErrorModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal9').hide();
}

// Closes the search modal
let closeSearch = function() {
    searchModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal10').hide();
}

// Closes the search details modal
let closeSearchDetails = function() {
    searchDetailsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal11').hide();
}

// Closes the highest modal
let closeHighest = function() {
    highestModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal12').hide();
}

// Closes the highest modal
let closeHighest2 = function() {
    highest2ModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal12_2').hide();
}

// Closes the methods modal
let closeMethods = function() {
    methodsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal13').hide();
}

// Closes the complete modal
let closeComplete = function() {
    completeModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal14').hide();
}

// Closes the clipboard modal
let closeClipboard = function() {
    clipboardModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal38').hide();
}

// Closes the add equipment modal
let closeAddEquipment = function() {
    addEquipmentModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal15').hide();
}

// Closes the sticker modal
let closeSticker = function() {
    stickerModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal16').hide();
}

// Closes the backlog sources modal
let closeBacklogSources = function() {
    backlogSourcesModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal17').hide();
}

// Closes the chunk history modal
let closeChunkHistory = function() {
    chunkHistoryModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal18').hide();
}

// Closes the challenge alts modal
let closeChallengeAlts = function() {
    challengeAltsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal19').hide();
}

// Closes the overlays modal
let closeOverlays = function() {
    overlaysModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal39').hide();
}

// Closes the outer add modal
let closeOuterAdd = function() {
    manualOuterModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal20').hide();
}

// Closes the monsters add modal
let closeMonstersAdd = function() {
    monsterModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal21').hide();
}

// Closes the quest steps modal
let closeQuestSteps = function() {
    questStepsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal25').hide();
}

// Closes the friends list modal
let closeFriendsList = function() {
    friendsListModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal26').hide();
}

// Closes the friends list add modal
let closeFriendsListAdd = function() {
    friendsAddModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal27').hide();
}

// Closes the manual areas modal
let closeManualAreas = function() {
    manualAreasModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal31').hide();
}

// Closes the chunk sections modal
let closeChunkSections = function() {
    chunkSectionsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal42').hide();
}

// Closes the chunk section picker modal
let saveChunkSectionPicker = function() {
    if ($('#save-chunk-section-picker-button').hasClass('disabled')) {
        return;
    }
    let needsUpdating = JSON.stringify(manualSections[sectionChunkId] || {}) !== JSON.stringify(selectedSections);
    chunkSectionPickerModalOpen = false;
    manualSections[sectionChunkId] = selectedSections;
    if (Object.keys(manualSections[sectionChunkId]).length === 0) {
        delete manualSections[sectionChunkId];
    }
    if (Object.keys(selectedSections).length === 0 && chunkSectionCalculateAfter) {
        Object.keys(chunkInfo['sections'][sectionChunkId]).forEach((sec) => {
            if (!unlockedSections[sectionChunkId]) {
                unlockedSections[sectionChunkId] = {};
            }
            unlockedSections[sectionChunkId][sec] = true;
        });
    }
    let manualSectionsModified = {};
    !!manualSections && Object.keys(manualSections).forEach((chunk) => {
        if (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(chunk)) {
            manualSectionsModified[chunk] = manualSections[chunk];
        }
    });
    unlockedSections = combineJSONs(unlockedSections, manualSectionsModified);
    unlockedSections = combineJSONs(unlockedSections, findConnectedSections((Object.keys(savedChunks).length > 0 ? savedChunks : {...tempChunks['unlocked'], ...manualAreas}) || {}, unlockedSections));
    modalOutsideTime = Date.now();
    $('#myModal43').hide();
    if (needsUpdating) {
        calcCurrentChallengesCanvas(true, chunkSectionCalculateAfter, false, JSON.parse(JSON.stringify(unlockedSections)));
        setData();
    }
}

// Closes the slayer master info modal
let closeSlayerMasterInfo = function() {
    slayerMasterInfoModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal32').hide();
}

// Closes the doable clue steps modal
let closeDoableClueSteps = function() {
    doableClueStepsModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal33').hide();
}

// Closes the clue chunks modal
let closeClueChunks = function() {
    clueChunksModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal34').hide();
}

// Closes the chunk notes modal
let closeChunkNotes = function() {
    notesOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal35').hide();
}

// Manually completes checked-off tasks
let submitCompleteTasks = function() {
    completeChallenges(true);
    completeModalOpen = false;
    modalOutsideTime = Date.now();
    $('#myModal14').hide();
}

// Unlocks various parts of the chunk tasks panel
let unlockChallenges = function() {
    if (workerOut === 0) {
        $('.panel-active span.burger, .panel-backlog span.burger, .panel-completed span.arrow').removeClass('hidden-burger');
        $('.panel-active label.checkbox, .panel-areas label.checkbox').removeClass('checkbox--disabled');
        $('.panel-active label.checkbox input, .panel-areas label.checkbox input').attr('disabled', false);
    }
    !(signedIn && testMode) && $(`.backlogSources-container`).remove();
    !(signedIn && testMode) && $('.panel-backlog').prepend(`<div class='noscroll backlogSources-container'><span class='noscroll backlogSources' onclick='backlogSources()'><i class="fas fa-archive"></i>Backlog Sources</span></div>`);
}

// Displays the current challenges, areas, backlog, and completed challenges
let setCurrentChallenges = function(backlogArr, completedArr, useOld, noClear) {
    if (useOld) {
        !noClear && (oldSavedChallengeArr.length > 0 || workerOut === 0) && $('.panel-active').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
        !noClear && (oldSavedChallengeArr.length > 0 || workerOut === 0) && $('.panel-active > i').css('line-height', '');
        (oldSavedChallengeArr.length > 0 || workerOut === 0) && $('.panel-active').append(...oldSavedChallengeArr);
        if ($('.panel-active .skill-challenge').length === 0) {
            $('.marker-skill').remove();
        }
        if ($('.panel-active .bis-challenge').length === 0) {
            $('.marker-bis').remove();
        }
        if ($('.panel-active .quest-challenge').length === 0) {
            $('.marker-quest').remove();
        }
        if ($('.panel-active .diary-challenge').length === 0) {
            $('.marker-diary').remove();
        }
        if ($('.panel-active .extra-challenge').length === 0) {
            $('.marker-extra').remove();
        }
        if ($('.panel-active').children().length === 0) {
            if (checkFalseRules()) {
                $('.panel-active').append('Please select your Chunk Rules.');
            } else {
                $('.panel-active').append('No cached chunk tasks.');
            }
        }
        $('.panel-active label.checkbox').addClass('checkbox--disabled');
        $('.panel-active span.checkbox__input > input').attr('disabled', true);
        $('.panel-active span.burger').addClass('hidden-burger');
        changeChallengeColor();
        setTaskNum();
    } else {
        !noClear && (challengeArr.length > 0 || workerOut === 0) && $('.panel-active').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
        noClear && (challengeArr.length > 0 || workerOut === 0) && $('.panel-active .marker, .panel-active .challenge').remove();
        !noClear && (challengeArr.length > 0 || workerOut === 0) && $('.panel-active > i').css('line-height', '');
        (challengeArr.length > 0 || workerOut === 0) && $('.panel-active').append(...challengeArr);
        if ($('.panel-active .skill-challenge').length === 0) {
            $('.marker-skill').remove();
        }
        if ($('.panel-active .bis-challenge').length === 0) {
            $('.marker-bis').remove();
        }
        if ($('.panel-active .quest-challenge').length === 0) {
            $('.marker-quest').remove();
        }
        if ($('.panel-active .diary-challenge').length === 0) {
            $('.marker-diary').remove();
        }
        if ($('.panel-active .extra-challenge').length === 0) {
            $('.marker-extra').remove();
        }
        if ($('.panel-active').children().length === 0) {
            if (checkFalseRules()) {
                $('.panel-active').append('Please select your Chunk Rules.');
            } else {
                $('.panel-active').append(`<span class="no-current">No current chunk tasks.</span>`);
            }
        }
        oldSavedChallengeArr = challengeArr;
        setData();
        setTaskNum();
        $('.panel-backlog').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
        $('.panel-backlog > i').css('line-height', '');
        (testMode || !(viewOnly || inEntry || locked)) && $('.panel-backlog').append(`<div class='noscroll backlogSources-container'><span class='noscroll backlogSources' onclick='backlogSources()'><i class="fas fa-archive"></i>Backlog Sources</span></div>`);
        $('.panel-backlog').append(...backlogArr);
        $('.panel-completed').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
        $('.panel-completed > i').css('line-height', '');
        $('.panel-completed').append(...completedArr);
    }
    toggleHiddenTasks(settings['hideChecked'] && actuallyHideChecked);
}

// Sets the updated number of active task checked-off
let setTaskNum = function() {
    let numChecked = 0;
    $('.panel-active input[type=checkbox]').each(function(index) {
        $(this).is(':checked') && (numChecked++);
    });
    let taskColor = settings['completedTaskColor'] ? settings['completedTaskColor'] : 'rgb(7, 173, 7)';
    $('#challengesactive .num-tasks').text(`(${!settings['numTasksPercent'] ? numChecked + '/' + $('.panel-active .challenge').length : (isNaN(Math.round((numChecked / $('.panel-active .challenge').length) * 100)) ? '100' : Math.round((numChecked / $('.panel-active .challenge').length) * 100)) + '%'})`);
    (numChecked === $('.panel-active .challenge').length) ? $('#challengesactive .num-tasks').css('color', taskColor) : $('#challengesactive .num-tasks').css('color', 'var(--colorTextAlt)');
}

// Check if all rules are off
let checkFalseRules = function() {
    let all_false = true;
    for (let s in taskGeneratingRules) {
        if (rules[s] === true) {
            all_false = false;
            break;
        }
    }
    return all_false;
}

// Firefox functionality for browser dimensions
function getBrowserDim() {
    if (window.innerHeight) {
        return { w: window.innerWidth, h: window.innerHeight };
    } else {
        return { w: document.body.clientWidth, h: document.body.clientHeight };
    }
}

// Opens the context menu for an active challenge
let openActiveContextMenu = function(challenge, skill) {
    activeContextMenuOpen = !activeContextMenuOpen;
    activeContextMenuOpenTime = Date.now();
    if (activeContextMenuChallengeOld !== challenge) {
        activeContextMenuChallenge = challenge;
        activeContextMenuSkill = skill;
        let dims = getBrowserDim();
        let x = event.pageX + $(".active-context-menu").width() + 5 > dims['w'] ? dims['w'] - $(".active-context-menu").width() - 5 : event.pageX - 5;
        let y = event.pageY + $(".active-context-menu").height() + 5 > dims['h'] ? dims['h'] - $(".active-context-menu").height() - 5 : event.pageY - 5;
        $(".active-context-menu").finish().toggle(100).css({
            top: y + "px",
            left: x + "px"
        });
    }
}

// Opens the context menu for a backlogged challenge
let openBacklogContextMenu = function(challenge, skill) {
    backlogContextMenuOpen = !backlogContextMenuOpen;
    if (backlogContextMenuChallengeOld !== challenge) {
        backlogContextMenuChallenge = challenge;
        backlogContextMenuSkill = skill;
        let dims = getBrowserDim();
        let x = event.pageX + $(".backlog-context-menu").width() + 5 > dims['w'] ? dims['w'] - $(".backlog-context-menu").width() - 5 : event.pageX - 5;
        let y = event.pageY + $(".backlog-context-menu").height() + 5 > dims['h'] ? dims['h'] - $(".backlog-context-menu").height() - 5 : event.pageY - 5;
        $(".backlog-context-menu").finish().toggle(100).css({
            top: y + "px",
            left: x + "px"
        });
    }
}

// Opens the context menu for filtering quests
let openQuestFilterContextMenu = function() {
    let dims = getBrowserDim();
    let x = event.pageX + $(".questfilter-context-menu").width() + 5 > dims['w'] ? dims['w'] - $(".questfilter-context-menu").width() - 5 : event.pageX - 5;
    let y = event.pageY + $(".questfilter-context-menu").height() + 5 > dims['h'] ? dims['h'] - $(".questfilter-context-menu").height() - 5 : event.pageY - 5;
    $(".questfilter-context-menu").finish().toggle(100).css({
        top: y + "px",
        left: x + "px"
    });
}

// Goes back to previous details window
let goBackDetails = function(type) {
    detailsStack.pop();
    let el = detailsStack.pop();
    showDetails(el[0], encodeRFC5987ValueChars(el[1]), type, detailsStack.length > 0);
}

// Shows challenge details
let showDetails = function(challenge, skill, dataType, isNested) {
    if (!activeContextMenuOpen && (Date.now() > activeContextMenuOpenTime + 10) && !inEntry && !importMenuOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        let baseChunkDataIn = dataType === 'future' ? futureChunkData : baseChunkData;
        let unlockedSectionsIn = dataType === 'future' ? futureUnlockedSections : unlockedSections;
        let chunksIn = JSON.parse(JSON.stringify(tempChunks['unlocked']));
        dataType === 'future' && (chunksIn[infoLockedId] = true);
        challenge = decodeQueryParam(challenge);
        if (!baseChunkDataIn || Object.keys(baseChunkDataIn).length === 0) {
            return;
        }
        searchDetailsModalOpen && closeSearchDetails();
        let detailsKeys = ['ItemsDetails', 'ObjectsDetails', 'MonstersDetails', 'NPCsDetails', 'ChunksDetails', 'Skill RequirementsDetails'];
        let skills = [...skillNames];
        skills.push('Nonskill');
        detailsModalOpen = true;
        $('#details-data').empty();
        if (!chunkInfo['challenges'].hasOwnProperty(skill)) {
            chunkInfo['challenges'][skill] = {};
        }
        if (!chunkInfo['challenges'][skill].hasOwnProperty(challenge)) {
            if (skill === 'BiS') {
                chunkInfo['challenges'][skill][challenge] = {
                    'ItemsDetails': [challenge.split('|')[1].charAt(0).toUpperCase() + challenge.split('|')[1].slice(1)],
                    'Label': skill
                }
            } else if (skill === 'Extra') {
                if (challenge.includes('Kill X')) {
                    chunkInfo['challenges'][skill][challenge] = {
                        'MonstersDetails': [challenge.split('|')[1].charAt(0).toUpperCase() + challenge.split('|')[1].slice(1)],
                        'Label': skill
                    }
                } else if (challenge.match(/.*: ~\|.*\|~ \(.*\)/g)) {
                    chunkInfo['challenges'][skill][challenge] = {
                        'ItemsDetails': [challenge.split('|')[1].charAt(0).toUpperCase() + challenge.split('|')[1].slice(1)],
                        'Label': skill
                    }
                }
            }
        }
        let challengeLabelLine = '';
        if (skillNames.includes(skill)) {
            challengeLabelLine = `[${chunkInfo['challenges'][skill][challenge]['Level']}] ${skill}: `;
        } else if (skill === 'BiS' || skill === 'Extra') {
            challengeLabelLine = `[${chunkInfo['challenges'][skill][challenge]['Label']}]: `;
        } else if (skill === 'Quest' || skill === 'Diary') {
            challengeLabelLine = `[${skill}]: `;
        }
        if (isNested) {
            $('.details-back').show().html(`<i class="fas fa-arrow-left noscrollhard" onclick="goBackDetails('` + dataType + `')"></i>`);
        } else {
            $('.details-back').hide();
        }
        if (!chunkInfo['challenges'][skill].hasOwnProperty(challenge)) {
            chunkInfo['challenges'][skill][challenge] = {};
        }
        $('#details-title').html(`<b class="noscroll">${challengeLabelLine}${challenge.split('~').length > 1 ? `${challenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((challenge.split('|')[1]))}" target="_blank">${challenge.split('~')[1].split('|').join('')}</a>${challenge.split('~')[2]}` : `${challenge.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}`}${chunkInfo['challenges'][skill][challenge].hasOwnProperty('InfoLink') ? ` (<a class='link external-info-link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(chunkInfo['challenges'][skill][challenge]['InfoLink'])}" target="_blank">Wiki <i class="fas fa-external-link-alt"></i></a>)` : ''}</b>`);
        chunkInfo['challenges'][skill][challenge].hasOwnProperty('Description') && $('#details-data').append(`<span class="details-subtitle noscroll"><i class="noscroll">${chunkInfo['challenges'][skill][challenge]['Description']}</i></span><br />`);
        detailsKeys.forEach((key) => {
            if (key === 'Skill RequirementsDetails' && skill !== 'Quest' && skill !== 'Diary') {
                return;
            }
            let type = key.split('Details')[0].toLowerCase();
            let written = false;
            $('#details-data').append(`<span class="details-subtitle noscroll"><u class="noscroll"><b class="noscroll">${type}</b></u></span><br />`);
            if ((!chunkInfo['challenges'][skill][challenge][key] || chunkInfo['challenges'][skill][challenge][key].length < 1) && !!chunkInfo['challenges'][skill][challenge][key.split('Details')[0]]) {
                if (!chunkInfo['challenges'][skill][challenge][key]) {
                    chunkInfo['challenges'][skill][challenge][key] = [];
                }
                chunkInfo['challenges'][skill][challenge][key.split('Details')[0]].forEach((typeEl) => {
                    if (typeEl.includes('[+]x')) {
                        chunkInfo['challenges'][skill][challenge][key].push(typeEl.split('[+]x')[0] + '[+]');
                    } else {
                        chunkInfo['challenges'][skill][challenge][key].push(typeEl);
                    }
                });
            }
            !!chunkInfo['challenges'][skill][challenge][key] && chunkInfo['challenges'][skill][challenge][key].forEach((el) => {
                let formattedSource = '';
                if (key === 'ChunksDetails') {
                    let els = [];
                    formattedSource = ': ';
                    if (!!chunkInfo['codeItems'][type + 'Plus'] && !!chunkInfo['codeItems'][type + 'Plus'][el]) {
                        let validElem = false;
                        chunkInfo['codeItems'][type + 'Plus'][el].forEach((elem) => {
                            if (chunksIn.hasOwnProperty(elem) || (elem.match(/[0-9]+/g) && chunksIn.hasOwnProperty(elem.match(/[0-9]+/g)[0]) && unlockedSectionsIn.hasOwnProperty(elem.match(/[0-9]+/g)[0]) && unlockedSectionsIn[elem.match(/[0-9]+/g)[0]][elem.match(/[0-9]+/g)[1]]) || possibleAreas.hasOwnProperty(elem)) {
                                els.push(elem);
                                validElem = true;
                            }
                        });
                        !validElem && els.push(el);
                        $('#details-data').append(`<span class="noscroll"><b class="noscroll">${chunkInfo['codeItems'][type + 'PlusNames'][el]}:</b></span></br />`);
                        let writtenPlus = false;
                        els.length > 0 && els.forEach((element) => {
                            if (possibleAreas[element]) {
                                written = true;
                                writtenPlus = true;
                                formattedSource = `<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(element.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, ''))}" target="_blank">${element.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}</a>`;
                                $('#details-data').append(`<span class="noscroll"><b class="noscroll"><span class='noscroll special'>-</span> ${formattedSource}</b></span><br />`);
                            } else if (!!element.match(/[0-9]+/g) && chunksIn.hasOwnProperty(element.match(/[0-9]+/g)[0]) && (!element.match(/[0-9]+-[0-9]+/g) || !unlockedSectionsIn.hasOwnProperty(element.match(/[0-9]+/g)[0]) || unlockedSectionsIn[element.match(/[0-9]+/g)[0]][element.match(/[0-9]+/g)[1]])) {
                                written = true;
                                writtenPlus = true;
                                let realName = element.match(/[0-9]+/g) ? element.match(/[0-9]+/g)[0] : element;
                                if (el.match(/[A-Za-z ]+\([0-9]+\)/g)) {
                                    realName = element;
                                } else if (element.match(/[0-9]+-[0-9]+/g)) {
                                    realName = chunkInfo['chunks'][element.match(/[0-9]+/g)[0]]['Nickname'] + '(' + element.match(/[0-9]+/g)[0] + ' - Section ' + element.split('-')[1] + ')';
                                } else if (element.match(/[0-9]+/g) && !!chunkInfo['chunks'][element.match(/[0-9]+/g)[0]]['Name']) {
                                    realName = chunkInfo['chunks'][element.match(/[0-9]+/g)[0]]['Name'];
                                } else if (element.match(/[0-9]+/g) && !!chunkInfo['chunks'][element.match(/[0-9]+/g)[0]]['Nickname']) {
                                    realName = chunkInfo['chunks'][element.match(/[0-9]+/g)[0]]['Nickname'] + '(' + element.match(/[0-9]+/g)[0] + ')';
                                }
                                formattedSource = realName.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '');
                                $('#details-data').append(`<span class="noscroll"><b class="noscroll"><span class='noscroll special'>-</span> ${formattedSource}</b></span><br />`);
                            }
                        });
                        if (!writtenPlus) {
                            written = true;
                            $('#details-data').append(`<span class="noscroll red"><b class="noscroll"><span class='noscroll special'>-</span> None</b></span><br />`);
                        }
                    } else {
                        if (possibleAreas[el]) {
                            written = true;
                            formattedSource = `<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(el.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, ''))}" target="_blank">${el.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}</a>`;
                            $('#details-data').append(`<span class="noscroll"><b class="noscroll">${formattedSource}</b></span><br />`);
                        } else if (!!el.match(/[0-9]+/g) && chunksIn.hasOwnProperty(el.match(/[0-9]+/g)[0]) && (!el.match(/[0-9]+-[0-9]+/g) || !unlockedSectionsIn.hasOwnProperty(el.match(/[0-9]+/g)[0]) || unlockedSectionsIn[el.match(/[0-9]+/g)[0]][el.match(/[0-9]+/g)[1]])) {
                            written = true;
                            let realName = el.match(/[0-9]+/g) ? el.match(/[0-9]+/g)[0] : el;
                            if (el.match(/[A-Za-z ]+\([0-9]+\)/g)) {
                                realName = el;
                            } else if (el.match(/[0-9]+-[0-9]+/g)) {
                                realName = chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Nickname'] + '(' + el.match(/[0-9]+/g)[0] + ' - Section ' + el.split('-')[1] + ')';
                            } else if (el.match(/[0-9]+/g) && !!chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Name']) {
                                realName = chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Name'];
                            } else if (el.match(/[0-9]+/g) && !!chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Nickname']) {
                                realName = chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Nickname'] + '(' + el.match(/[0-9]+/g)[0] + ')';
                            }
                            formattedSource = realName.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '');
                            $('#details-data').append(`<span class="noscroll"><b class="noscroll">${formattedSource}</b></span><br />`);
                        } else {
                            written = true;
                            let realName = el.match(/[0-9]+/g) ? el.match(/[0-9]+/g)[0] : el;
                            if (el.match(/[A-Za-z ]+\([0-9]+\)/g)) {
                                realName = el;
                            } else if (el.match(/[0-9]+-[0-9]+/g)) {
                                realName = chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Nickname'] + '(' + el.match(/[0-9]+/g)[0] + ' - Section ' + el.split('-')[1] + ')';
                            } else if (el.match(/[0-9]+/g) && !!chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Name']) {
                                realName = chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Name'];
                            } else if (el.match(/[0-9]+/g) && !!chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Nickname']) {
                                realName = chunkInfo['chunks'][el.match(/[0-9]+/g)[0]]['Nickname'] + '(' + el.match(/[0-9]+/g)[0] + ')';
                            }
                            $('#details-data').append(`<span class="noscroll red"><b class="noscroll">${realName}</b></span><br />`);
                        }
                    }
                } else if (key === 'Skill RequirementsDetails') {
                    written = true;
                    if (skill === 'Quest' || skill === 'Diary') {
                        formattedSource = el;
                        let skillReq = el.split(' ')[1];
                        let level = 0;
                        if (!!highestOverall[skillReq] && !!chunkInfo['challenges'][skillReq][highestOverall[skillReq].replaceAll(/\{[0-9]+\}/g, '')]) {
                            level = chunkInfo['challenges'][skillReq][highestOverall[skillReq].replaceAll(/\{[0-9]+\}/g, '')]['Level'];
                        }
                        if (level >= el.split(' ')[0]) {
                            $('#details-data').append(`<span class="noscroll"><b class="noscroll">${formattedSource}</b></span><br />`);
                        } else {
                            $('#details-data').append(`<span class="noscroll red"><b class="noscroll">${formattedSource}</b></span><br />`);
                        }
                    }
                } else if (!!baseChunkDataIn[type]) {
                    let els = [];
                    formattedSource = ': ';
                    if (!!chunkInfo['codeItems'][type + 'Plus'] && !!chunkInfo['codeItems'][type + 'Plus'][el]) {
                        let validElem = false;
                        chunkInfo['codeItems'][type + 'Plus'][el].forEach((elem) => {
                            if (!!baseChunkDataIn[type][elem]) {
                                els.push(elem);
                                validElem = true;
                            }
                        });
                        !validElem && els.push(el);
                        $('#details-data').append(`<span class="noscroll"><b class="noscroll">${chunkInfo['codeItems'][type + 'PlusNames'][el]}:</b></span></br />`);
                        let writtenPlus = false;
                        els.length > 0 && els.forEach((element) => {
                            formattedSource = ': ';
                            !!baseChunkDataIn[type][element] && Object.keys(baseChunkDataIn[type][element]).forEach((source) => {
                                if ((chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && chunkInfo['codeItems']['boostItems'][skill].hasOwnProperty(element)) || ((!chunkInfo['challenges'][skill][challenge].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][challenge]['NonShop'] || baseChunkDataIn[type][element][source] !== 'shop') && (rules['Wield Crafted Items'] || ![...combatSkills, 'BiS', 'Extra'].includes(skill) || chunkInfo['challenges'][skill][challenge]['Label'] === 'Fill Stashes' || (typeof baseChunkDataIn[type][element][source] !== 'string' || !processingSkill[baseChunkDataIn[type][element][source].split('-')[1]])))) {
                                    if (typeof baseChunkDataIn[type][element][source] === "boolean" || !skills.includes(baseChunkDataIn[type][element][source].split('-')[1])) {
                                        if (chunkInfo['chunks'].hasOwnProperty(source)) {
                                            let realName = source;
                                            if (!!chunkInfo['chunks'][source]['Name']) {
                                                realName = chunkInfo['chunks'][source]['Name'];
                                            } else if (!!chunkInfo['chunks'][source]['Nickname']) {
                                                realName = chunkInfo['chunks'][source]['Nickname'] + '(' + source + ')';
                                            }
                                            formattedSource += `<span class='noscroll ${typeof baseChunkDataIn[type][element][source] !== "boolean" && (baseChunkDataIn[type][element][source].includes('primary-') || baseChunkDataIn[type][element][source].includes('shop')) ? 'green' : ''}'>${realName.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}</span>`;
                                        } else {
                                            let shownSource = source;
                                            if (shownSource.includes('|')) {
                                                shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                                            }
                                            formattedSource += `<span class='noscroll ${typeof baseChunkDataIn[type][element][source] !== "boolean" && (baseChunkDataIn[type][element][source].includes('primary-') || baseChunkDataIn[type][element][source].includes('shop')) ? 'green' : ''}'><a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(shownSource.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, ''))}" target="_blank">${shownSource.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}</a></span>`;
                                        }
                                    }
                                    if (typeof baseChunkDataIn[type][element][source] !== "boolean" && skills.includes(baseChunkDataIn[type][element][source].split('-')[1])) {
                                        formattedSource += `<span class='noscroll ${baseChunkDataIn[type][element][source].includes('primary-') || baseChunkDataIn[type][element][source].includes('shop') ? 'green' : ''}'>${baseChunkDataIn[type][element][source].split('-')[1].replaceAll(/\*/g, '')}</span>`;
                                        formattedSource += ` <span class='noscroll ${baseChunkDataIn[type][element][source].includes('primary-') || baseChunkDataIn[type][element][source].includes('shop') ? 'green' : ''}'>(${source.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')})</span> <span onclick="showDetails('` + encodeRFC5987ValueChars(source) + `', '` + baseChunkDataIn[type][element][source].split('-')[1].replaceAll(/\*/g, '') + `', '` + dataType + `', true)"><i class="quest-icon fas fa-info-circle"></i></span>`;
                                    } else if (typeof baseChunkDataIn[type][element][source] !== "boolean" && !baseChunkDataIn[type][element][source].includes('primary') && !baseChunkDataIn[type][element][source].includes('secondary') && baseChunkDataIn[type][element][source] !== 'shop') {
                                        formattedSource += `<span class='noscroll ${baseChunkDataIn[type][element][source].includes('primary-') || baseChunkDataIn[type][element][source].includes('shop') ? 'green' : ''}'>-${baseChunkDataIn[type][element][source].replaceAll(/\*/g, '')}</span>`;
                                    } else if (typeof baseChunkDataIn[type][element][source] !== "boolean") {
                                        formattedSource += ` <span class='noscroll ${baseChunkDataIn[type][element][source].includes('primary-') || baseChunkDataIn[type][element][source].includes('shop') ? 'green' : ''}'>(${baseChunkDataIn[type][element][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}${dropRatesGlobal.hasOwnProperty(source) && dropRatesGlobal[source].hasOwnProperty(element) ? ', ' + dropRatesGlobal[source][element] : ''})</span>`;
                                    }
                                    formattedSource += ', ';
                                }
                            });
                            formattedSource = formattedSource.slice(0, -2);
                            if (!!baseChunkDataIn[type] && !!baseChunkDataIn[type][element] && Object.keys(baseChunkDataIn[type][element]).length > 10) {
                                formattedSource = `: <span class="noscroll tosearchdetails" onclick="openSearchDetails('${type}', '${encodeRFC5987ValueChars(element)}')"> Many sources (${Object.keys(baseChunkDataIn[type][element]).length})</span>`;
                            }
                            if (formattedSource !== '') {
                                written = true;
                                writtenPlus = true;
                                $('#details-data').append(`<span class="noscroll"><b class="noscroll"><span class='noscroll special'>-</span> ${element}</b></span><span class="noscroll">${formattedSource}</span><br />`);
                            }
                        });
                        if (!writtenPlus) {
                            written = true;
                            $('#details-data').append(`<span class="noscroll red"><b class="noscroll"><span class='noscroll special'>-</span> None</b></span><br />`);
                        }
                    } else {
                        !!baseChunkDataIn[type][el] && Object.keys(baseChunkDataIn[type][el]).forEach((source) => {
                            if ((chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && chunkInfo['codeItems']['boostItems'][skill].hasOwnProperty(el)) || ((!chunkInfo['challenges'][skill][challenge].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][challenge]['NonShop'] || baseChunkDataIn[type][el][source] !== 'shop') && (rules['Wield Crafted Items'] || ![...combatSkills, 'BiS', 'Extra'].includes(skill) || chunkInfo['challenges'][skill][challenge]['Label'] === 'Fill Stashes' || (typeof baseChunkDataIn[type][el][source] !== 'string' || !processingSkill[baseChunkDataIn[type][el][source].split('-')[1]])))) {
                                if (typeof baseChunkDataIn[type][el][source] === "boolean" || !skills.includes(baseChunkDataIn[type][el][source].split('-')[1])) {
                                    if (chunkInfo['chunks'].hasOwnProperty(source)) {
                                        let realName = source;
                                        if (!!chunkInfo['chunks'][source]['Name']) {
                                            realName = chunkInfo['chunks'][source]['Name'];
                                        } else if (!!chunkInfo['chunks'][source]['Nickname']) {
                                            realName = chunkInfo['chunks'][source]['Nickname'] + '(' + source + ')';
                                        }
                                        formattedSource += `<span class='noscroll ${typeof baseChunkDataIn[type][el][source] !== "boolean" && (baseChunkDataIn[type][el][source].includes('primary-') || baseChunkDataIn[type][el][source].includes('shop')) ? 'green' : ''}'>${realName.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}</span>`;
                                    } else {
                                        let shownSource = source;
                                        if (shownSource.includes('|')) {
                                            shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                                        }
                                        formattedSource += `<span class='noscroll ${typeof baseChunkDataIn[type][el][source] !== "boolean" && (baseChunkDataIn[type][el][source].includes('primary-') || baseChunkDataIn[type][el][source].includes('shop')) ? 'green' : ''}'><a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(shownSource.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, ''))}" target="_blank">${shownSource.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')}</a></span>`;
                                    }
                                }
                                if (typeof baseChunkDataIn[type][el][source] !== "boolean" && skills.includes(baseChunkDataIn[type][el][source].split('-')[1])) {
                                    formattedSource += `<span class='noscroll ${baseChunkDataIn[type][el][source].includes('primary-') || baseChunkDataIn[type][el][source].includes('shop') ? 'green' : ''}'>${baseChunkDataIn[type][el][source].split('-')[1].replaceAll(/\*/g, '')}</span>`;
                                    formattedSource += ` <span class='noscroll ${baseChunkDataIn[type][el][source].includes('primary-') || baseChunkDataIn[type][el][source].includes('shop') ? 'green' : ''}'>(${source.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\*/g, '')})</span> <span onclick="showDetails('` + encodeRFC5987ValueChars(source) + `', '` + baseChunkDataIn[type][el][source].split('-')[1].replaceAll(/\*/g, '') + `', '` + dataType + `', true)"><i class="quest-icon fas fa-info-circle"></i></span>`;
                                } else if (typeof baseChunkDataIn[type][el][source] !== "boolean" && !baseChunkDataIn[type][el][source].includes('primary') && !baseChunkDataIn[type][el][source].includes('secondary') && baseChunkDataIn[type][el][source] !== 'shop') {
                                    formattedSource += `<span class='noscroll ${baseChunkDataIn[type][el][source].includes('primary-') || baseChunkDataIn[type][el][source].includes('shop') ? 'green' : ''}'>-${baseChunkDataIn[type][el][source].replaceAll(/\*/g, '')}</span>`;
                                } else if (typeof baseChunkDataIn[type][el][source] !== "boolean") {
                                    formattedSource += ` <span class='noscroll ${baseChunkDataIn[type][el][source].includes('primary-') || baseChunkDataIn[type][el][source].includes('shop') ? 'green' : ''}'>(${baseChunkDataIn[type][el][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}${dropRatesGlobal.hasOwnProperty(source) && dropRatesGlobal[source].hasOwnProperty(el) ? ', ' + dropRatesGlobal[source][el] : ''})</span>`;
                                }
                                formattedSource += ', ';
                            }
                        });
                        formattedSource = formattedSource.slice(0, -2);
                        if (!!baseChunkDataIn[type] && !!baseChunkDataIn[type][el] && Object.keys(baseChunkDataIn[type][el]).length > 10) {
                            formattedSource = `: <span class="noscroll tosearchdetails" onclick="openSearchDetails('${type}', '${encodeRFC5987ValueChars(el)}')"> Many sources (${Object.keys(baseChunkDataIn[type][el]).length})</span>`;
                        }
                        if (formattedSource !== '') {
                            written = true;
                            $('#details-data').append(`<span class="noscroll"><b class="noscroll">${el}</b></span><span class="noscroll">${formattedSource}</span><br />`);
                        } else {
                            written = true;
                            if (el === 'Monster[+]') {
                                $('#details-data').append(`<span class="noscroll"><b class="noscroll">Any monster</b></span><br />`);
                            } else {
                                $('#details-data').append(`<span class="noscroll red"><b class="noscroll">${el}</b></span><br />`);
                            }
                        }
                    }
                }
            });
            if (!chunkInfo['challenges'][skill][challenge][key] || chunkInfo['challenges'][skill][challenge][key].length === 0 || !written) {
                $('#details-data').append('<span class="noscroll">None</span><br />');
            }
        });
        if (!isNested) {
            detailsStack = [];
        }
        detailsStack.push([challenge, skill]);
        $('#myModal2').show();
        modalOutsideTime = Date.now();
        document.getElementById('details-data').scrollTop = 0;
    }
}

// Shows challenge alternatives
let showAlternatives = function(challenge, skill) {
    challenge = decodeQueryParam(challenge);
    challengeAltsModalOpen = true;
    $('#alts-data').empty();
    !!globalValids[skill] && Object.keys(globalValids[skill]).filter(chal => !backlog.hasOwnProperty(skill) || !backlog[skill].hasOwnProperty(chal)).forEach((chal) => {
        if (globalValids[skill][chal] === globalValids[skill][challenge]) {
            if (skill === 'BiS') {
                $('#alts-data').append(`<div class="alt-challenge noscroll ${skill + '-alt-challenge'}"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" ${(!!highestOverall && Object.values(highestOverall).map(function(y) { return y.toLowerCase() }).includes(chal.split('|')[1].toLowerCase())) ? "checked" : ''} class='noscroll' onclick="checkOffAltChallenge('${skill}', '${encodeRFC5987ValueChars(chal)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll"><span class="inner noscroll">${skill}</b>: ${chal.split('~')[0]} <a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((chal.split('|')[1]))}" target="_blank">${chal.split('~')[1].split('|').join('')}</a> ${chal.split('~')[2]}</span></span></label></div>`);
            } else if (skill !== 'Quest' && skill !== 'Diary' && skill !== 'Extra') {
                $('#alts-data').append(`<div class="alt-challenge noscroll ${skill + '-alt-challenge'}"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" ${(chal === challenge) ? "checked" : ''} class='noscroll' onclick="checkOffAltChallenge('${skill}', '${encodeRFC5987ValueChars(chal)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll"><span class="inner noscroll">${skill}</b>: ${chal.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl((chal.split('|')[1]))}" target="_blank">${chal.split('~')[1].split('|').join('')}</a>${chal.split('~')[2]}</span></span></label></div>`);
            } else {
                $('#alts-data').empty();
                $('#alts-data').append(`<div class="alt-challenge noscroll ${skill + '-alt-challenge'}"><div class='noscroll results'><span class='noscroll holder'><span class='noscroll topline'>No Alternatives</span></span></div></div>`);
            }
        }
    });
    if (!$('#alts-data').children() || $('#alts-data').children().length < 2) {
        $('#alts-data').empty();
        $('#alts-data').append(`<div class='noscroll results'><span class='noscroll holder'><span class='noscroll topline'>No Alternatives</span></span></div>`);
    }
    $('#myModal19').show();
    modalOutsideTime = Date.now();
}

// Switches active challenge to alt
let checkOffAltChallenge = function(skill, chal) {
    chal = decodeQueryParam(chal);
    if (!altChallenges[skill]) {
        altChallenges[skill] = {};
    }
    if (skill === 'BiS') {
        !!globalValids[skill][chal] && globalValids[skill][chal].split(' BiS ')[0].split('/​').forEach((bit) => {
            altChallenges[skill][bit + ' BiS ' + globalValids[skill][chal].split(' BiS ')[1]] = chal;
        });
    } else {
        !!chunkInfo['challenges'][skill][chal] && (altChallenges[skill][chunkInfo['challenges'][skill][chal]['Level']] = chal);
    }
    setupCurrentChallenges(tempChallengeArrSaved, false, true);
    setData();
}

// Selects/deselects the given cluetier
let selectOverlayClues = function(clueTier) {
    selectedOverlayClues[clueTier] = !selectedOverlayClues[clueTier];
    if (Object.values(selectedOverlayClues).filter(val => val).length === 0) {
        selectedOverlay = 'None';
    }
    showOverlays(true);
}

// Clears all overlay clues
let clearOverlayClues = function() {
    Object.keys(selectedOverlayClues).forEach((clueTier) => {
        selectedOverlayClues[clueTier] = false;
    });
    showOverlays(true);
}

// Toggle overlay within chunks only
let changeOverlayFilterBy = function() {
    unlockedOverlayOnly = !unlockedOverlayOnly;
}

// Shows overlay options
let showOverlays = function(fromHelper) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        onMobile && hideMobileMenu();
        overlaysModalOpen = true;
        $('#overlays-data').empty();
        let overlay;
        let overlayLink;
        ['None', ...Object.keys(chunkInfo['mapOverlays'])].forEach((overlayText) => {
            if (overlayText.includes('|')) {
                overlay = overlayText.split('|')[0];
                overlayLink = overlayText.split('|')[1];
            } else {
                overlay = overlayText;
                overlayLink = overlayText;
            }
            if (overlay === 'Clues') {
                $('#overlays-data').append(`<div class="overlay noscroll ${overlay.replaceAll(' ', '_') + '-overlay'}"><label class="radio noscroll extra-space"><span class="radio__label noscroll">${overlay === 'None' ? overlay : `<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(overlayLink)}" target="_blank">${overlay}</a>`}</span></label></div>`);
                clueTiers.forEach((clueTier) => {
                    $('#overlays-data').append(`<div class="overlay noscroll ${clueTier.replaceAll(' ', '_') + '-overlay'} sub-overlay-entry"><label class="checkbox noscroll"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${selectedOverlayClues[clueTier] ? "checked" : ''} class='noscroll' onclick="selectedOverlay='${overlay}'; selectOverlayClues('${clueTier}');"><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="checkbox__label noscroll">${overlay === 'None' ? overlay : `<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(`${clueTier} ${overlay.toLowerCase()}`)}" target="_blank">${clueTier} ${overlay}</a>`}</span></label></div>`);
                });
            } else {
                $('#overlays-data').append(`<div class="overlay noscroll ${overlay.replaceAll(' ', '_') + '-overlay'}"><label class="radio noscroll"><span class="radio__input noscroll"><input type="radio" name="radio" ${(selectedOverlay === overlayText) ? "checked" : ''} class='noscroll' onclick="selectedOverlay='${overlayText}'; clearOverlayClues();"><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll">${overlay === 'None' ? overlay : `<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(overlayLink)}" target="_blank">${overlay}</a>`}</span></label></div>`);
            }
        });
        $('#myModal39').show();
        !fromHelper && (document.getElementById('overlays-data').scrollTop = 0);
        modalOutsideTime = Date.now();
    }
}

// Shows mobile-only menu
let showMobileMenu = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        $('.menu13').show();
        mobileMenuOpen = true;
    }
}

//Hides mobile-only menu
let hideMobileMenu = function() {
    $('.menu13').hide();
    mobileMenuOpen = false;
}

// Shows challenge notes
let showNotes = function(challenge, skill, note) {
    let baseChunkDataIn = baseChunkData;
    let detailsKeys = ['ItemsDetails', 'ObjectsDetails', 'MonstersDetails', 'NPCsDetails'];
    challenge = decodeQueryParam(challenge);
    if (note === true) {
        note = '';
    }
    $('#notes-title').html(`<b class="noscroll">Backlogging:</b><br />${challenge.replaceAll(/\|/g, '').replaceAll(/~/g, '')}`);
    $('#notes-data').empty();
    $('#notes-data').append(`<div class="notes-row noscroll"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" checked="true" class='noscroll' onclick="saveNotesData('task', null)" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">Backlog just this task</b></span></label></div>`);
    $('#notes-data').append(`<div class="noscroll">(Optional) Add notes:</div><div class='backlog-textarea-wrapper noscroll'><textarea maxlength="128"></textarea></div>`);
    let sourceWritten = false;
    detailsKeys.forEach((key) => {
        let keyWritten = false;
        let type = key.split('Details')[0].toLowerCase();
        if ((!chunkInfo['challenges'][skill][challenge][key] || chunkInfo['challenges'][skill][challenge][key].length < 1) && !!chunkInfo['challenges'][skill][challenge][key.split('Details')[0]]) {
            chunkInfo['challenges'][skill][challenge][key.split('Details')[0]].forEach((typeEl) => {
                chunkInfo['challenges'][skill][challenge][key].push(typeEl);
            });
        }
        !!chunkInfo['challenges'][skill][challenge][key] && chunkInfo['challenges'][skill][challenge][key].forEach((el) => {
            let els = [];
            if (!!chunkInfo['codeItems'][type + 'Plus'] && !!chunkInfo['codeItems'][type + 'Plus'][el]) {
                let validElem = false;
                chunkInfo['codeItems'][type + 'Plus'][el].forEach((elem) => {
                    if (!!baseChunkDataIn[type][elem]) {
                        els.push(elem);
                        validElem = true;
                    }
                });
                !validElem && els.push(el);
                if (!sourceWritten) {
                    sourceWritten = true;
                    $('#notes-data').append(`<div class="notes-or noscroll">-- Or --</div><div class="noscroll">Backlog source one of the task requirements.</div>`);
                }
                if (!keyWritten) {
                    keyWritten = true;
                    $('#notes-data').append(`<div class="notes-subtitle noscroll"><u class="noscroll"><b class="noscroll">${type}</b></u></div>`);
                    if (type === 'monsters') {
                        $('#notes-data').append(tempMonsters);
                        monstersWritten = true;
                    }
                }
                $('#notes-data').append(`<div class="noscroll"><b class="noscroll">${chunkInfo['codeItems'][type + 'PlusNames'][el]}:</b></div>`);
                els.length > 0 && els.forEach((element) => {
                    $('#notes-data').append(`<div class="notes-row indent noscroll"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" class='noscroll' onclick="saveNotesData(` + "`" + type + "`, " + "`" + element + "`" + `)" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">${element}</b></span></label></div>`);
                    !!baseChunkDataIn[type][element] && Object.keys(baseChunkDataIn[type][element]).forEach((source) => {
                        if (typeof baseChunkDataIn[type][element][source] === 'string' && baseChunkDataIn[type][element][source].includes('-drop')) {
                            let shownSource = source;
                            if (shownSource.includes('|')) {
                                shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                            }
                            $('#notes-data').append(`<div class="notes-row double-indent noscroll"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" class='noscroll' onclick="saveNotesData(` + "`" + 'monsters' + "`, " + "`" + shownSource + "`" + `)" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">${shownSource}</b></span></label></div>`);
                        }
                    });
                });
            } else {
                if (!sourceWritten) {
                    sourceWritten = true;
                    $('#notes-data').append(`<div class="notes-or noscroll">-- Or --</div><div class="noscroll">Backlog source one of the task requirements.</div>`);
                }
                if (!keyWritten) {
                    keyWritten = true;
                    $('#notes-data').append(`<div class="notes-subtitle noscroll"><u class="noscroll"><b class="noscroll">${type}</b></u></div>`);
                }
                $('#notes-data').append(`<div class="notes-row noscroll"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" class='noscroll' onclick="saveNotesData(` + "`" + type + "`, " + "`" + el + "`" + `)" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">${el}</b></span></label></div>`);
                !!baseChunkDataIn[type][el] && Object.keys(baseChunkDataIn[type][el]).forEach((source) => {
                    if (typeof baseChunkDataIn[type][el][source] === 'string' && baseChunkDataIn[type][el][source].includes('-drop')) {
                        let shownSource = source;
                        if (shownSource.includes('|')) {
                            shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                        }
                        $('#notes-data').append(`<div class="notes-row double-indent noscroll"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" class='noscroll' onclick="saveNotesData(` + "`" + 'monsters' + "`, " + "`" + shownSource + "`" + `)" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">${shownSource}</b></span></label></div>`);
                    }
                });
            }
        });
    });
    notesModalOpen = true;
    $('#myModal3').show();
    $('#notes-data textarea').val(note).focus();
    saveNotesData('task', null);
    notesChallenge = challenge;
    notesSkill = skill;
    document.getElementById('notes-data').scrollTop = 0;
}

// Saves notes data for later submitting
let saveNotesData = function(type, el) {
    savedNotesType = type;
    savedNotesEl = el;
}

// Submit notes for challenge
let submitNotes = function() {
    if (savedNotesType === 'task') {
        backlogChallenge(notesChallenge, notesSkill, $('#notes-data textarea').val());
    } else {
        backlogManualSource(savedNotesType, savedNotesEl);
    }
    closeChallengeNotes();
}

// Submit friend map
let submitFriend = function() {
    if ($(".altsite-friend-checkbox").prop("checked")) {
        friendsAlt[$('.mid-friend').val()] = $('.name-friend').val();
    } else {
        friends[$('.mid-friend').val()] = $('.name-friend').val();
    }
    setData();
    closeFriendsListAdd();
    openFriendsList();
}

// Apply the given rule preset
let applyPreset = function(preset) {
    presetWarningModalOpen = false;
    $('#myModal5').hide();
    !!rulePresets && !!rulePresets[preset] && Object.keys(rules).forEach((rule) => {
        if (rule === 'Kill X Amount') {
            rules[rule] = rulePresets[preset][rule];
            $('.x-num-input').val(rulePresets[preset][rule]);
        } else if (rule === 'Rare Drop Amount') {
            rules[rule] = rulePresets[preset][rule];
            $('.rare-num-input').val(rulePresets[preset][rule]);
        } else if (rule === 'Secondary Primary Amount') {
            rules[rule] = rulePresets[preset][rule];
            $('.secondary-primary-input').val(rulePresets[preset][rule]);
        } else {
            rules[rule] = rulePresets[preset].hasOwnProperty(rule);
            $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule input').prop('checked', rulePresets[preset].hasOwnProperty(rule));
        }
    });
    !!rulePresets && !!rulePresets[preset] && checkOffRules();
}

// Shows warning modal for applying a preset
let warnPreset = function(preset) {
    $('#preset-data').empty();
    $('#preset-title').text('Apply the ' + preset + ' preset?');
    $('.specific-preset').text(preset);
    $('#preset-data').html('<div><div class="preset-cancel" onclick="applyPreset(``)">Cancel</div><div class="preset-proceed" onclick="applyPreset(`' + preset + '`)">Yes, proceed</div></div>');
    presetWarningModalOpen = true;
    $('#myModal5').show();
}

// Shows warning modal for exiting sandbox mode
let warnExitSandbox = function() {
    exitSandboxWarningModalOpen = true;
    $('#myModal40').show();
}

// Shows warning modal for picking a chunk
let warnPickChunk = function(both) {
    pickChunkWarningModalOpen = true;
    $('.rollwarning-proceed').attr('onClick', `pickCanvas(${both}, true)`);
    $('#myModal41').show();
}

// Shows warning modal for rolling 2 chunks
let warnRoll2Chunk = function() {
    roll2ChunkWarningModalOpen = true;
    $('.roll2warning-proceed').attr('onClick', `roll2Canvas(true)`);
    $('#myModal44').show();
}

// Shows chunk rules
let showRules = function(isPage2) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
        rulesModalOpen = true;
        toggleRulesPanel(Object.keys(rulesPanelVis).filter(panel => { return rulesPanelVis[panel] })[0]);
        $('#rules-subdata, #rules-data > .panel').empty();
        $('#rules-subdata').append(`<div class="rule-category intro-category noscroll">Basic Rules</div><div class="rule-subcategory intro-subcategory noscroll">If you're unfamiliar with the basic rules of a OneChunkMan account, check out a basic description of the rules and guidelines <a class='noscroll' href='https://docs.google.com/document/d/1ia1wiRSYs8GznzHM5D7SynNG-PWM9-9Jv3JKGV6Y28Q' target='_blank'>here</a>!</div>`);
        if ((!viewOnly && !inEntry && !locked) || testMode) {
            $('#rules-subdata').append(`<div class="rule-category presets-category noscroll">Rule Presets</div><div class="rule-subcategory presets-subcategory noscroll">Pick a rule preset to get started, and then feel free to tinker with the specific rules on the detailed rules page to suit your playstyle!</div><div id="rules-presets" class="rules-presets noscroll"></div>`);
            Object.keys(rulePresets).forEach((preset) => {
                $('#rules-presets').append(`<div class="preset-button noscroll" onclick="warnPreset('${preset}')">${preset}<br /><span>${rulePresetFlavor[preset]}</span></div>`);
            });
        }
        if (isPage2) {
            $('#rules-subdata').append(`<div class="noscroll show-rule-back-btn"><span class='noscroll' onclick="showRules()">Back to Overview</span></div>`);
        } else {
            $('#rules-subdata').append(`<div class="noscroll show-rule-details-btn"><span class='noscroll' onclick="showRules(true)">Show Detailed Rules</span></div>`);
        }
        $('#rules-subdata').append(`<div class="rule-category rules-main-header noscroll">Rules</div>`);
        $('#rules-subdata').append(`<div class="rule-key noscroll"><b class='noscroll'><u class='noscroll'>KEY</u></b><br /><span class='rule-asterisk noscroll'>*</span> - Xtreme/Supreme Rule<br /><span class='rule-asterisk noscroll'>†</span> - Supreme Rule</div>`);
        Object.keys(ruleStructure).forEach((category) => {
            !!ruleStructure[category] && Object.keys(ruleStructure[category]).forEach((rule) => {
                if (rule !== 'Kill X Amount' && rule !== 'Rare Drop Amount' && rule !== 'Secondary Primary Amount') {
                    if (rule === 'Kill X') {
                        $(`.panel-${category.replaceAll(' ', '').toLowerCase()}`).append(`<div class="rule ${rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${rules[rule] ? "checked" : ''} class='noscroll' onclick="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${ruleNames[rule].split('X-amount')[0]}<input type='number' class='x-num-input' min='1' value="${rules['Kill X Amount']}" onchange="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /> ${ruleNames[rule].split('X-amount')[1]}</span></label></div>`);
                    } else if (rule === 'Rare Drop') {
                        $(`.panel-${category.replaceAll(' ', '').toLowerCase()}`).append(`<div class="rule ${rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule'} noscroll"><span class='noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}'>` + ruleNames[rule].split('/X')[0] + ` / <input type='number' class='rare-num-input' min='0' value="${rules['Rare Drop Amount']}" onchange="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /> ` + ruleNames[rule].split('/X')[1] + '</span></div>');
                    } else if (rule === 'Secondary Primary') {
                        $(`.panel-${category.replaceAll(' ', '').toLowerCase()}`).append(`<div class="rule ${rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule'} noscroll"><span class='noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}'>` + ruleNames[rule].split('/X')[0] + ` / <input type='number' class='secondary-primary-input' min='0' value="${rules['Secondary Primary Amount']}" onchange="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /> ` + ruleNames[rule].split('/X')[1] + '</span></div>');
                    } else {
                        $(`.panel-${category.replaceAll(' ', '').toLowerCase()}`).append(`<div class="rule ${rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${rules[rule] ? "checked" : ''} class='noscroll' onclick="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${ruleNames[rule]}</span></label></div>`);
                    }
                    Array.isArray(ruleStructure[category][rule]) && ruleStructure[category][rule].forEach((subRule) => {
                        $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').append(`<div class="rule ${subRule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule subrule'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][subRule] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${rules[subRule] ? "checked" : ''} class='noscroll' onclick="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][subRule] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${ruleNames[subRule]}</span></label></div>`);
                    });
                }
            });
        });
        if (isPage2) {
            $('.intro-category, .presets-category, #rules-presets, .show-rule-details-btn, .intro-subcategory, .presets-subcategory').hide();
            $('.rules-main-header, .rule-key, .rule-minicategory, #rules-data > .accordion').show();
        } else {
            $('.intro-category, .presets-category, #rules-presets, .show-rule-details-btn, .intro-subcategory, .presets-subcategory').show();
            $('.rules-main-header, .rule-key, .rule-minicategory, #rules-data > .accordion').hide();
        }
        checkOffRules(false, true);
        document.getElementById('rules-data').scrollTop = 0;
        $('#myModal4').show();
        modalOutsideTime = Date.now();
    }
}

// Shows settings details
let showSettings = function(keepSettingsClosed) {
    onMobile && hideMobileMenu();
    settingsModalOpen = true;
    $('#settings-data').empty();
    Object.keys(settingStructure).forEach((category) => {
        $('#settings-data').append(`<div class="setting-category ${category.replaceAll(/ /g, '_')}-category noscroll">${category}</div>`);
        !!settingStructure[category] && Object.keys(settingStructure[category]).forEach((setting) => {
            if (setting === 'completedTaskColor') {
                $('.' + category.replaceAll(/ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting'} noscroll"><input class="challenge-color-rule" type="color" value="${settings[setting]}" onchange="changeChallengeColor()" /><i class="fas fa-undo-alt noscroll reset-challenge-color" title="Reset Color" onclick="resetChallengeColor()"></i><span class='noscroll extraspace'>` + settingNames[setting] + '</span></div>');
            } else if (setting === 'defaultStickerColor') {
                $('.' + category.replaceAll(/ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting'} noscroll"><input class="sticker-color-rule" type="color" value="${settings[setting]}" onchange="changeDefaultStickerColor()" /><i class="fas fa-undo-alt noscroll reset-default-sticker-color" title="Reset Color" onclick="resetDefaultStickerColor()"></i><span class='noscroll extraspace'>` + settingNames[setting] + '</span></div>');
            } else if (setting === 'startingChunk') {
                $('.' + category.replaceAll(/ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting'} noscroll"><span class='noscroll'>` + settingNames[setting] + `: ${settings[setting]}<i class="fas fa-edit noscroll change-starting-chunk" title="Change Starting Chunk" onclick="openMapIntroModal(${true})"></i></span></div>`);
            } else if (setting === 'theme') {
                $('.' + category.replaceAll(/ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting'} noscroll"><div class='noscroll theme-header'>Theme:</div><button class='theme-button light' onclick="toggleTheme('light')">Light</button><button class='theme-button dark' onclick="toggleTheme('dark')">Dark</button><button class='theme-button terminal' onclick="toggleTheme('terminal')">Terminal</button><button class='theme-button neon' onclick="toggleTheme('neon')">Neon</button><button class='theme-button pumpkin' onclick="toggleTheme('pumpkin')">Pumpkin</button><button class='theme-button mono' onclick="toggleTheme('mono')">Mono</button><button class='theme-button winter' onclick="toggleTheme('winter')">Winter</button><button class='theme-button autumn' onclick="toggleTheme('autumn')">Autumn</button></div>`);
            } else {
                $('.' + category.replaceAll(/ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting'} noscroll"><label class="checkbox noscroll ${(viewOnly || inEntry || locked || settingStructure[category][setting] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${settings[setting] ? "checked" : ''} class='noscroll' onclick="checkOffSettings()" ${(viewOnly || inEntry || locked || settingStructure[category][setting] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${settingNames[setting]}</span></label></div>`);
            }
            Array.isArray(settingStructure[category][setting]) && settingStructure[category][setting].forEach((subSetting) => {
                $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').append(`<div class="setting ${subSetting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting subsetting'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || settingStructure[category][subSetting] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${settings[subSetting] ? "checked" : ''} class='noscroll' onclick="checkOffSettings()" ${!testMode && (viewOnly || inEntry || locked || settingStructure[category][subSetting] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${settingNames[subSetting]}</span></label></div>`);
            });
        });
    });
    checkOffSettings(false, 'startup');
    $('#myModal7').show();
    document.getElementById('settings-data').scrollTop = 0;
    modalOutsideTime = Date.now();
    !keepSettingsClosed && settingsMenu();
}

// Changes the active challenges color
let changeChallengeColor = function() {
    $('.challenge-color-rule').length && (settings['completedTaskColor'] = $('.challenge-color-rule').val());
    $('.challenge.hide-backlog .checkbox').css({ 'color': settings['completedTaskColor'], 'text-decoration': settings['completedTaskStrikethrough'] ? 'line-through' : 'none' });
    $('.challenge.hide-backlog a').css({ 'text-decoration': settings['completedTaskStrikethrough'] ? 'none' : 'underline' });
    $('.challenge:not(.hide-backlog) .checkbox').css({ 'color': 'var(--colorText)', 'text-decoration': 'none' });
    $('.challenge:not(.hide-backlog) a').css({ 'text-decoration': 'underline' });
    $('.tasks-checkmark').css({ 'color': settings['completedTaskColor'] });
    setData();
    setTaskNum();
}

// Resets the active challenges color
let resetChallengeColor = function() {
    $('.challenge-color-rule').val('#0D8219');
    changeChallengeColor();
}

// Changes the default sticker color
let changeDefaultStickerColor = function() {
    $('.sticker-color-rule').length && (settings['defaultStickerColor'] = $('.sticker-color-rule').val());
    setData();
}

// Resets the default sticker color
let resetDefaultStickerColor = function() {
    $('.sticker-color-rule').val('#000000');
    changeDefaultStickerColor();
}


// Shows chunk history
let showChunkHistory = function() {
    onMobile && hideMobileMenu();
    chunkHistoryModalOpen = true;
    $('#chunkhistory-data-inner').empty();
    let tempDate = new Date();
    let passedChunks = {};
    let newChunkOrder = {};
    Object.keys(chunkOrder).sort(function(a, b) { return b - a }).forEach((time) => {
        if (!passedChunks.hasOwnProperty(chunkOrder[time])) {
            if (!!tempChunks['unlocked'] && tempChunks['unlocked'].hasOwnProperty(chunkOrder[time])) {
                newChunkOrder[chunkOrder[time]] = time;
            }
            passedChunks[chunkOrder[time]] = true;
            tempDate.setTime(time);
            $('#chunkhistory-data-inner').append(`<div class="history-item ${chunkOrder[time] + '-chunk-history-item'} noscroll"><span class='noscroll item1'>${"<b class='noscroll'>" + tempDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: '2-digit' }) + '</b> (' + tempDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }) + ') '}</span><span class='noscroll item2'>${"<b class='noscroll'>" + ((chunkInfo['chunks'].hasOwnProperty(parseInt(chunkOrder[time])) && chunkInfo['chunks'][parseInt(chunkOrder[time])].hasOwnProperty('Nickname')) ? chunkInfo['chunks'][parseInt(chunkOrder[time])]['Nickname'] : 'Unknown chunk') + '</b>' + ' (' + chunkOrder[time] + ')'}</span></div>`);
        }
    });
    // Graph
    if (Object.keys(newChunkOrder).length >= 3 && (Date.now() - Object.keys(chunkOrder).sort(function(a, b) { return a - b })[0] >= 300000 && !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).length >= 3)) {
        $('.canvas-graph-outer').show();
        let canvasGraph = document.getElementById('canvas-graph');
        let ctxGraph = canvasGraph.getContext('2d');
        let padding = 35;
        ctxGraph.fillStyle = "white";
        ctxGraph.fillRect(0, 0, canvasGraph.width, canvasGraph.height);
        let startingWidth = Object.keys(chunkOrder).sort(function(a, b) { return a - b })[0];
        let fullWidth = Date.now() - Object.keys(chunkOrder).sort(function(a, b) { return a - b })[0];
        let fullHeight = Object.keys(newChunkOrder).length * 1.1;
        let count = 0;
        let prevY = canvasGraph.height - padding - 2;
        ctxGraph.beginPath();
        ctxGraph.strokeStyle = 'black';
        ctxGraph.lineWidth = 3;
        ctxGraph.moveTo(padding, padding);
        ctxGraph.lineTo(padding, canvasGraph.height - padding);
        ctxGraph.lineTo(canvasGraph.width - padding, canvasGraph.height - padding);
        ctxGraph.stroke();
        ctxGraph.beginPath();
        ctxGraph.strokeStyle = "grey";
        ctxGraph.lineWidth = 1;
        for (let lineNum = 1; lineNum <= 3; lineNum++) {
            ctxGraph.moveTo(padding, canvasGraph.height - padding - ((canvasGraph.height - padding * 2) * (Math.floor(fullHeight / 3) * lineNum / fullHeight)));
            ctxGraph.lineTo(canvasGraph.width - padding, canvasGraph.height - padding - ((canvasGraph.height - padding * 2) * (Math.floor(fullHeight / 3) * lineNum / fullHeight)));
        }
        for (let lineNum = 0; lineNum <= 5; lineNum++) {
            ctxGraph.moveTo(canvasGraph.width - padding - ((canvasGraph.width - padding * 2) * (Math.floor(fullWidth / 6) * lineNum / fullWidth)), padding);
            ctxGraph.lineTo(canvasGraph.width - padding - ((canvasGraph.width - padding * 2) * (Math.floor(fullWidth / 6) * lineNum / fullWidth)), canvasGraph.height - padding);
        }
        ctxGraph.stroke();
        ctxGraph.font = '16px Calibri, Roboto Condensed, sans-serif';
        ctxGraph.fillStyle = 'black';
        ctxGraph.textAlign = "right";
        let offset = Object.keys(tempChunks['unlocked']).length - Object.keys(newChunkOrder).length;
        for (let lineNum = 0; lineNum <= 3; lineNum++) {
            ctxGraph.fillText(Math.floor(fullHeight / 3) * lineNum + offset, padding - 5, canvasGraph.height - padding + 4 - ((canvasGraph.height - padding * 2) * (Math.floor(fullHeight / 3) * lineNum / fullHeight)));
        }
        ctxGraph.textAlign = 'center';
        for (let lineNum = 1; lineNum <= 6; lineNum++) {
            let tempDate = new Date();
            tempDate.setTime(parseInt(startingWidth) + (Math.floor(fullWidth / 6) * lineNum));
            ctxGraph.fillText(tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2], padding + ((canvasGraph.width - padding * 2) * (Math.floor(fullWidth / 6) * lineNum / fullWidth)), canvasGraph.height - 20);
        }
        ctxGraph.beginPath();
        ctxGraph.strokeStyle = "rgb(66, 133, 244)";
        ctxGraph.lineWidth = 3;
        ctxGraph.moveTo((((Object.keys(chunkOrder).sort(function(a, b) { return a - b })[0] - startingWidth) / fullWidth) * canvasGraph.width) + padding + 3, prevY);
        newChunkOrder = {};
        Object.keys(chunkOrder).sort(function(a, b) { return a - b }).forEach((time) => {
            if (!newChunkOrder.hasOwnProperty(chunkOrder[time]) && tempChunks['unlocked'].hasOwnProperty(chunkOrder[time])) {
                newChunkOrder[chunkOrder[time]] = time;
                count++;
                ctxGraph.lineTo((((time - startingWidth) / fullWidth) * (canvasGraph.width - (padding * 2) - 3)) + padding + 3, prevY);
                ctxGraph.lineTo((((time - startingWidth) / fullWidth) * (canvasGraph.width - (padding * 2) - 3)) + padding + 3, (canvasGraph.height - ((count / fullHeight) * (canvasGraph.height - (padding * 2) - 2))) - padding - 2);
                prevY = (canvasGraph.height - ((count / fullHeight) * (canvasGraph.height - (padding * 2) - 2))) - padding - 2;
            }
        });
        ctxGraph.lineTo((((Date.now() - startingWidth) / fullWidth) * (canvasGraph.width - (padding * 2) - 3)) + padding + 3, prevY);
        ctxGraph.stroke();
        let numDays = Math.round((((fullWidth / Object.keys(newChunkOrder).length) / (1000 * 3600 * 24)) + Number.EPSILON) * 100) / 100;
        $('.average-rolltime-title').show().text(`Average time between chunk rolls: ${numDays} days`);
    } else {
        $('.canvas-graph-outer').hide();
        $('.average-rolltime-title').hide().text('');
    }
    document.getElementById('chunkhistory-data-inner').scrollTop = 0;
    $('#myModal18').show();
    modalOutsideTime = Date.now();
    settingsMenu();
}

// Selects correct active context menu item
let switchActiveContext = function(e, opt) {
    activeContextMenuOpen = false;
    switch (opt) {
        case "backlog": backlogChallenge(activeContextMenuChallenge, activeContextMenuSkill, '', e.altKey); break;
        case "backlog note": showNotes(encodeRFC5987ValueChars(activeContextMenuChallenge), activeContextMenuSkill, ''); break;
        case "alternatives": showAlternatives(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
        case "details": showDetails(encodeRFC5987ValueChars(activeContextMenuChallenge), activeContextMenuSkill, ''); break;
    }
    $(".active-context-menu").hide(100);
}

// Selects correct backlog context menu item
let switchBacklogContext = function(opt) {
    backlogContextMenuOpen = false;
    switch (opt) {
        case "unbacklog": unbacklogChallenge(backlogContextMenuChallenge, backlogContextMenuSkill); break;
        case "edit note": showNotes(backlogContextMenuChallenge, backlogContextMenuSkill, backlog[backlogContextMenuSkill][backlogContextMenuChallenge]); break;
        case "details": showDetails(encodeRFC5987ValueChars(backlogContextMenuChallenge), backlogContextMenuSkill, ''); break;
    }
    $(".backlog-context-menu").hide(100);
}

// Selects correct quest filter context menu item
let switchQuestFilterContext = function(opt) {
    filterQuests(opt);
    $(".questfilter-context-menu").hide(100);
}

// Sends a challenge to the backlog
let backlogChallenge = function(challenge, skill, note, noUpdate) {
    challenge = decodeQueryParam(challenge);
    if (!backlog[skill]) {
        backlog[skill] = {};
    }
    if (skill === 'Extra' || skill === 'Quest' || skill === 'Diary' || skill === 'BiS') {
        if (!!chunkInfo['challenges'][skill][challenge] && !!chunkInfo['challenges'][skill][challenge]['Skills']) {
            skill !== 'Quest' && skill !== 'Diary' && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                if (!backlog[subSkill]) {
                    backlog[subSkill] = {};
                }
                backlog[subSkill][challenge] = note;
            });
        }
        backlog[skill][challenge] = note;
        challengeArr.filter(line => { return line.includes(skill + '-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge') }).forEach(function(line) {
            let index = challengeArr.indexOf(line);
            challengeArr.splice(index, 1);
        });
        !!globalValids[skill] && Object.keys(globalValids[skill]).forEach((challenge) => {
            globalValids[skill][challenge] = true;
        });
        !!globalValids[skill] && Object.keys(globalValids[skill]).forEach((challenge) => {
            fullyValid = true;
            !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach((subTask) => {
                if (!globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) {
                    fullyValid = false;
                }
            });
            if (fullyValid) {
                !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach((subTask) => {
                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false;
                    }
                });
            }
        });
        $(`.panel-active .challenge.${skill.toLowerCase() + '-challenge'}.${skill + '-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}`).remove();
    } else {
        backlog[skill][challenge] = note;
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            skill !== 'Quest' && skill !== 'Diary' && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                if (!backlog[subSkill]) {
                    backlog[subSkill] = {};
                }
                backlog[subSkill][challenge] = note;
            });
        }
        let highestCompletedLevel = 0;
        !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach((name) => {
            if (chunkInfo['challenges'][skill][name] && chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
                highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'];
            }
        });
        let highestChallenge;
        let highestChallengeLevel = 0;
        Object.keys(globalValids[skill]).forEach((chal) => {
            if ((!backlog[skill] || !backlog[skill].hasOwnProperty(chal)) && globalValids[skill][chal] > highestChallengeLevel && globalValids[skill][chal] > highestCompletedLevel) {
                highestChallenge = chal;
                highestChallengeLevel = globalValids[skill][chal];
            } else if ((!backlog[skill] || !backlog[skill].hasOwnProperty(chal)) && globalValids[skill][chal] === highestChallengeLevel && globalValids[skill][chal] > highestCompletedLevel && (!highestChallenge || !chunkInfo['challenges'][skill][highestChallenge]['Priority'] || (!!chunkInfo['challenges'][skill][chal]['Priority'] && chunkInfo['challenges'][skill][chal]['Priority'] < chunkInfo['challenges'][skill][highestChallenge]['Priority']))) {
                highestChallenge = chal;
                highestChallengeLevel = globalValids[skill][chal];
            }
        });
        challengeArr.forEach((line) => {
            if (line.includes(skill + '-challenge')) {
                let index = challengeArr.indexOf(line);
                challengeArr.splice(index, 1);
                if (highestChallengeLevel > 0) {
                    oldChallengeArr[skill] = highestChallenge;
                    challengeArr.splice(index, 0, `<div class="challenge skill-challenge noscroll ${skill + '-challenge'} ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][highestChallenge]) && 'hide-backlog'} ${!activeSubTabs['skill'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][highestChallenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('${skill}', '${encodeRFC5987ValueChars(highestChallenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${chunkInfo['challenges'][skill][highestChallenge]['Level']}] <span class="inner noscroll">${skill}</b>: ${highestChallenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(highestChallenge.split('|')[1])}" target="_blank">${highestChallenge.split('~')[1].split('|').join('')}</a>${highestChallenge.split('~')[2]}</span></span></label> <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(highestChallenge)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
                }
            }
        });
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                challengeArr.forEach((line) => {
                    if (line.includes(subSkill + '-challenge')) {
                        let index = challengeArr.indexOf(line);
                        challengeArr.splice(index, 1);
                    }
                });
            });
        }
        if (!!highestChallenge) {
            $(`.panel-active .challenge.skill-challenge.${skill + '-challenge'}`).html(`<label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][highestChallenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenge('${skill}', '${encodeRFC5987ValueChars(highestChallenge)}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${chunkInfo['challenges'][skill][highestChallenge]['Level']}] <span class="inner noscroll">${skill}</b>: ${highestChallenge.split('~')[0]}<a class='link noscroll' href="${"https://runescape.wiki/w/" + encodeForUrl(highestChallenge.split('|')[1])}" target="_blank">${highestChallenge.split('~')[1].split('|').join('')}</a>${highestChallenge.split('~')[2]}</span></span></label>` + ` <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openActiveContextMenu('${encodeRFC5987ValueChars(highestChallenge)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span>`);
            $(`.panel-active .challenge.skill-challenge.${skill + '-challenge'}`).attr('onclick', `showDetails('${encodeRFC5987ValueChars(highestChallenge)}', '${skill}', 'current')`);
        } else {
            $(`.panel-active .challenge.skill-challenge.${skill + '-challenge'}`).remove();
        }
    }
    if ($('.panel-active .skill-challenge').length === 0) {
        $('.marker-skill').remove();
    }
    if ($('.panel-active .bis-challenge').length === 0) {
        $('.marker-bis').remove();
    }
    if ($('.panel-active .quest-challenge').length === 0) {
        $('.marker-quest').remove();
    }
    if ($('.panel-active .diary-challenge').length === 0) {
        $('.marker-diary').remove();
    }
    if ($('.panel-active .extra-challenge').length === 0) {
        $('.marker-extra').remove();
    }
    if ($('.panel-active .challenge').length === 0) {
        if (checkFalseRules()) {
            $('.panel-active').append('Please select your Chunk Rules.');
        } else {
            $('.panel-active').append(`<span class="no-current">No current chunk tasks.</span>`);
        }
    }
    if (!noUpdate) {
        calcCurrentChallengesCanvas(true);
    }
    let backlogArr = setupBacklogArr();
    $('.panel-backlog').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
    $('.panel-backlog > i').css('line-height', '');
    (testMode || !(viewOnly || inEntry || locked)) && $('.panel-backlog').append(`<div class='noscroll backlogSources-container'><span class='noscroll backlogSources' onclick='backlogSources()'><i class="fas fa-archive"></i>Backlog Sources</span></div>`);
    $('.panel-backlog').append(...backlogArr);
    setData();
}

// Sets up the backlogArr for displaying
let setupBacklogArr = function() {
    let backlogArr = [];
    !!backloggedSources && Object.keys(backloggedSources).forEach((type) => {
        Object.keys(backloggedSources[type]).forEach((el) => {
            backlogArr.push(`<div class="challenge noscroll"><b class="noscroll">[Source]:</b> ${el}</div>`);
        });
    });
    !!backlog && Object.keys(backlog).forEach((skill) => {
        if (skill === 'Extra') {
            Object.keys(backlog[skill]).forEach((name) => {
                backlogArr.push(`<div class="challenge noscroll ${'Extra-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}">${name.split('~')[0]}<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name.split('|')[1])}" target="_blank">${name.split('~')[1].split('|').join('')}</a>${name.split('~')[2]} <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openBacklogContextMenu('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            });
        } else if (skill === 'Quest') {
            Object.keys(backlog[skill]).forEach((name) => {
                backlogArr.push(`<div class="challenge noscroll ${'Quest-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}">${name.split('~')[0]}<b class='noscroll'>[Quest]</b> <b class="noscroll"><a class="link" href="${"https://runescape.wiki/w/" + encodeForUrl(name.split('|')[1])}" target="_blank">${name.split('~')[1].split('|').join('')}</a></b>: ${name.split('~')[2] === ' Complete the quest' ? '' : 'Up to step'} ${name.split('~')[2]} <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openBacklogContextMenu('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            });
        } else if (skill === 'Diary') {
            Object.keys(backlog[skill]).forEach((name) => {
                backlogArr.push(`<div class="challenge noscroll ${'Diary-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}">${name.split('~')[0]}<b class='noscroll'>[Diary]</b> <b class="noscroll"><a class="link" href="${"https://runescape.wiki/w/" + encodeForUrl(name.split('|')[1])}" target="_blank">${name.split('~')[1].split('|').join('')}</a></b>: ${name.split('~')[2]} <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openBacklogContextMenu('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            });
        } else if (skill === 'BiS') {
            Object.keys(backlog[skill]).forEach((name) => {
                backlogArr.push(`<div class="challenge noscroll ${'BiS-' + name.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}"><b class='noscroll'>[${!!chunkInfo['challenges']['BiS'] && !!chunkInfo['challenges']['BiS'][name] ? chunkInfo['challenges']['BiS'][name]['Label'] : 'BiS'}]</b> ${name.split('~')[0]}<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl(name.split('|')[1])}" target="_blank">${name.split('~')[1].split('|').join('')}</a>${name.split('~')[2]} <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openBacklogContextMenu('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            });
        } else {
            !!chunkInfo['challenges'][skill] && Object.keys(backlog[skill]).forEach((name) => {
                !!chunkInfo['challenges'][skill][name] && backlogArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b class="noscroll">[${chunkInfo['challenges'][skill][name]['Level']}] ${skill}</b>: ${name.split('~')[0]}<a class='link' href="${"https://runescape.wiki/w/" + encodeForUrl((name.split('|')[1]))}" target="_blank">${name.split('~')[1].split('|').join('')}</a>${name.split('~')[2]} <span class="burger noscroll${!testMode && (viewOnly || inEntry || locked) ? ' hidden-burger' : ''}" onclick="openBacklogContextMenu('${encodeRFC5987ValueChars(name)}', '${skill}')"><i class="fas fa-sliders-h noscroll"></i></span></div>`);
            });
        }
    });
    if (backlogArr.length < 1) {
        backlogArr.push('No tasks currently backlogged.');
    }
    return backlogArr;
}

// Removes a challenge from the backlog
let unbacklogChallenge = function(challenge, skill) {
    challenge = decodeQueryParam(challenge);
    !!backlog[skill] && delete backlog[skill][challenge];
    if (!!backlog[skill] && Object.keys(backlog[skill]).length === 0) {
        !!backlog[skill] && delete backlog[skill];
    }
    if (skill !== 'Extra') {
        if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge] && !!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                !!backlog[subSkill] && delete backlog[subSkill][challenge];
                if (!!backlog[subSkill] && Object.keys(backlog[subSkill]).length === 0) {
                    delete backlog[subSkill];
                }
            });
        }
    }
    if (skill === 'Extra' || skill === 'Quest' || skill === 'Diary' || skill === 'BiS') {
        $(`.panel-backlog .challenge.${skill + '-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}`).remove();
    } else {
        $(`.panel-backlog .challenge.${skill}-challenge`).each(function(index) {
            if ($(this).text().includes(challenge.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, ''))) {
                $(this).remove();
            }
        });
    }
    if ($('.panel-backlog .challenge').length === 0) {
        $('.panel-backlog').append('No tasks currently backlogged.');
    }
    calcCurrentChallengesCanvas(true);
    setData();
}

// Removes a challenge from completed
let uncompleteChallenge = function(challenge, skill) {
    challenge = decodeQueryParam(challenge);
    delete completedChallenges[skill][challenge];
    if (Object.keys(completedChallenges[skill]).length === 0) {
        delete completedChallenges[skill];
    }
    if (skill !== 'Extra' && skill !== 'BiS') {
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            !!chunkInfo['challenges'][skill][challenge]['Skills'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).filter(subSkill => completedChallenges.hasOwnProperty(subSkill)).forEach((subSkill) => {
                !!completedChallenges[subSkill] && delete completedChallenges[subSkill][challenge];
                if (Object.keys(completedChallenges[subSkill]).length === 0) {
                    delete completedChallenges[subSkill];
                }
            });
        }
    }
    if (skill === 'Extra' || skill === 'Quest' || skill === 'Diary' || skill === 'BiS') {
        $(`.panel-completed .challenge.${skill + '-' + challenge.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge'}`).remove();
    } else {
        $(`.panel-completed .challenge.${skill}-challenge`).each(function(index) {
            if ($(this).text().includes(challenge.replaceAll(/\|/g, '').replaceAll(/~/g, '').replaceAll(/'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, ''))) {
                $(this).remove();
            }
        });
    }
    if ($('.panel-completed .challenge').length === 0) {
        $('.panel-completed').append('No tasks currently completed.');
    }
    calcCurrentChallengesCanvas(true);
    setData();
}

// Marks checked off challenge to save for later
let checkOffChallenge = function(skill, line) {
    line = decodeQueryParam(line);
    if (chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(line) && chunkInfo['challenges'][skill][line].hasOwnProperty('XpReward') && Object.keys(chunkInfo['challenges'][skill][line]['XpReward']).filter(skill => { return !skillNamesXp.includes(skill) }).length > 0 && (!assignedXpRewards.hasOwnProperty(skill) || !assignedXpRewards[skill].hasOwnProperty(line)) && $($('.' + skill + '-' + line.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge').find('input')[0]).prop('checked')) {
        let challengeLine = $('.' + skill + '-' + line.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-challenge');
        $(challengeLine).removeClass('hide-backlog');
        $($(challengeLine).find('input')[0]).prop('checked', false);
        openXpRewardModalWithFormat(skill, line);
    } else {
        if (!checkedChallenges.hasOwnProperty(skill) || !checkedChallenges[skill].hasOwnProperty(line)) {
            if (!checkedChallenges.hasOwnProperty(skill)) {
                checkedChallenges[skill] = {};
            }
            checkedChallenges[skill][line] = true;
        } else {
            delete checkedChallenges[skill][line];
        }
        $('.panel-active .challenge:has(input:checked)').addClass('hide-backlog');
        $('.panel-active .challenge:not(:has(input:checked))').removeClass('hide-backlog');
        oldSavedChallengeArr = [];
        $('.panel-active').contents().each((i, val) => {
            oldSavedChallengeArr.push($(val).html());
        });
        setupCurrentChallenges(tempChallengeArrSaved, true);
        changeChallengeColor();
        setData();
        setTaskNum();
        toggleHiddenTasks(settings['hideChecked'] && actuallyHideChecked);
    }
}

// Marks checked off rules
let checkOffRules = function(didRedo, startup) {
    let redo = false;
    Object.keys(rules).forEach((rule) => {
        if (subRuleDefault[rule] && rules[rule] !== $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule input').prop('checked')) {
            $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('checked', subRuleDefault[rule]);
            redo = true;
        }
        if (rule === 'Kill X Amount') {
            if ($('.x-num-input').val() < 1) {
                $('.x-num-input').val(1);
            }
            rules[rule] = $('.x-num-input').val();
        } else if (rule === 'Rare Drop Amount') {
            if ($('.rare-num-input').val() < 0) {
                $('.rare-num-input').val(0);
            }
            rules[rule] = $('.rare-num-input').val();
        } else if (rule === 'Secondary Primary Amount') {
            if ($('.secondary-primary-input').val() < 0) {
                $('.secondary-primary-input').val(0);
            }
            rules[rule] = $('.secondary-primary-input').val();
        } else {
            rules[rule] = $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule input').prop('checked');
        }
        if ($('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').length) {
            if (rules[rule] && (!(viewOnly || inEntry || locked) || testMode)) {
                $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').children('.checkbox').removeClass('checkbox--disabled');
                $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', false);
            } else {
                $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').children('.checkbox').addClass('checkbox--disabled');
                $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', true);
            }
            if (!rules[rule]) {
                $('.' + rule.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('checked', false);
                redo = true;
            }
        }
    });
    if (redo && !didRedo) {
        checkOffRules(true, startup);
        return;
    }
    if (!startup) {
        calcCurrentChallengesCanvas(true);
        rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
        !rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
        setData();
    }
}

// Marks checked off settings
let checkOffSettings = function(didRedo, startup) {
    let redo = false;
    Object.keys(settings).forEach((setting) => {
        if (subSettingDefault[setting] && settings[setting] !== $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting input').prop('checked')) {
            $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('checked', subSettingDefault[setting]);
            redo = true;
        }
        if (setting !== 'completedTaskColor' && setting !== 'defaultStickerColor' && setting !== 'startingChunk' && setting !== 'theme' && settingNames.hasOwnProperty(setting)) {
            settings[setting] = $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting input').prop('checked');
        }
        if ($('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').length) {
            if (settings[setting] && (!(viewOnly || inEntry || locked) || testMode)) {
                $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').children('.checkbox').removeClass('checkbox--disabled');
                $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', false);
            } else {
                $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').children('.checkbox').addClass('checkbox--disabled');
                $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', true);
            }
            if (!settings[setting]) {
                $('.' + setting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('checked', false);
                redo = true;
            }
        }
    });
    !!settingsStructureConflict && Object.keys(settingsStructureConflict).forEach((setting) => {
        Array.isArray(settingsStructureConflict[setting]) && settingsStructureConflict[setting].forEach((subSetting) => {
            $('.' + subSetting.replaceAll(' ', '_').replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^\`{|}~]/g, '').toLowerCase() + '-setting input').prop('disabled', settings[setting]);
        });
    });
    if (redo && !didRedo) {
        checkOffSettings(true, startup);
        return;
    }
    toggleIds(settings['ids']);
    toggleVisibility(settings['highvis']);
    toggleTheme(settings['theme']);
    toggleNeighbors(settings['neighbors'], startup);
    toggleRemove(settings['remove'], startup);
    toggleRoll2(settings['roll2'], startup);
    toggleUnpick(settings['unpick'], startup);
    !onMobile && toggleRecent(settings['recent'], startup);
    !onMobile && toggleChunkInfo(settings['info'], startup);
    !onMobile && toggleChunkTasks(settings['chunkTasks'], startup);
    !onMobile && toggleTopButtons(settings['topButtons'], startup);
    !onMobile && toggleTaskSidebar(settings['taskSidebar'], startup);
    toggleHiddenTasks(settings['hideChecked'] && actuallyHideChecked);
    settings['hideChecked'] ? $(`.tasks-checkmark`).show() : $(`.tasks-checkmark`).hide();
    changeChallengeColor();
    if (!startup) {
        setData();
    }
    if (isPicking && !settings['randomStartAlways']) {
        $('.pick').text('Pick for me');
    } else if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
        $('.pick').text('Random Start?');
    } else {
        $('.pick').text('Pick Chunk');
    }
    setTaskNum();
}

// Moves checked off challenges to completed
let completeChallenges = function(noCalc) {
    let checkedChallengesTemp = decodeObject(checkedChallenges);
    Object.keys(checkedChallengesTemp).forEach((skill) => {
        Object.keys(checkedChallengesTemp[skill]).forEach((name) => {
            if (!completedChallenges[skill]) {
                completedChallenges[skill] = {};
            }
            if (skill === 'Extra' && name.match(/Kill .* ~|.*|~/)) {
                completedChallenges[skill][name.replace(/Kill .* ~/, 'Kill X ~')] = checkedChallengesTemp[skill][name];
            } else {
                completedChallenges[skill][name] = decodeObject(checkedChallengesTemp[skill][name]);
            }
        });
    });
    checkedChallenges = {};
    setCalculating('.panel-completed');
    setupCurrentChallenges(tempChallengeArrSaved);
    !noCalc && calcCurrentChallengesCanvas(true, true, true);
}

// Gets and displays info on the given quest
let getQuestInfo = function(quest) {
    $('.menu10').css('opacity', 1).show();
    quest = decodeQueryParam(quest);
    $('.questname-content').html(`<a class='link noscroll' href="${'https://runescape.wiki/w/' + encodeForUrl(quest)}" target='_blank'>${quest}</a>`);
    $('.panel-questdata').empty();
    let unlocked = { ...possibleAreas };
    !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).forEach((chunkId) => {
        unlocked[parseInt(chunkId)] = true;
    });
    questChunks = [];
    chunkInfo['quests'][quest].split(', ').forEach((chunkId) => {
        chunkId = chunkId.split('-')[0];
        let chunkName = chunkId;
        let aboveground = false;
        !!chunkInfo['chunks'][encodeRFC5987ValueChars(chunkName)] && !!chunkInfo['chunks'][encodeRFC5987ValueChars(chunkName)]['Nickname'] && (aboveground = true);
        if (aboveground) {
            questChunks.push(chunkName);
            chunkName = chunkInfo['chunks'][encodeRFC5987ValueChars(chunkName)]['Nickname'] + ' (' + chunkName + ')';
            $('.panel-questdata').append(`<b class="noscroll"><div class="noscroll ${!!unlocked[chunkId] && ' + valid-chunk'}">` + `<span onclick="redirectPanelCanvas('` + encodeRFC5987ValueChars(chunkId) + `')"><i class="quest-icon fas fa-crosshairs"></i></span> ` + `<span class="noscroll ${aboveground && ' + click'}" ${aboveground && `onclick="scrollToChunkCanvas(${chunkId})"`}>` + chunkName + '</span></div></b>');
        } else if (chunksPlus[chunkName.split('[+]')[0] + '[+]']) {
            $('.panel-questdata').append(`<b class="noscroll"><div class="noscroll"><i class='noscroll'>Any ${chunkName.split('[+]x')[1] || 1} of:</i></div></b>`);
            chunksPlus[chunkName.split('[+]')[0] + '[+]'].forEach((plus) => {
                plus = plus.split('-')[0];
                let abovegroundPlus = false;
                let chunkNamePlus = plus;
                !!chunkInfo['chunks'][encodeRFC5987ValueChars(chunkNamePlus)] && !!chunkInfo['chunks'][encodeRFC5987ValueChars(chunkNamePlus)]['Nickname'] && (abovegroundPlus = true);
                if (abovegroundPlus) {
                    questChunks.push(chunkNamePlus);
                    chunkNamePlus = chunkInfo['chunks'][encodeRFC5987ValueChars(chunkNamePlus)]['Nickname'] + ' (' + chunkNamePlus + ')';
                }
                $('.panel-questdata').append(`<b class="noscroll"><div class="noscroll ${!!unlocked[plus] && ' + valid-chunk'} valid-subchunk">` + `<span onclick="redirectPanelCanvas('` + encodeRFC5987ValueChars(plus) + `')"><i class="quest-icon fas fa-crosshairs"></i></span> ` + `<span class="noscroll ${abovegroundPlus && ' + click'}" ${abovegroundPlus && `onclick="scrollToChunkCanvas(${plus})"`}>` + chunkNamePlus + '</span></div></b>');
            });
        } else {
            $('.panel-questdata').append(`<b class="noscroll"><div class="noscroll ${!!unlocked[chunkId] && ' + valid-chunk'}">` + `<span onclick="redirectPanelCanvas('` + encodeRFC5987ValueChars(chunkId) + `')"><i class="quest-icon fas fa-crosshairs"></i></span> ` + `<span class="noscroll ${aboveground && ' + click'}" ${aboveground && `onclick="scrollToChunkCanvas(${chunkId})"`}>` + chunkName + '</span></div></b>');
        }
    });
}

// Toggles the quest info panel on and off
let toggleQuestInfo = function() {
    if (parseInt($('.menu10').css('opacity')) === 1) {
        $('.menu10').css('opacity', 0).hide();
        $('.questname-content').html('');
    } else if (!!$('.questname-content').html() && $('.questname-content').html().length > 0) {
        $('.menu10').css('opacity', 1).show();
    }
}

// Toggles the visibility of the create map pin
let toggleChangePinCreateVis = function() {
    $('.change-pin-eye0').toggleClass('fa-eye fa-eye-slash');
    $('.pin.new').attr('type', $('.pin.new').attr('type') === 'text' ? 'password' : 'text');
}

// Toggles the visibility of the old map pin
let toggleChangePinVis = function() {
    $('.change-pin-eye1').toggleClass('fa-eye fa-eye-slash');
    $('.pin.old2.first').attr('type', $('.pin.old2.first').attr('type') === 'text' ? 'password' : 'text');
}

// Toggles the visibility of the new map pin
let toggleChangePinNewVis = function() {
    $('.change-pin-eye2').toggleClass('fa-eye fa-eye-slash');
    $('.pin.old2.second').attr('type', $('.pin.old2.second').attr('type') === 'text' ? 'password' : 'text');
}

// Checks the MID from the url
let checkMID = function(mid) {
    if (mid === 'change-password') {
        atHome = true;
        $('.loading, .ui-loader-header').remove();
        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv, .menu11, .menu12, .menu13').hide();
        $('#home-menu, .entry-home-menu-container, .entry-home-menu-extra').hide();
        onMobile && $('#pin-menu').addClass('mobile');
        $('#pin-menu').show();
        $('.mid-old').focus();
        $('html, body').addClass('change-password');
    } else if (mid === 'about') {
        atHome = true;
        $('.loading, .ui-loader-header').remove();
        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv, .menu11, .menu12, .menu13').hide();
        $('#home-menu, .entry-home-menu-container, .entry-home-menu-extra').hide();
        onMobile && $('#about-menu').addClass('mobile');
        $('#about-menu').show();
        $('html, body').addClass('about');
    /*} else if (mid === 'maps-list') {
        window.location.replace(`https://docs.google.com/spreadsheets/d/e/2PACX-1vRdsOtdI264xc_c4rXKnSr9SVyz3tn7IiJvd5OQzOU5TgnNjiW5vizAwtK5vJzoaAFVBbOdruPCtPRM/pubhtml?gid=1831536443&single=true`);*/ // Not implemented
    } else if (mid) {
        if (mid.split('-')[1] === 'view') {
            mid = mid.split('-')[0];
            viewOnly = true;
            proceed();
        }
        databaseRef.child('mapids/' + mid).once('value', function(snap) {
            if (snap.val() && (!onTestServer || patreonMaps[mid])) {
                myRef = firebase.database().ref('maps/' + mid);
                atHome = false;
                $('.background-img').hide();
                inEntry = true && !viewOnly;
            } else {
                databaseRef.child('maps/' + mid).once('value', function(snap2) {
                    if (!snap2.val()) {
                        databaseRef.child('highscores/players/' + mid.toLowerCase().replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('[+]', ' ')).once('value', function(snap3) {
                            if (!!snap3.val()) {
                                window.location.replace(window.location.href.split('?')[0] + '?' + snap3.val());
                            } else if (contentCreators.hasOwnProperty(mid.toLowerCase().replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('[+]', ' '))) {
                                window.location.assign(window.location.href.split('?')[0] + '?' + contentCreators[mid.toLowerCase().replaceAll('%20', ' ').replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('[+]', ' ')]);
                            } else {
                                databaseRef.child('mapids/' + mid.toLowerCase()).once('value', function(snap4) {
                                    if (!!snap4.val()) {
                                        window.location.replace(window.location.href.split('?')[0] + '?' + mid.toLowerCase());
                                    } else {
                                        window.location.replace(window.location.href.split('?')[0]);
                                        atHome = true;
                                        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .menu11, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv, .gomobiletasks, .menu12, .menu13').hide();
                                        $('.loading, .ui-loader-header').remove();
                                    }
                                });
                            }
                        });
                    } else {
                        myRef = firebase.database().ref('maps/' + mid);
                        atHome = false;
                        $('.background-img').hide();
                        inEntry = true && !viewOnly;
                        databaseRef.child('mapids/' + mid).set(true);
                    }
                });
            }
            setupMap();
        });
    } else {
        atHome = true;
        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .menu11, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, .canvasDiv, .gomobiletasks, .menu12, .menu13').hide();
        $('.loading, .ui-loader-header').remove();
        onMobile && $('.entry-home-menu-container, #home-menu').addClass('mobile');
        onMobile && $('#page1search, .entry-home-about').remove();
        setupMap();
    }
}

// Regains connectivity to firebase
let regainConnectivity = function(_callback) {
    if (Date.now() > lastRegain + 1000) {
        lastRegain = Date.now();
        firebase.auth().signOut();
        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(() => {
            _callback();
        });
    }
}

// Loads data from codeItems into various data structures
let setCodeItems = function() {
    let codeItems = chunkInfo['codeItems'];
    boneItems = codeItems['boneItems'];
    rangedItems = codeItems['rangedItems'];
    elementalRunes = codeItems['elementalRunes'];
    itemsPlus = codeItems['itemsPlus'];
    objectsPlus = codeItems['objectsPlus'];
    chunksPlus = codeItems['chunksPlus'];
    monstersPlus = codeItems['monstersPlus'];
    npcsPlus = codeItems['npcsPlus'];
    mixPlus = codeItems['mixPlus'];
    tasksPlus = codeItems['tasksPlus'];
    tools = codeItems['tools'];
    magicTools = codeItems['magicTools'];
    dropTables = codeItems['dropTables'];
    elementalStaves = codeItems['elementalStaves'];
    bossLogs = codeItems['bossLogs'];
    bossMonsters = codeItems['bossMonsters'];
    minigameShops = codeItems['minigameShops'];
    slayerTasks = codeItems['slayerTasks'];
}

// Combines JSONs
let combineJSONs = function(a, b) {
    let temp = {};
    !!a && Object.keys(a).forEach((sub) => {
        if (typeof a[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], a[sub]);
        } else {
            temp[sub] = a[sub];
        }
    });
    !!b && Object.keys(b).forEach((sub) => {
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

// Checks if image exists
let checkIfImageExists = function(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
            callback(true);
        };
        
        img.onerror = () => {
            callback(false);
        };
    }
}

// Preloads chunk images
let preloadChunkImages = async function(elArr) {
    let imgs = [];
    let xCoord;
    let yCoord;
    !!elArr && elArr.forEach((chunkId) => {
        xCoord = Math.floor(parseInt(chunkId) / 256) - 28;
        yCoord = 72 - (parseInt(chunkId) % 256);
        imgs.push('./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png');
    });
    await preloadImages(imgs);
}

// Preloads images
let preloadImages = async function(imgs) {
    let load = imgs.filter((a) => !imagesPreloaded[a]).map(async a => {
        let img = new Image();
        img.src = a;
        imagesPreloaded[a] = true;
        return await new Promise(res => {
            img.onload = () => res(img);
        });
    });
    await Promise.all(load);
}

// Loads data from Firebase
let loadData = function(startup) {
    if (!myRef) {
        return;
    }
    $.getJSON('./rs3-chunkpicker-chunkinfo-export.json', function(data) {
        gotData = true;
        chunkInfo = data;
        setCodeItems();

        skillNames.forEach((skill) => {
            if (!chunkInfo['challenges'][skill]) {
                chunkInfo['challenges'][skill] = {};
            }
        });
        !!chunkInfo['challenges']['Quest'] && Object.keys(chunkInfo['challenges']['Quest']).forEach((name) => {
            if (chunkInfo['challenges']['Quest'][name].hasOwnProperty('QuestPoints')) {
                questLastStep['~|' + chunkInfo['challenges']['Quest'][name]['BaseQuest'] + '|~ Complete the quest'] = name;
            }
        });
        myRef.once('value', function(snap) {
            let picking = false;
            let settingsTemp = snap.val()['settings'];
            let rulesTemp = snap.val()['rules'] || {};
            randomLoot = decodeObject(snap.val()['randomLoot']) || {};
            let chunks = decodeObject(snap.val()['chunks']);
            tempChunks = chunks || {};
            recent = decodeObject(snap.val()['recent']) || [];
            recentTime = decodeObject(snap.val()['recentTime']) || [];
            chunkOrder = decodeObject(snap.val()['chunkOrder']) || [];
            friends = decodeObject(snap.val()['friends']) || {};
            friendsAlt = decodeObject(snap.val()['friendsAlt']) || {};
            chunkNotes = decodeObject(snap.val()['chunkNotes']) || null;
            settingsTemp['highvis'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('highvis=true') >= 0
            }).length > 0;
            settingsTemp['info'] = !(document.cookie.split(';').filter(function(item) {
                return item.indexOf('newinfo=false') >= 0
            }).length > 0);
            settingsTemp['ids'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('ids=true') >= 0
            }).length > 0;
            settingsTemp['infocollapse'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('infocollapse=true') >= 0
            }).length > 0;
            
            Object.keys(tempChunks).forEach((section) => {
                Object.keys(tempChunks[section]).filter(chunkId => { let coords = convertToXY(chunkId); return tempChunks[section][chunkId] === 'undefined' || tempChunks[section][chunkId] === 'NaN' || chunkId === 'undefined' || chunkId === 'NaN' || coords.x >= rowSize || coords.y >= (fullSize / rowSize) || coords.x < 0 || coords.y < 0 }).forEach((chunkId) => {
                    delete tempChunks[section][chunkId];
                });
            });

            if (!tempChunks['selected']) {
                tempChunks['selected'] = {};
            }
            
            let chunkOrderArr = Object.keys(chunkOrder).sort().reverse();
            let innerCount = 0;
            let notFound = true;
            for (let count = 1; count <= 5; count++) {
                notFound = true;
                while (notFound && innerCount < chunkOrderArr.length) {
                    if (innerCount === 0 || chunkOrder[chunkOrderArr[innerCount]] !== chunkOrder[chunkOrderArr[innerCount - 1]] || chunkOrderArr[innerCount - 1] - chunkOrderArr[innerCount] > 10000) {
                        let tempDate = new Date();
                        tempDate.setTime(chunkOrderArr[innerCount]);
                        $('#recentChunks' + count).html('<span class="time">' + tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2] + ': </span><span class="chunk' + (chunkOrder[chunkOrderArr[innerCount]] ? '' : 'none') + '" onclick="recentChunkCanvas(recentChunks' + count + ')">' + chunkOrder[chunkOrderArr[innerCount]] + '</span>');
                        notFound = false;
                    }
                    innerCount++;
                }
                if (notFound) {
                    $('#recentChunks' + count).html('<span class="chunknone" onclick="recentChunkCanvas(recentChunks' + count + ')">-</span>');
                }
            }
            if (!!recentTime[0]) {
                $('#recentChunksTitle > b').text(Math.max(Math.floor((new Date().getTime() - chunkOrderArr[0]) / (1000 * 3600 * 24)), 0) + ' days since last roll');
            }

            checkedChallenges = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['checkedChallenges'] ? decodeObject(snap.val()['chunkinfo']['checkedChallenges']) : {};
            completedChallenges = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['completedChallenges'] ? decodeObject(snap.val()['chunkinfo']['completedChallenges']) : {};
            backlog = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['backlog'] ? decodeObject(snap.val()['chunkinfo']['backlog']) : {};
            possibleAreas = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['possibleAreas'] ? decodeObject(snap.val()['chunkinfo']['possibleAreas']) : {};
            manualAreas = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualAreas'] ? decodeObject(snap.val()['chunkinfo']['manualAreas']) : {};
            manualTasks = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualTasks'] ? decodeObject(snap.val()['chunkinfo']['manualTasks']) : {};
            manualEquipment = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualEquipment'] ? decodeObject(snap.val()['chunkinfo']['manualEquipment']) : {};
            manualSections = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualSections'] ? decodeObject(snap.val()['chunkinfo']['manualSections']) : {};
            backloggedSources = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['backloggedSources'] ? decodeObject(snap.val()['chunkinfo']['backloggedSources']) : {};
            altChallenges = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['altChallenges'] ? decodeObject(snap.val()['chunkinfo']['altChallenges']) : {};
            manualMonsters = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualMonsters'] ? decodeObject(snap.val()['chunkinfo']['manualMonsters']) : {};
            slayerLocked = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['slayerLocked'] ? decodeObject(snap.val()['chunkinfo']['slayerLocked']) : null;
            constructionLocked = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['constructionLocked'] ? decodeObject(snap.val()['chunkinfo']['constructionLocked']) : null;
            passiveSkill = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['passiveSkill'] ? decodeObject(snap.val()['chunkinfo']['passiveSkill']) : null;
            prevValueLevelInput = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['prevValueLevelInput'] ? decodeObject(snap.val()['chunkinfo']['prevValueLevelInput']) : {'Combat': 3, 'Slayer': 1, 'ignoreCombatLevel': false, 'krystiliaSlayerCreatures': false, 'ClueSteps': 0};
            checkedAllTasks = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['checkedAllTasks'] ? decodeObject(snap.val()['chunkinfo']['checkedAllTasks']) : {};
            //settingsTemp['highscoreEnabled'] && enableHighscore('startup'); //TEMP (highscore not enabled)
            settingsTemp['infocollapse'] && hideChunkInfo('startup');
            infoCollapse = settingsTemp['infocollapse'];
            if (settingsTemp['recent'] === undefined) {
                settingsTemp['recent'] = true;
            }
            if (settingsTemp['help'] === undefined) {
                settingsTemp['help'] = true;
            }
            if (settingsTemp['chunkTasks'] === undefined) {
                settingsTemp['chunkTasks'] = true;
            }
            if (settingsTemp['topButtons'] === undefined) {
                settingsTemp['topButtons'] = true;
            }
            
            (!settingsTemp['mapIntro'] || (!settingsTemp['startingChunk'] || settingsTemp['startingChunk'] === '0000' || settingsTemp['startingChunk'] === '00000')) && (mapIntroOpenSoon = true);
            justStartingChunkSet = (settingsTemp['mapIntro'] && (!settingsTemp['startingChunk'] || settingsTemp['startingChunk'] === '0000' || settingsTemp['startingChunk'] === '00000'));
            if (!mapIntroOpenSoon) {
                settingsTemp['help'] && (helpMenuOpenSoon = true);
                (!settingsTemp['patchNotes'] || (settingsTemp['patchNotes'] !== patchNotesVersion)) && (patchNotesOpenSoon = true);
            }

            if (settingsTemp['highscoreEnabled'] && false) { //TEMP (highscore not enabled)
                userName = snap.val()['userName'];
                $('.highscoretoggle').html('Change chunk stats username<i class="pic fas fa-trophy"></i>');
            }

            // Rule extenders

            if (!rulesTemp.hasOwnProperty('Show Diary Tasks Any')) {
                rulesTemp['Show Diary Tasks Any'] = rulesTemp.hasOwnProperty('Skillcape') ? rulesTemp['Skillcape'] : false;
            }

            if (!rulesTemp.hasOwnProperty('Jars')) {
                rulesTemp['Jars'] = rulesTemp.hasOwnProperty('Pets') ? rulesTemp['Pets'] : false;
            }

            if (!rulesTemp.hasOwnProperty('InsidePOH Primary')) {
                rulesTemp['InsidePOH Primary'] = rulesTemp.hasOwnProperty('InsidePOH') ? rulesTemp['InsidePOH'] : false;
            }

            if (!rulesTemp.hasOwnProperty('Spells')) {
                rulesTemp['Spells'] = true;
            }

            if (rulesTemp['Secondary Primary'] && !rulesTemp.hasOwnProperty('Secondary Primary Amount')) {
                rulesTemp['Secondary Primary Amount'] = "0";
            } else if (!rulesTemp['Secondary Primary'] && !rulesTemp.hasOwnProperty('Secondary Primary Amount')) {
                rulesTemp['Secondary Primary Amount'] = "1";
            }
            
            if (!rulesTemp.hasOwnProperty('Forestry')) {
                rulesTemp['Forestry'] = true;
            }

            !!rulesTemp && Object.keys(rulesTemp).forEach((rule) => {
                rules[rule] = rulesTemp[rule];
            });

            Object.keys(settingsTemp).forEach((setting) => {
                settings[setting] = settingsTemp[setting];
            });
            toggleIds(settings['ids']);
            toggleVisibility(settings['highvis']);
            toggleTheme(settings['theme']);
            toggleNeighbors(settings['neighbors'], 'startup');
            toggleRemove(settings['remove'], 'startup');
            toggleRoll2(settings['roll2'], 'startup');
            toggleUnpick(settings['unpick'], 'startup');
            toggleRecent(settings['recent'], 'startup');
            toggleChunkInfo(settings['info'], 'startup');
            toggleChunkTasks(settings['chunkTasks'], 'startup');
            toggleTopButtons(settings['topButtons'], 'startup');
            toggleTaskSidebar(settings['taskSidebar'], 'startup');
            settings['hideChecked'] ? $(`.tasks-checkmark`).show() : $(`.tasks-checkmark`).hide();

            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;

            $('#chunkInfo2').text('Selected chunks: ' + ((!!tempChunks['selected'] ? Object.keys(tempChunks['selected']).length : 0) + (!!tempChunks['potential'] ? Object.keys(tempChunks['potential']).length : 0)));
            $('#chunkInfo1').text('Unlocked chunks: ' + (!!tempChunks['unlocked'] ? Object.keys(tempChunks['unlocked']).length : 0));
            picking = chunks && chunks['potential'];

            stickered = (chunks ? chunks['stickered'] : {}) || {};
            stickeredNotes = (chunks ? chunks['stickeredNotes'] : {}) || {};
            stickeredColors = (chunks ? chunks['stickeredColors'] : {}) || {};

            mid === roll5Mid && $('.roll2').text('Roll 5');
            if (picking) {
                $('.unpick').css({ 'opacity': 0, 'cursor': 'default' }).prop('disabled', true).hide();
                !settings['randomStartAlways'] ? $('.pick').text('Pick for me') : $('.pick').text('Random Start?');
                $('.roll2').text('Unlock both');
                mid === roll5Mid && $('.roll2').text('Unlock all');
                isPicking = true;
            } else {
                $('.pick').text('Pick Chunk');
                $('.roll2').text('Roll 2');
                mid === roll5Mid && $('.roll2').text('Roll 5');
                isPicking = false;
            }
            if (((!tempChunks['unlocked'] || Object.keys(tempChunks['unlocked']).length === 0) && (!tempChunks['selected'] || Object.keys(tempChunks['selected']).length === 0)) || settings['randomStartAlways']) {
                $('.pick').text('Random Start?');
            }
            oldSavedChallengeArr = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['oldSavedChallengeArr'] ? decodeObject(snap.val()['chunkinfo']['oldSavedChallengeArr']) : [];
            if (oldSavedChallengeArr.length > 0) {
                chunkTasksOn && setCurrentChallenges(['No tasks currently backlogged.'], ['No tasks currently completed.'], true);
            }
            assignedXpRewards = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['assignedXpRewards'] ? decodeObject(snap.val()['chunkinfo']['assignedXpRewards']) : {};
            chunkTasksOn && calcCurrentChallengesCanvas(true, true, !viewOnly);
            rulesModalOpen && showRules();
            if (!startup) {
                rules['Manually Complete Tasks'] && !viewOnly && !inEntry && !locked ? $('.open-complete-container').css('opacity', 1).show() : $('.open-complete-container').css('opacity', 0).hide();
            }
            questFilterType = 'all';
            
            doneLoading();
            setUpSelected();
            chunkTasksOn && $(`.challenge.clickable`).removeClass('clickable');
            recentlyTestMode = false;
        });
    });
}

// Sets browser cookie
let setCookies = function() {
    if (onTestServer || testMode) {
        return;
    }
    document.cookie = "ids=" + showChunkIds + ";Max-Age=63072000;SameSite=Strict";
    document.cookie = "highvis=" + highVisibilityMode + ";Max-Age=63072000;SameSite=Strict";
    document.cookie = "newinfo=" + chunkInfoOn + ";Max-Age=63072000;SameSite=Strict";
    document.cookie = "infocollapse=" + infoCollapse + ";Max-Age=63072000;SameSite=Strict";
}

// Stores data in Firebase
let setRecentLogin = function() {
    if (onTestServer || testMode) {
        return;
    }
    signedIn && firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(function() {
        myRef.child('recentLoginTime').set(new Date().getTime());
    }).catch(function(error) {
        regainConnectivity(() => {
            myRef.child('recentLoginTime').set(new Date().getTime());
        });
    });
}

// Stores data in Firebase
let setUsername = function(old) {
    return; //TEMP (highscore not enabled)
    if (onTestServer || testMode) {
        return;
    }
    signedIn && firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(function() {
        myRef.child('userName').set(userName.toLowerCase());
        if (!!old && old !== '') {
            databaseRef.child('highscores/players/' + old.toLowerCase()).set(null);
        }
        databaseRef.child('highscores/players/' + userName.toLowerCase()).set(mid);
        highscoreEnabled = true;
        setData();
    }).catch(function(error) {
        regainConnectivity(() => {
            myRef.child('userName').set(userName.toLowerCase());
            if (!!old && old !== '') {
                databaseRef.child('highscores/players/' + old.toLowerCase()).set(null);
            }
            databaseRef.child('highscores/players/' + userName.toLowerCase()).set(mid);
            highscoreEnabled = true;
            setData();
        });
    });
}

// Stores data in Firebase
let setData = function() {
    if (onTestServer || testMode || recentlyTestMode) {
        return;
    }
    if (signedIn && firebase.auth().currentUser) {
        myRef.child('test').set(null, (error) => {
            if (error) {
                regainConnectivity(() => {
                    setData();
                    return;
                });
            } else {
                Object.keys(rules).forEach((rule) => {
                    if (rules[rule] === undefined) {
                        rules[rule] = false;
                    }
                });
                myRef.update({ rules: rules, recent: encodeObject(recent, true), recentTime: encodeObject(recentTime, true), randomLoot: encodeObject(randomLoot, true), friends: encodeObject(friends, true), friendsAlt: encodeObject(friendsAlt, true), chunkNotes: encodeObject(chunkNotes, true) });
                myRef.child('settings').update({ 'neighbors': autoSelectNeighbors, 'walkableRollable': settings['walkableRollable'], 'autoWalkableRollable': settings['autoWalkableRollable'], 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'randomStartAlways': settings['randomStartAlways'], 'recent': recentOn, 'cinematicRoll': settings['cinematicRoll'], 'highscoreEnabled': false, 'chunkTasks': chunkTasksOn, 'topButtons': topButtonsOn, 'completedTaskColor': settings['completedTaskColor'], 'completedTaskStrikethrough': settings['completedTaskStrikethrough'], 'taskSidebar': settings['taskSidebar'], 'allTasks': settings['allTasks'], 'startingChunk': settings['startingChunk'], 'numTasksPercent': settings['numTasksPercent'], 'help': !(!helpMenuOpen && !helpMenuOpenSoon), 'patchNotes': (!patchNotesOpen && !patchNotesOpenSoon) ? patchNotesVersion : settings['patchNotes'], 'mapIntro': !mapIntroOpen && !mapIntroOpenSoon, 'theme': theme, 'newTasks': settings['newTasks'], 'hideChecked': settings['hideChecked'], 'shiftUnlock': settings['shiftUnlock'], rollWarning: settings['rollWarning'], optOutSections: settings['optOutSections'] }); //TEMP (highscore not enabled)
                myRef.child('chunkinfo').update({ checkedChallenges: encodeObject(checkedChallenges, true), completedChallenges: encodeObject(completedChallenges, true), backlog: encodeObject(backlog, true), possibleAreas: encodeObject(possibleAreas, true), manualTasks: encodeObject(manualTasks, true), manualEquipment: encodeObject(manualEquipment, true), backloggedSources: encodeObject(backloggedSources, true), altChallenges: encodeObject(altChallenges, true), manualMonsters: encodeObject(manualMonsters, true), slayerLocked: encodeObject(slayerLocked, true), passiveSkill: encodeObject(passiveSkill, true), oldSavedChallengeArr: encodeObject(oldSavedChallengeArr, true), assignedXpRewards: encodeObject(assignedXpRewards, true), manualAreas: encodeObject(manualAreas, true), manualSections: encodeObject(manualSections, true), prevValueLevelInput: encodeObject(prevValueLevelInput, true), checkedAllTasks: encodeObject(checkedAllTasks, true) });

                let tempJson = {};
                !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).filter(chunkId => { return tempChunks['unlocked'][chunkId] !== 'undefined' && tempChunks['unlocked'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                    tempJson[chunkId] = chunkId;
                });
                myRef.child('chunks/unlocked').set(tempJson);
                let walkableUnlockedChunks;
                if (highscoreEnabled || true) {
                    walkableUnlockedChunks = 0;
                    chunkInfo['walkableChunks'].forEach((chunkId) => {
                        if (tempJson.hasOwnProperty(chunkId)) {
                            walkableUnlockedChunks++;
                        }
                    });
                }

                tempJson = {};
                !!tempChunks['selected'] && Object.keys(tempChunks['selected']).filter(chunkId => { return tempChunks['selected'][chunkId] !== 'undefined' && tempChunks['selected'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                    tempJson[chunkId] = tempSelectedChunks.indexOf(chunkId) + 1;
                });
                myRef.child('chunks/selected').set(tempJson);

                tempJson = {};
                !!tempChunks['potential'] && Object.keys(tempChunks['potential']).filter(chunkId => { return tempChunks['potential'][chunkId] !== 'undefined' && tempChunks['potential'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                    tempJson[chunkId] = chunkId;
                });
                myRef.child('chunks/potential').set(tempJson);

                tempJson = {};
                !!tempChunks['blacklisted'] && Object.keys(tempChunks['blacklisted']).filter(chunkId => { return tempChunks['blacklisted'][chunkId] !== 'undefined' && tempChunks['blacklisted'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                    tempJson[chunkId] = chunkId;
                });
                myRef.child('chunks/blacklisted').set(tempJson);

                myRef.child('chunks/stickered').set(stickered);
                myRef.child('chunks/stickeredNotes').set(encodeObject(stickeredNotes, true));
                myRef.child('chunks/stickeredColors').set(stickeredColors);

                /*highscoreEnabled && databaseRef.child('highscores/skills/Unlocked Chunks/' + mid).update({
                    mid: mid,
                    name: userName.toLowerCase(),
                    score: walkableUnlockedChunks,
                });*/ //TEMP (highscore not enabled)

                /*highscoreEnabled && databaseRef.child('highscores/playerskills/' + mid + '/85').update({
                    0: walkableUnlockedChunks
                });*/ //TEMP (highscore not enabled)
            }
        });
    } else if (signedIn && !firebase.auth().currentUser) {
        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(function() {
            Object.keys(rules).forEach((rule) => {
                if (rules[rule] === undefined) {
                    rules[rule] = false;
                }
            });
            myRef.update({ rules: rules, recent: encodeObject(recent, true), recentTime: encodeObject(recentTime, true), randomLoot: encodeObject(randomLoot, true), friends: encodeObject(friends, true), friendsAlt: encodeObject(friendsAlt, true), chunkNotes: encodeObject(chunkNotes, true) });
            myRef.child('settings').update({ 'neighbors': autoSelectNeighbors, 'walkableRollable': settings['walkableRollable'], 'autoWalkableRollable': settings['autoWalkableRollable'], 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'randomStartAlways': settings['randomStartAlways'], 'recent': recentOn, 'cinematicRoll': settings['cinematicRoll'], 'highscoreEnabled': false, 'chunkTasks': chunkTasksOn, 'topButtons': topButtonsOn, 'completedTaskColor': settings['completedTaskColor'], 'completedTaskStrikethrough': settings['completedTaskStrikethrough'], 'taskSidebar': settings['taskSidebar'], 'allTasks': settings['allTasks'], 'startingChunk': settings['startingChunk'], 'numTasksPercent': settings['numTasksPercent'], 'help': !(!helpMenuOpen && !helpMenuOpenSoon), 'patchNotes': (!patchNotesOpen && !patchNotesOpenSoon) ? patchNotesVersion : settings['patchNotes'], 'mapIntro': !mapIntroOpen && !mapIntroOpenSoon, 'theme': theme, 'newTasks': settings['newTasks'], 'hideChecked': settings['hideChecked'], 'shiftUnlock': settings['shiftUnlock'], rollWarning: settings['rollWarning'], optOutSections: settings['optOutSections'] }); //TEMP (highscore not enabled)
            myRef.child('chunkinfo').update({ checkedChallenges: encodeObject(checkedChallenges, true), completedChallenges: encodeObject(completedChallenges, true), backlog: encodeObject(backlog, true), possibleAreas: encodeObject(possibleAreas, true), manualTasks: encodeObject(manualTasks, true), manualEquipment: encodeObject(manualEquipment, true), backloggedSources: encodeObject(backloggedSources, true), altChallenges: encodeObject(altChallenges, true), manualMonsters: encodeObject(manualMonsters, true), slayerLocked: encodeObject(slayerLocked, true), passiveSkill: encodeObject(passiveSkill, true), oldSavedChallengeArr: encodeObject(oldSavedChallengeArr, true), assignedXpRewards: encodeObject(assignedXpRewards, true), manualAreas: encodeObject(manualAreas, true), manualSections: encodeObject(manualSections, true), prevValueLevelInput: encodeObject(prevValueLevelInput, true), checkedAllTasks: encodeObject(checkedAllTasks, true) });

            let tempJson = {};
            !!tempChunks['unlocked'] && Object.keys(tempChunks['unlocked']).filter(chunkId => { return tempChunks['unlocked'][chunkId] !== 'undefined' && tempChunks['unlocked'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                tempJson[chunkId] = chunkId;
            });
            myRef.child('chunks/unlocked').set(tempJson);
            let walkableUnlockedChunks;
            if (highscoreEnabled || true) {
                walkableUnlockedChunks = 0;
                chunkInfo['walkableChunks'].forEach((chunkId) => {
                    if (tempJson.hasOwnProperty(chunkId)) {
                        walkableUnlockedChunks++;
                    }
                });
            }

            tempJson = {};
            !!tempChunks['selected'] && Object.keys(tempChunks['selected']).filter(chunkId => { return tempChunks['selected'][chunkId] !== 'undefined' && tempChunks['selected'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                tempJson[chunkId] = tempSelectedChunks.indexOf(chunkId) + 1;
            });
            myRef.child('chunks/selected').set(tempJson);

            tempJson = {};
            !!tempChunks['potential'] && Object.keys(tempChunks['potential']).filter(chunkId => { return tempChunks['potential'][chunkId] !== 'undefined' && tempChunks['potential'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                tempJson[chunkId] = chunkId;
            });
            myRef.child('chunks/potential').set(tempJson);

            tempJson = {};
            !!tempChunks['blacklisted'] && Object.keys(tempChunks['blacklisted']).filter(chunkId => { return tempChunks['blacklisted'][chunkId] !== 'undefined' && tempChunks['blacklisted'][chunkId] !== 'NaN' && chunkId !== 'undefined' && chunkId !== 'NaN' }).forEach((chunkId) => {
                tempJson[chunkId] = chunkId;
            });
            myRef.child('chunks/blacklisted').set(tempJson);

            myRef.child('chunks/stickered').set(stickered);
            myRef.child('chunks/stickeredNotes').set(encodeObject(stickeredNotes, true));
            myRef.child('chunks/stickeredColors').set(stickeredColors);

            /*highscoreEnabled && databaseRef.child('highscores/skills/Unlocked Chunks/' + mid).update({
                mid: mid,
                name: userName.toLowerCase(),
                score: walkableUnlockedChunks,
            });*/ //TEMP (highscore not enabled)
        }).catch(function(error) { console.error(error) });
    }
}

// Rolls until a new, unique map id is found
let rollMID = function(count) {
    const bannedIds = ['nig', 'anig', 'nigg', 'nigr', 'nggr', 'nigs', 'ngr', 'ngrs', 'niga', 'ngga', 'nigo', 'nigz', 'ngrz', 'gook', 'nazi', 'htlr', 'fag', 'afag', 'fgt', 'afgt', 'fgts', 'fagg', 'fago', 'fags', 'faag', 'ffag', 'fagz', 'fagt', 'dyke', 'acab'];
    let rollMidCount = count || 0;
    let char1, char2, char3, char4, charSet;
    let badNums = true;
    let rollCount = 0;
    savedPin = pin;
    if (onTestServer || testMode) {
        return;
    }
    databaseRef.child('mapids').once('value', function(snap) {
        while (badNums && rollCount < 250) {
            char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char3 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char4 = rollCount > 10 ? String.fromCharCode(97 + Math.floor(Math.random() * 26)) : '';
            charSet = char1 + char2 + char3 + char4;
            if (!snap.val()[charSet] && !bannedIds.includes(charSet)) {
                badNums = false;
            }
            rollCount++;
        }
        mid = charSet;
        firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then(providers => {
            if (providers.length === 0) {
                firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                    signedIn = true;
                    userCredential.user.updateProfile({
                        displayName: mid
                    }).then(() => {
                        databaseRef.child('template').once('value', function(snap2) {
                            let temp = snap2.val();
                            temp.uid = userCredential.user.uid;
                            databaseRef.child('maps/' + charSet).set(temp);
                            databaseRef.child('mapids/' + charSet).set(true);
                            $('#newmid').text(charSet.toUpperCase());
                            $('.link').prop('href', 'https://source-chunk.github.io/chunk-picker-rs3/?' + charSet).text('https://source-chunk.github.io/chunk-picker-rs3/?' + charSet);
                        });
                    });
                }).catch((error) => { console.error(error) });
            } else {
                logError(`Error: '${mid}' not recorded as a taken mapId, but has respective auth user.`);
                if (rollMidCount < 50) {
                    rollMID(rollMidCount + 1);
                } else {
                    $('#newmid').text('ERROR').css('color', 'red');
                    $('.maybe-error-text').css('font-size', 16).css('color', 'red').html('An error has occurred. This error has been reported to the developers. Please contact <u>whitecatblack</u> on Discord for more information.');
                    $('.link-outer').hide();
                    console.error('Error: Unable to generate untaken mapId.');
                    logError('Error: Unable to generate untaken mapId.');
                }
            }
        });
    }).catch((error) => { console.error(error) });
}

// Checks if both the map id and pin are correct, and hides their respective error messages/allows button clicks if so
let checkIfGood = function() {
    if (midGood && pinGood) {
        $('#access').prop('disabled', false);
        $('.mid-err').css('visibility', 'hidden');
        $('.pin-err').css('visibility', 'hidden');
    }
}

// Checks if the map id, the old pin, and the new pid are valid, and hides their respective error messages/allows button clicks if so
let checkIfGood2 = function() {
    if (mid2Good && pin2Good && pin2SecondGood) {
        $('#change-pin').prop('disabled', false);
        $('.mid-err').css('visibility', 'hidden');
        $('.pin-err').css('visibility', 'hidden');
    }
}

// Checks if the map id is good and there is a friend name
let checkIfGoodFriend = function() {
    if (midFriendGood && nameFriendGood) {
        $('#submit-friend-button').prop('disabled', false);
    } else {
        $('#submit-friend-button').prop('disabled', true);
    }
}

// Changes the lock state if pin is correct, otherwise displays error
let changeLocked = function() {
    $('#lock-unlock').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then((methods) => {
        if (!!methods && methods.length > 0) {
            setTimeout(function() {
                firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                    signedIn = true;
                    $('.center').css('margin-top', '15px');
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').css('opacity', 0).show();
                    roll2On && $('.roll2').css('opacity', 0).show();
                    !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                    $('.open-manual-outer-container').css('opacity', 0).show();
                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                    $('.lock-box').animate({ 'opacity': 0 });
                    setRecentLogin();
                    setTimeout(function() {
                        $('.lock-box').css('opacity', 1).hide();
                        $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').animate({ 'opacity': 1 });
                        roll2On && $('.roll2').animate({ 'opacity': 1 });
                        !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                        $('.open-manual-outer-container').animate({ 'opacity': 1 });
                        rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                        $('#lock-unlock').prop('disabled', false).html('Unlock');
                        locked = false;
                        helpMenuOpenSoon && helpFunc();
                        patchNotesOpenSoon && openPatchNotesModal();
                        mapIntroOpenSoon && openMapIntroModal(justStartingChunkSet);
                        unlockChallenges();
                        lockBoxOpen = false;
                    }, 500);
                }).catch((error) => {
                    $('.lock-pin').addClass('animated shake wrong').select();
                    $('#lock-unlock').prop('disabled', true).html('Unlock');
                });
                setTimeout(function() {
                    $('.lock-pin').removeClass('animated shake');
                }, 500);
            }, 1000);
        } else {
            myRef.child('pin').once('value', function(snap) {
                if ((snap.val() && snap.val() === savedPin)) {
                    setTimeout(function() {
                        firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                            signedIn = true;
                            signedIn && myRef.child('uid').set(userCredential.user.uid, function(error) {
                                if (error) {
                                    regainConnectivity(() => {
                                        myRef.child('pin').remove();
                                    });
                                } else {
                                    myRef.child('pin').remove();
                                }
                            });
                            userCredential.user.updateProfile({
                                displayName: mid
                            });
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').css('opacity', 0).show();
                            roll2On && $('.roll2').css('opacity', 0).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                            $('.open-manual-outer-container').css('opacity', 0).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                            $('.lock-box').animate({ 'opacity': 0 });
                            setTimeout(function() {
                                $('.lock-box').css('opacity', 1).hide();
                                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').animate({ 'opacity': 1 });
                                roll2On && $('.roll2').animate({ 'opacity': 1 });
                                !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                                $('.open-manual-outer-container').animate({ 'opacity': 1 });
                                rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                                $('#lock-unlock').prop('disabled', false).html('Unlock');
                                locked = false;
                                helpMenuOpenSoon && helpFunc();
                                patchNotesOpenSoon && openPatchNotesModal();
                                mapIntroOpenSoon && openMapIntroModal(justStartingChunkSet);
                                unlockChallenges();
                                lockBoxOpen = false;
                            }, 500);
                        }).catch((error) => {
                            $('.lock-pin').addClass('animated shake wrong').select();
                            $('#lock-unlock').prop('disabled', true).html('Unlock');
                        });
                    }, 1000);
                    setTimeout(function() {
                        $('.lock-pin').removeClass('animated shake');
                    }, 500);
                } else {
                    setTimeout(function() {
                        $('.lock-pin').addClass('animated shake wrong').select();
                        $('#lock-unlock').prop('disabled', true).html('Unlock');
                        setTimeout(function() {
                            $('.lock-pin').removeClass('animated shake');
                        }, 500);
                    }, 1000);
                }
            });
        }
    });
}

// Closes the lock box
let closePinBox = function() {
    $('.lock-box').animate({ 'opacity': 0 });
    $('.lock-' + (locked ? 'closed' : 'opened')).css('opacity', 0).show();
    setTimeout(function() {
        $('.lock-box').css('opacity', 1).hide();
        $('.lock-' + (locked ? 'closed' : 'opened')).animate({ 'opacity': 1 });
        $('#lock-unlock').prop('disabled', false).html('Unlock');
        lockBoxOpen = false;
    }, 500);
}

// Taken from https://rot47.net/base.html
// Convert between two different number bases
function convert(src, srctable, desttable) {
    let srclen = srctable.length;
    let destlen = desttable.length;
    let val = 0;
    let numlen = src.length;
    for (let i = 0; i < numlen; i++) {
        val = val * srclen + srctable.indexOf(src.charAt(i));
    }
    if (val < 0) {
        return 0;
    }
    let r = val % destlen;
    let res = desttable.charAt(r);
    let q = Math.floor(val / destlen);
    while (q) {
        r = q % destlen;
        q = Math.floor(q / destlen);
        res = desttable.charAt(r) + res;
    }
    return res;
}

// stringToChunkIndexes() sourced from: https://gitgeddes.github.io/ChunkPicker/
// Thanks @GitGeddes/Amehzyn and @Joeytje50

// Take in the string from the URL and unpack the chunk indexes
function stringToChunkIndexes(request) {
    let gap = 4;
    let chunks = [];
    request = request.split(",");
    // Unpack every chunk index
    for (let i = 0; i < request.length; i++) {
        // Convert the indexes from base 62 to base 10
        request[i] = convert(request[i], BASE62, BASE10);
        // Use modulo using the gap to check for indexes less than 1000
        let mod = request[i].length % gap;
        if (mod != 0) {
            // Add 0s to the start of the string
            for (let j = 4; j > mod; j--) {
                request[i] = "0" + request[i];
            }
        }
        // Split the string into the chunk indexes
        for (let k = 0; k < request[i].length - 3; k += 4) {
            chunks.push(request[i].slice(k, k + 4));
        }
    }
    return chunks;
}