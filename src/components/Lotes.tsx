import { Text } from "react-native";

interface RecordProps {
  max_withdrawable: number;
  id: string;
}

function Record(props: RecordProps): JSX.Element {
  return (
    <Text>
      <Text style={{ fontWeight: "bold" }}>{props.max_withdrawable}</Text>
      <Text> sats - </Text>
      <Text style={{ fontWeight: "600" }}>{props.id}</Text>
      {"\n"}
    </Text>
  );
}

interface RecordsListProps {
  records: RecordProps[];
}

export function RecordsList(props: RecordsListProps): JSX.Element {
  return (
    <Text>
      {props.records.map((record) => (
        <Record key={record.id} {...record} />
      ))}
    </Text>
  );
}

