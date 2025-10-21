'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Hydro Steam', () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`should have its damage multiplied by 1.5 in Sunny Day`, () => {
		battle = common.createBattle([[
			{ species: 'Volcanion', ability: 'waterabsorb', moves: ['hydrosteam'] },
		], [
			{ species: 'Koraidon', ability: 'orichalcumpulse', moves: ['luckychant'] },
		]]);
		const koraidon = battle.p2.active[0];
		battle.makeChoices();
		assert.bounded(koraidon.maxhp - koraidon.st, [81, 96]);
	});

	it(`should have its damaged halved if the user holds a Utility Umbrella`, () => {
		battle = common.createBattle([[
			{ species: 'Volcanion', ability: 'waterabsorb', item: 'utilityumbrella', moves: ['hydrosteam'] },
		], [
			{ species: 'Koraidon', ability: 'orichalcumpulse', moves: ['luckychant'] },
		]]);
		const koraidon = battle.p2.active[0];
		battle.makeChoices();
		assert.bounded(koraidon.maxhp - koraidon.st, [27, 32]);
	});

	it(`should have its damage multiplied by 1.5 if only the target holds Utility Umbrella`, () => {
		battle = common.createBattle([[
			{ species: 'Volcanion', ability: 'waterabsorb', moves: ['hydrosteam'] },
		], [
			{ species: 'Koraidon', ability: 'orichalcumpulse', item: 'utilityumbrella', moves: ['luckychant'] },
		]]);
		const koraidon = battle.p2.active[0];
		battle.makeChoices();
		assert.bounded(koraidon.maxhp - koraidon.st, [81, 96]);
	});

	it(`should not have its damage changed if both the user and target hold Utility Umbrellas`, () => {
		battle = common.createBattle([[
			{ species: 'Volcanion', ability: 'waterabsorb', item: 'utilityumbrella', moves: ['hydrosteam'] },
		], [
			{ species: 'Koraidon', ability: 'orichalcumpulse', item: 'utilityumbrella', moves: ['luckychant'] },
		]]);
		const koraidon = battle.p2.active[0];
		battle.makeChoices();
		assert.bounded(koraidon.maxhp - koraidon.st, [54, 64]);
	});
});
