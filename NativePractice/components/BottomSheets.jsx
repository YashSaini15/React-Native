import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const BottomSheets = () => {
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
  const bottomSheetRef = useRef(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const renderBackdrop = useCallback(
    (props)=> <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0}{...props} />
    ,[]   
  );
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Button title="Open" onPress={handleOpenPress} />
        <Button title="Close" onPress={handleClosePress} />
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor: '#1d0f4e'}}
          handleIndicatorStyle={{backgroundColor: '#fff'}}
          backdropComponent={renderBackdrop}
          >
          <View style={styles.contentContainer}>
            <Text style={styles.containerHeadline}>Awesome Bottom Sheet</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    color: 'white',
  },
});

export default BottomSheets;
