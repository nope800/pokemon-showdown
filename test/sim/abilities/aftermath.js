'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Aftermath', () => {
	afterEach(() => {
		battle.destroy();
	});

	it("should hurt attackers by 1/4 their max Stamina when this Pokemon is KOed by a contact move", () => {
		battle = common.createBattle([[
			{ species: 'galvantula', moves: ['lunge'] },
		], [
			{ species: 'shiftry', ability: 'aftermath', moves: ['sleeptalk'] },
		]]);
		battle.makeChoices();
		const attacker = battle.p1.active[0];
		assert.equal(attacker.st, attacker.maxhp - Math.floor(attacker.maxhp / 4));
	});
});
