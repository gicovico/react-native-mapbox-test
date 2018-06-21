/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('');

/* スタイル */
const styles = StyleSheet.create({
  map: {
    height: 500
  },
  container: {
    flex: 1,
  },
  input: {
    fontSize: 30,
    textAlign: 'center',
    borderStyle: "solid",
    borderWidth: 0.5,
    width: 200,
    height: 50,
    margin: 3
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center'
  }
});

/*
 * データのタイトルをリスト表示するコンポーネント
 * ナビゲーターで描画すると引数(props)に`navigation`が渡される
 */

class LocationInputScreen extends Component {
  constructor(props){
    super(props);
    this.state = {lat: 0, lon: 0}
  }

  _onChangeLat = lat => { this.setState({ lat });}
  _onChangeLon = lon => { this.setState({ lon });}

  render (){
    return (
      <View style={styles.layout}>
        {/* 数値を渡すようにして経度緯度情報を反映させる */}
        <TextInput
          placeholder="経度"
          keyboardType={"numeric"}
          style={styles.input}
          onChangeText={this._onChangeLat}
        />
        <TextInput
          placeholder="緯度"
          style={styles.input}
          onChangeText={this._onChangeLon}
        />
        <Button
          title="Location Display"
          onPress={() => this.props.navigation.navigate('Detail', this.state)}
        />
      </View>
    )
  }   
}

/* ナビゲーションの見た目や挙動に関する設定 */
LocationInputScreen.navigationOptions = () => ({
  /* 画面ヘッダーに表示するタイトルを'Mathematics'にする */
  title: '入力画面',
});

// データの詳細を表示するコンポーネント
// statelessでの書き方
const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Mapbox.MapView
      styleURL={Mapbox.StyleURL.Street}
      zoomLevel={4}
      /* Tokyo: [139.256, 35.770] propsのlatとlonは文字入力なので、数字になっている　*/
      centerCoordinate={[parseFloat(navigation.state.params.lat), parseFloat(navigation.state.params.lon)]}
      style={styles.map}>
    </Mapbox.MapView>
    {/* 遷移元から渡されたobjectから値がとれる*/}
    <Text>経度: {navigation.state.params.lat}</Text>
    <Text>緯度: {navigation.state.params.lon}</Text>
  </View>
);

/* classでの書き方
class DetailScreens extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={4}
          centerCoordinate={[parseFloat(this.props.navigation.state.params.lat), 35.770]}
          style={styles.map}>
        </Mapbox.MapView>
        <Text>{this.props.navigation.state.params.lat}</Text>
      </View>
    )
  }
}*/


DetailScreen.navigationOptions = {
  title: 'MapView'
};

/*
 * StackNavigatorを作成
 * 第一引数は登録する画面(Screen)情報を設定
 * 第二引数はオプション、初期表示画面を設定
 */
export default StackNavigator({
  Detail: { screen: DetailScreen },
  LocationInput: { screen: LocationInputScreen },
}, {
  initialRouteName: 'LocationInput',
});