import Dialog from "react-native-dialog";
import {Linking, Text} from "react-native";
import React from "react";

export const DiscordPopup = ({visible, close}: { visible: boolean, close: Function }) => {

    return (
        <Dialog.Container visible={visible}>
            <Dialog.Title>Attention, tu quittes l'application !</Dialog.Title>
            <Dialog.Description>
                <Text>Retrouves-nous sur Discord pour nous proposer des répliques ou idées et améliorer l'application !{"\n"}</Text>
            </Dialog.Description>
            <Dialog.Button color={"#961689"} label="Rester ici" onPress={() => close()}/>
            <Dialog.Button color={"#169689"} label="Aller sur Discord" onPress={() => {
                Linking.openURL("https://discord.gg/Ry5qNYJG83");
                close();
            }}/>
        </Dialog.Container>
    )
};