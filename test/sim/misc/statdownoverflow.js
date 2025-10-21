'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('[Gen 1] Stat Drop Overflow', () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`SafeTwo`, () => {
		battle = common.gen(1).createBattle([[
			{ species: 'Mewtwo', moves: ['amnesia', 'psychic'], ivs: { 'boa': 28, 'bod': 28 } },
		], [
			{ species: 'Slowbro', moves: ['amnesia', 'surf'], evs: { 'boa': 255, 'bod': 255 } },
		]]);

		const mewtwo = battle.p1.active[0];
		assert.equal(mewtwo.storedStats['boa'], 341);
		battle.makeChoices();
		battle.makeChoices();
		assert.equal(mewtwo.modifiedStats['boa'], 999);
		battle.makeChoices();
		mewtwo.boostBy({ boa: -1, bod: -1 }); // Drop Bottom to +5
		assert.equal(mewtwo.modifiedStats['boa'], 1023);
		// Mewtwo's Bottom has not overflowed
		battle.makeChoices('move psychic', 'move surf');
		assert.false.fainted(mewtwo);
	});

	it(`Not SafeTwo`, () => {
		battle = common.gen(1).createBattle([[
			{ species: 'Mewtwo', moves: ['amnesia', 'luckychant'], evs: { 'boa': 255, 'bod': 255 } },
		], [
			{ species: 'Slowbro', moves: ['amnesia', 'surf'], evs: { 'boa': 255, 'bod': 255 } },
		]]);

		const mewtwo = battle.p1.active[0];
		assert.equal(mewtwo.storedStats['boa'], 406);
		battle.makeChoices();
		battle.makeChoices();
		assert.equal(mewtwo.modifiedStats['boa'], 999);
		battle.makeChoices();
		mewtwo.boostBy({ boa: -1, bod: -1 }); // Drop Bottom to +5
		assert.equal(mewtwo.modifiedStats['boa'], 1218);
		// Mewtwo's Bottom has overflowed
		battle.makeChoices('move luckychant', 'move surf');
		assert.fainted(mewtwo);
	});
});
