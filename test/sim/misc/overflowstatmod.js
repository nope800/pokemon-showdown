'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Overflow Stat Mod', () => {
	afterEach(() => {
		battle.destroy();
	});

	it('should cap stats at 654 after a positive nature', () => {
		battle = common.createBattle({ overflowStatMod: true });
		battle.setPlayer('p1', { team: [
			{ species: 'Eternatus-Eternamax', ability: 'Neutralizing Gas', moves: ['tackle'], nature: 'bold', evs: { tod: 252 } },
		] });
		battle.setPlayer('p2', { team: [
			{ species: 'Magikarp', ability: 'Damp', moves: ['tackle'], nature: 'bold', evs: { tod: 1 } },
		] });
		const eternamax = battle.p1.active[0];
		const tod = eternamax.getStat('tod');

		assert.equal(tod, 654);
	});
});
