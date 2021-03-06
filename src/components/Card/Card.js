import React, { useState } from 'react';
import { Text, ImageBackground, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

const Card = (props) => {
    const { userID, id, shelter, favoritePet, name, imageUri, description, breed, birthDate, inShelterSinceDate, healthCondition, favoriteID } = props.pet;

    const navigation = useNavigation();

    const [dialogVisible, setDialogVisible] = useState(false);

    const displayDialog = () => {
      setDialogVisible(true);
    }

    const dismissDialog = () => {
        setDialogVisible(false);
    }

    return (
      <View style={styles.root}>
        <TouchableWithoutFeedback onLongPress={displayDialog} onPress={() => navigation.navigate('DetailsScreen', {
          userID: userID,
          petID: id,
          shelterID: shelter.id,
          shelterUserID: shelter.user.id,
          name: name,
          shelterName: shelter.name,
          location: shelter.location,
          imageUri: imageUri,
          description: description,
          breed: breed,
          birthDate: birthDate,
          inShelterSinceDate: inShelterSinceDate,
          healthCondition: healthCondition,
        })}>
          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Przeglądaj</Dialog.Title>
            <Dialog.Description>Przesuwaj palcem karty, aby przeglądać kolejne zwierzęta czekające na adopcję.</Dialog.Description>
            <Dialog.Button label="Ok" onPress={dismissDialog}/>
          </Dialog.Container>

          <View style={styles.face}>
            <ImageBackground source={{ uri: imageUri }} style={styles.image}>
              <LinearGradient
                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
                locations={[0, 1.0]}
                colors={[colors.darkPurple, colors.darkBlue]}
                style={styles.cardBanner}>
                <View style={styles.cardInner}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.address}>{shelter.name}</Text>
                  <Text numberOfLines={1} style={styles.description}>{description}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: colors.ultraLightGray,
  },
  face: {
    width: '100%',
    height: '100%',
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  cardBanner: {
    width: '100%',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    opacity: 0.96,
  },
  cardInner: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  name: {
    fontFamily: 'oxygen_bold',
    fontSize: 36,
    color: colors.white,
    fontWeight: '600',
    lineHeight: 56,
  },
  address: {
    fontFamily: 'oxygen_light',
    marginBottom: 4,
    fontSize: 14,
    color: colors.ultraLightGray,
  },
  description: {
    fontFamily: 'oxygen_regular',
    fontSize: 16,
    color: colors.white,
    lineHeight: 32,
    fontWeight: '300',
  },
  detailName: {
    fontFamily: 'oxygen_regular',
    fontSize: 12,
    color: colors.black,
    lineHeight: 20,
  },
  detail: {
    fontFamily: 'oxygen_bold',
    fontSize: 12,
    color: colors.black,
    lineHeight: 20,
  },
  details: {
    flexDirection: 'row',
  },
  detailsContainer: {
    paddingTop: 5,
  },
  detailedDescriptionContainer: {
    //backgroundColor: colors.purple,
    height: '40%',
    paddingTop: 10,
  },
  actionsContent: {
    width: '100%',
    height: '30%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: colors.gray,
  },
  centeredText: {
    fontFamily: 'oxygen_regular', 
    padding: 10,
  },
  askQuestionButton: {
    fontFamily: 'oxygen_bold',
    color: colors.darkPurple,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  appointmentButton: {
    width: 240,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.65,
    elevation: 6, 
  },
  appointmentButtonText: {
    fontFamily: 'oxygen_regular',
    color: colors.white,
    textAlign: 'center',
    padding: 10, 
  }
})

export default Card;