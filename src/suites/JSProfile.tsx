import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Result = number | undefined;
type BenchmarkName = 'sunspider' | 'jetstream' | 'octane2' | 'sixspeed';
type State = {
  sunspider: Result;
  jetstream: Result;
  octane2: Result;
  sixspeed: Result;
};
type Action = {
  type: BenchmarkName;
  result: number;
};

const initialState: State = {
  sunspider: undefined,
  jetstream: undefined,
  octane2: undefined,
  sixspeed: undefined,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'jetstream':
      return {...state, jetstream: action.result};
    case 'sunspider':
      return {...state, sunspider: action.result};
    case 'octane2':
      return {...state, octane2: action.result};
    case 'sixspeed':
      return {...state, sixspeed: action.result};
    default:
      return state;
  }
}

export const JSProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const start = React.useCallback(async () => {
    const benchmark = async (
      name: BenchmarkName,
      fn: () => void,
    ): Promise<void> => {
      const startTime = Date.now();
      return new Promise(r => {
        setTimeout(() => {
          fn();
          setTimeout(() => {
            const result = Date.now() - startTime;
            console.log(`JavaScriptCoreProfiler:${name}:${result}`);
            dispatch({type: name, result: result});
            r();
          }, 0);
        }, 0);
      });
    };

    console.log('JavaScriptCoreProfiler:JSProfile:Start');
    await benchmark('sunspider', () => require('./sunspider').run());
    await benchmark('jetstream', () => require('./jetstream').run());
    await benchmark('octane2', () => require('./octane2').run());
    await benchmark('sixspeed', () => require('./sixspeed').run());
    console.log('JavaScriptCoreProfiler:JSProfile:Done');
  }, []);

  React.useEffect(() => {
    setTimeout(() => start(), 1000);
  }, [start]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>JavaScript Synthetic Tests</Text>
      <Text style={styles.text}>Benchmarks Results:</Text>
      <Text style={styles.text}>Sunspider: {state.sunspider || '...'}</Text>
      <Text style={styles.text}>
        Jetstream HashMap: {state.jetstream || '...'}
      </Text>
      <Text style={styles.text}>Octane2: {state.octane2 || '...'}</Text>
      <Text style={styles.text}>SixSpeed: {state.sixspeed || '...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 16,
  },
});
