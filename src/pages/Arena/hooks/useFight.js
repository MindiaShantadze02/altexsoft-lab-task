import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

const getDamage = (attacker, defender) => {
  // return damage
};

const getHitPower = (fighter) => {
  // return hit power
};

const getBlockPower = (fighter) => {
  // return block power
};

export const useFight = () => {
  const { selectedPair } = useArena();
  const { keysPressed } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;

  // implement fight logic, return fighters details and winner details

  return {
    // fighterOneDetails,
    // fighterTwoDetails,
    // winner,
  };
};
