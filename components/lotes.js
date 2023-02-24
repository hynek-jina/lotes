import React from "react";
import { Text } from "react-native";

function Record(props) {
  return (
    <Text>
      <Text style={{ fontWeight: "bold" }}>{props.max_withdrawable}</Text>
      <Text> sats - </Text>
      <Text style={{ fontWeight: "600" }}>{props.id}</Text>
      {"\n"}
    </Text>
  );
}

export function RecordsList(props) {
  return (
    <Text>
      {props.records.map((record) => (
        <Record key={record.id} {...record} />
      ))}
    </Text>
  );
}
