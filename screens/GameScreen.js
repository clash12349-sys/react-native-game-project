import { useReducer, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Attribute from './Attribute';

const initialState = {
  strength: 1,
  health: 10,
  magic: 1,
  points: 10,

  monsterHealth: 50,
  monsterStrength: 5,
  monsterMagic: 10,

  combatLog: [
    'The battle has begun!',
    'A monster appears!'
  ],

  gameOver: false,
  result: '',
};

function reducer(state, action) {

  switch (action.type) {

    case 'INCREASE_STRENGTH':

      if (state.points === 0) {
        return state;
      }

      return {
        ...state,
        strength: state.strength + 1,
        points: state.points - 1,
      };


    case 'DECREASE_STRENGTH':

      if (state.strength <= 1) {
        return state;
      }

      return {
        ...state,
        strength: state.strength - 1,
        points: state.points + 1,
      };


    case 'INCREASE_HEALTH':

      if (state.points === 0) {
        return state;
      }

      return {
        ...state,
        health: state.health + 10,
        points: state.points - 1,
      };


    case 'DECREASE_HEALTH':

      if (state.health <= 10) {
        return state;
      }

      return {
        ...state,
        health: state.health - 10,
        points: state.points + 1,
      };


    case 'INCREASE_MAGIC':

      if (state.points === 0) {
        return state;
      }

      return {
        ...state,
        magic: state.magic + 1,
        points: state.points - 1,
      };


    case 'DECREASE_MAGIC':

      if (state.magic <= 1) {
        return state;
      }

      return {
        ...state,
        magic: state.magic - 1,
        points: state.points + 1,
      };


    case 'ATTACK': {

      if (state.gameOver) {
        return state;
      }

      const monsterHealth =
        Math.max(
          0,
          state.monsterHealth - state.strength
        );

      if (monsterHealth <= 0) {

        return {
          ...state,
          monsterHealth: 0,
          gameOver: true,
          result: 'Victory!',
          combatLog: [
            ...state.combatLog,
            `You attacked the monster for ${state.strength} damage!`,
            'The monster has been defeated!',
            'You won the battle!'
          ],
        };
      }

      const playerHealth =
        Math.max(
          0,
          state.health - state.monsterStrength
        );

      if (playerHealth <= 0) {

        return {
          ...state,
          monsterHealth: monsterHealth,
          health: 0,
          gameOver: true,
          result: 'Defeat!',
          combatLog: [
            ...state.combatLog,
            `You attacked the monster for ${state.strength} damage!`,
            `The monster counterattacked for ${state.monsterStrength} damage!`,
            'You have been defeated!'
          ],
        };
      }

      return {
        ...state,

        monsterHealth: monsterHealth,

        health: playerHealth,

        combatLog: [
          ...state.combatLog,
          `You attacked the monster for ${state.strength} damage!`,
          `The monster counterattacked for ${state.monsterStrength} damage!`
        ],
      };
    }


    case 'MAGIC_ATTACK': {

      if (state.gameOver) {
        return state;
      }

      if (state.magic <= 0) {

        return {
          ...state,

          combatLog: [
            ...state.combatLog,
            'You do not have enough magic to cast this spell!'
          ],
        };
      }

      const magicDamage = state.magic * 5;

      const monsterHealth =
        Math.max(
          0,
          state.monsterHealth - magicDamage
        );

      const remainingMagic =
        state.magic - 1;

      if (monsterHealth <= 0) {

        return {
          ...state,

          monsterHealth: 0,

          magic: remainingMagic,

          gameOver: true,

          result: 'Victory!',

          combatLog: [
            ...state.combatLog,
            `You cast Magic Attack for ${magicDamage} damage!`,
            'The monster has been defeated!',
            'You won the battle!'
          ],
        };
      }

      const playerHealth =
        Math.max(
          0,
          state.health - state.monsterStrength
        );

      if (playerHealth <= 0) {

        return {
          ...state,

          monsterHealth: monsterHealth,

          health: 0,

          magic: remainingMagic,

          gameOver: true,

          result: 'Defeat!',

          combatLog: [
            ...state.combatLog,
            `You cast Magic Attack for ${magicDamage} damage!`,
            `The monster counterattacked for ${state.monsterStrength} damage!`,
            'You have been defeated!'
          ],
        };
      }

      return {
        ...state,

        monsterHealth: monsterHealth,

        health: playerHealth,

        magic: remainingMagic,

        combatLog: [
          ...state.combatLog,
          `You cast Magic Attack for ${magicDamage} damage!`,
          `The monster counterattacked for ${state.monsterStrength} damage!`
        ],
      };
    }


    case 'HEAL': {

      if (state.gameOver) {
        return state;
      }

      if (state.magic <= 0) {

        return {
          ...state,

          combatLog: [
            ...state.combatLog,
            'You do not have enough magic to heal!'
          ],
        };
      }

      const newHealth =
        state.health + 10;

      const remainingMagic =
        state.magic - 1;

      return {
        ...state,

        health: newHealth,

        magic: remainingMagic,

        combatLog: [
          ...state.combatLog,
          'You healed yourself for 10 health!',
          'The monster skipped its turn.'
        ],
      };
    }


    default:
      return state;
  }
}


export default function GameScreen() {

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [gameMode, setGameMode] = useState(
    'characterCreation'
  );

  let whatToDisplay;


  if (gameMode === 'characterCreation') {

    whatToDisplay = (
      <>

        <Text style={styles.title}>
          Become Stronger!
        </Text>

        <Text style={styles.points}>
          Skill Points Remaining: {state.points}
        </Text>

        <Attribute
          name="Strength"
          value={state.strength}
          onIncrease={() =>
            dispatch({
              type: 'INCREASE_STRENGTH'
            })
          }
          onDecrease={() =>
            dispatch({
              type: 'DECREASE_STRENGTH'
            })
          }
        />

        <Attribute
          name="Health"
          value={state.health}
          onIncrease={() =>
            dispatch({
              type: 'INCREASE_HEALTH'
            })
          }
          onDecrease={() =>
            dispatch({
              type: 'DECREASE_HEALTH'
            })
          }
        />

        <Attribute
          name="Magic"
          value={state.magic}
          onIncrease={() =>
            dispatch({
              type: 'INCREASE_MAGIC'
            })
          }
          onDecrease={() =>
            dispatch({
              type: 'DECREASE_MAGIC'
            })
          }
        />

        {state.points > 0 ? (

          <Text style={styles.warning}>
            Spend all your points to continue
          </Text>

        ) : (

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() =>
              setGameMode('combat')
            }
          >

            <Text style={styles.continueText}>
              Start Your Journey
            </Text>

          </TouchableOpacity>

        )}

      </>
    );
  }


  else if (gameMode === 'combat') {

    whatToDisplay = (
      <>

        <Text style={styles.title}>
          Combat!
        </Text>


        <View style={styles.statsContainer}>

          <View style={styles.playerStats}>

            <Text style={styles.playerName}>
              Your Character
            </Text>

            <Text style={styles.combatText}>
              Health: {state.health}
            </Text>

            <Text style={styles.combatText}>
              Strength: {state.strength}
            </Text>

            <Text style={styles.combatText}>
              Magic: {state.magic}
            </Text>

          </View>


          <View style={styles.monsterStats}>

            <Text style={styles.monsterName}>
              Alien Wizard
            </Text>

            <Text style={styles.combatText}>
              Health: {state.monsterHealth}
            </Text>

            <Text style={styles.combatText}>
              Strength: {state.monsterStrength}
            </Text>

            <Text style={styles.combatText}>
              Magic: {state.monsterMagic}
            </Text>

          </View>

        </View>


        <Image
          source={
            require('../assets/alienWizard.png')
          }
          style={styles.monsterImage}
        />


        {state.gameOver ? (

          <View style={styles.resultContainer}>
            {state.result === 'Victory!' && (
              <Image
                source={require('../assets/monsterDead.png')


                }
                style={styles.monsterDeadImage} />
            )}
            <Text style={styles.resultText}>{state.result}</Text>



          </View>

        ) : (

          <>

            <Text style={styles.logTitle}>
              Combat Log
            </Text>

            <FlatList
              data={state.combatLog}
              keyExtractor={(item, index) =>
                index.toString()
              }
              renderItem={({ item }) => (
                <Text style={styles.logText}>
                  {item}
                </Text>
              )}
              style={styles.log}
            />


            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  dispatch({
                    type: 'ATTACK'
                  })
                }
              >

                <Text style={styles.actionText}>
                  Attack
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  dispatch({
                    type: 'MAGIC_ATTACK'
                  })
                }
              >

                <Text style={styles.actionText}>
                  Magic Attack
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  dispatch({
                    type: 'HEAL'
                  })
                }
              >

                <Text style={styles.actionText}>
                  Heal
                </Text>

              </TouchableOpacity>

            </View>

          </>
        )}

      </>
    );
  }


  return (
    <View style={styles.container}>
      {whatToDisplay}
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  points: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  warning: {
    color: '#ff7777',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },

  continueButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },

  continueText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  playerStats: {
    flex: 1,
    backgroundColor: '#203a4a',
    padding: 12,
    borderRadius: 10,
  },

  monsterStats: {
    flex: 1,
    backgroundColor: '#4a2020',
    padding: 12,
    borderRadius: 10,
  },

  playerName: {
    color: '#77bbff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  monsterName: {
    color: '#ff7777',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  combatText: {
    color: 'white',
    fontSize: 15,
    marginVertical: 3,
  },

  monsterImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },

  logTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  log: {
    width: '100%',
    maxHeight: 120,
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 15,
  },

  logText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },

  actions: {
    width: '100%',
    gap: 8,
  },

  actionButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  actionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

  resultContainer: {
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },

  resultText: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
  },
  monsterDeadImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },

});