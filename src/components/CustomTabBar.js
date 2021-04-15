import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  flex-direction: row;
`;

const TabItem = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const TabLabel = styled.Text`
  font-size: 16px;
`;

const Image = styled.Image`
  width: 24;
  height: 24;
`;

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View>
      {state.routes.map((route, index) => {
        //const { options } = descriptors[route.key];
        const options = descriptors[route.key].options;

        let label = route.name;

        const imgIcon = options.tabBarIcon;

        if (options.tabBarLabel !== undefined) {
          label = route.tabBarLabel;
        } else if (options.title !== undefined) {
          label = route.title;
        }

        const handleTabPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TabItem
            key={index}
            undeleyColor="#dd99dd"
            activeOpacity={0.5}
            onPress={handleTabPress}>
            <>
              <Image source={imgIcon} />
              <TabLabel>{label}</TabLabel>
            </>
          </TabItem>
        );
      })}
    </View>
  );
}

export default CustomTabBar;
