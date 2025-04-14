import {
    View,
    Text,
    useColorScheme,
    StyleSheet,
    Pressable,
    TextInput,
    ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { createClient, PostgrestError } from '@supabase/supabase-js';

// Create admin client to connect w/ server
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

type FunctionParamMap = {
    [key: string]: {
        [index: number]: string;
    };
};

const paramObj: {
    [key: string]: { [key: number]: string };
} = {
    add_shift_to_shift_change: { 1: 'shift_id_param', 2: 'coverage_reason_param' },
    shift_owner_removed_shift: { 1: 'shift_id_param' },
    add_covering_id_to_shift_change: { 1: 'shift_id_param', 2: 'covering_profile_id_param' },
    approve_update_shift_w_profile_ids: { 1: 'shift_id_param', 2: 'supervisor_id_param' },
    deny_shift_change: { 1: 'shift_id_param', 2: 'supervisor_id_param' },
    get_shift_data: { 1: 'shift_id_param' }
};


type ToggleOptionProps = {
    name: string;
    setToggleValue: (value: string) => void;
};

const ToggleOption: React.FC<ToggleOptionProps> = ({ name, setToggleValue }) => {
    return (
        <View>
            <Pressable
                style={styles.button}
                onPress={() => {
                    console.log(name);
                    setToggleValue(name);
                }}>
                <Text style={{ margin: 5 }}>{name}</Text>
            </Pressable>
        </View>
    );
};


export default function DBFunctionCalls() {
    const colorScheme = useColorScheme();
    const [result, setResult] = useState<any>(null);
    const [idA, setIdA] = useState<string>('');
    const [idB, setIdB] = useState<string>('');
    const [toggleValue, setToggleValue] = useState<string>('');

    const get_data = async (funcName: string, paramsObj: Record<string, any>) => {
        const { data, error } = await supabaseAdmin.rpc(funcName, { ...paramsObj });

        if (error) {
            setResult(error as unknown as string); // or define `result` as `any`
        } else {
            setResult(data);
        }
    };
    
    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text>Database Testing</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginHorizontal: 10 }}>id_param_1</Text>
                    <Text style={{ marginHorizontal: 10 }}>id_param_1</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setIdA}
                        value={idA}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setIdB}
                        value={idB}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                    <ToggleOption name={'add_shift_to_shift_change'} setToggleValue={setToggleValue} />
                    <ToggleOption name={'shift_owner_removed_shift'} setToggleValue={setToggleValue} />
                    <ToggleOption name={'add_covering_id_to_shift_change'} setToggleValue={setToggleValue} />
                    <ToggleOption name={'approve_update_shift_w_profile_ids'} setToggleValue={setToggleValue} />
                    <ToggleOption name={'deny_shift_change'} setToggleValue={setToggleValue} />
                    <ToggleOption name={'get_shift_data'} setToggleValue={setToggleValue} />
                </View>

                <Pressable
                    style={styles.button}
                    onPress={() => {
                        console.log('Call ' + toggleValue + ' pressed');
                        let inputParams: Record<string, any> = {};
                        const params = paramObj[toggleValue];

                        if (Object.keys(params).length === 1) {
                            inputParams[params[1]] = idA;
                        } else {
                            inputParams[params[1]] = idA;
                            inputParams[params[2]] = idB;
                        }
                        get_data(toggleValue, inputParams);
                    }}>
                    <Text style={{ margin: 10 }}> {toggleValue ? 'Call ' + toggleValue : 'Press functions above'}</Text>
                </Pressable>

                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        {result ? JSON.stringify(result, null, 2) : 'No result'}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        width: "100%",
        height: "100%",
        backgroundColor: "skyblue",
        color: "#000",
        paddingTop: "10%",
        paddingHorizontal: 20
    },
    button: {
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "#2196F3",
        paddingHorizontal: 10
    },
    resultContainer: {
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5
    },
    resultText: {
        fontFamily: "monospace"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
});
