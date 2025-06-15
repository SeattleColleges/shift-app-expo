import React, { RefObject } from 'react';
import { Animated, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

type DateData = string | number | Date;

interface RenderHeaderProps {
    rotation: RefObject<Animated.Value>;
    toggleCalendarExpansion: () => void;
    CHEVRON: { uri: string };
    styles: {
        header: ViewStyle;
        headerTitle: TextStyle;
    };
}

const renderHeaderUtils = (
    {  toggleCalendarExpansion, CHEVRON, styles }: RenderHeaderProps
) => (date?: DateData) => {

    return (
        <TouchableOpacity style={styles.header} onPress={toggleCalendarExpansion}>
            <Text style={styles.headerTitle}>
            {date
                ? new Date(date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
                : new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </Text>
            <Animated.Image
            source={CHEVRON}
            />
    </TouchableOpacity>
);
};

export default renderHeaderUtils;