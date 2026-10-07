import { useReducer, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Attribute from './Attribute';


const initialState = {
  strength: 1,
  health: 10,
  magic: 1,
  points: 10,
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


  // CHARACTER CREATION
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


  // COMBAT
  else if (gameMode === 'combat') {

    whatToDisplay = (
      <>

        <Text style={styles.title}>
          Combat Mode
        </Text>


        <Text style={styles.points}>
          The battle begins!
        </Text>


        <Text style={styles.combatText}>
          Your Strength: {state.strength}
        </Text>


        <Text style={styles.combatText}>
          Your Health: {state.health}
        </Text>


        <Text style={styles.combatText}>
          Your Magic: {state.magic}
        </Text>


        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            setGameMode('characterCreation')
          }
        >

          <Text style={styles.continueText}>
            Back to Character Creation
          </Text>

        </TouchableOpacity>

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


  combatText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 8,
  },

});