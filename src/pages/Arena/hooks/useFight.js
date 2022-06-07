import { useEffect, useState } from "react";
import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

const getDamage = (attacker, defender) => {
  // return damage
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  
  if (blockPower > hitPower) return 0;
  return hitPower - blockPower;
};

const getHitPower = (fighter) => {
  // return hit power
  const criticalHitPower = Math.random() + 1;
  return fighter.attack * criticalHitPower;
};

const getBlockPower = (fighter) => {
  // return block power
  const dodgeChange = Math.random() + 1;
  return fighter.defense * dodgeChange;
};

const getCriticalDamage = (attacker, defender) => {
  return defender.health - (attacker.attack * 2);
}

export const useFight = () => {
  const { selectedPair, setSelectedPair } = useArena();
  const { 
    keysPressed,
    key
  } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;

  // implement fight logic, return fighters details and winner details
  
  // defining initial state for fighters
  const [fighterOneDetails, setFighterOneDetails] = useState({});
  const [fighterTwoDetails, setFighterTwoDetails] = useState({});
  const [winner, setWinner] = useState(null);

  // setting state for fighters
  useEffect(() => {
    setFighterOneDetails({ 
      ...selectedPair.playerOne, 
      initialHealth: selectedPair.playerOne.health 
    });
    setFighterTwoDetails({ 
      ...selectedPair.playerTwo, 
      initialHealth: selectedPair.playerTwo.health 
    });
  }, [selectedPair]);

  // player cannot hit or take damage while blocking
  const [playerBlocking, setPlayerBlocking] = useState(false);
  // checking if player can use combo or not
  const [fOneCanUseCombo, setFOneCanUseCombo] = useState(true);
  const [fTwoCanUseCombo, setFTwoCanUseCombo] = useState(true);

  useEffect(() => {
    // player one critical combo
    if (keysPressed.KeyQ && keysPressed.KeyW && keysPressed) {
      if (fOneCanUseCombo) {
        setFOneCanUseCombo(false);
        setFighterTwoDetails(prev => ({
          ...prev,
          health: getCriticalDamage(fighterOneDetails, fighterTwoDetails)
        }));
        setTimeout(() => {
          setFOneCanUseCombo(true);
        }, 10000);
      }
    }

    // player two critical combo
    if (keysPressed.KeyU && keysPressed.KeyI && keysPressed.KeyO) {
      if (fTwoCanUseCombo) {
        setFTwoCanUseCombo(false);
        setFighterOneDetails(prev => ({
          ...prev,
          health: getCriticalDamage(fighterTwoDetails, fighterOneDetails)
        }));
        setTimeout(() => {
          setFTwoCanUseCombo(true);
        }, 10000);
      }
    }

    (keysPressed.KeyD || keysPressed.KeyL) ? setPlayerBlocking(true) : setPlayerBlocking(false);
    
    if (keysPressed.KeyA && !playerBlocking) {
      setFighterTwoDetails(prev => ({
        ...prev,
        health: prev.health - getDamage(fighterOneDetails, fighterTwoDetails)
      }));
    } 
    else if (keysPressed.KeyJ && !playerBlocking) {
      setFighterOneDetails(prev => ({
        ...prev,
        health: prev.health - getDamage(fighterTwoDetails, fighterOneDetails)
      }));
    };

    if (fighterOneDetails.health <= 0) {
      setWinner(fighterTwoDetails);
    }
    else if (fighterTwoDetails.health <= 0) {
      setWinner(fighterOneDetails);
    }
  }, [key]);

  return {
    fighterOneDetails,
    fighterTwoDetails,
    winner,
  };
};
