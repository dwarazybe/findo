import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, StatusBar, Image, Avatar } from 'react-native';
import { colors } from '../../theme';
import moment from 'moment-timezone';
import 'moment/locale/pl';

const MessagesListItem = (props) => {
    const { room } = props;
    const user = room.users[1];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text numberOfLines={1} style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={1} style={styles.lastMessage}>{room.lastMessage.content}</Text>
                    <Text style={styles.time}> 
                        {moment.tz(room.lastMessage.createdAt, 'Europe/Warsaw').locale('pl').startOf('minute').fromNow()}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightGray,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    leftContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    midContainer: {
        width: '78%',
        flexDirection: 'column',
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 12,
        borderRadius: 60,
    },
    username: {
        flex: 1,
        fontFamily: 'Oxygen-Bold',
        fontSize: 14,
        color: colors.black,
    },
    lastMessage: {
        flex: 1,
        fontFamily: 'Oxygen-Regular',
        fontSize: 14,
        color: colors.gray,
    },
    time: {
        paddingTop: 3,
        fontFamily: 'Oxygen-Light',
        fontSize: 12,
        color: colors.gray,
    },
})

export default MessagesListItem;