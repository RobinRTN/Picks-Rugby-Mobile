import { View, Text } from "react-native";
import { usePrediction } from "@/src/hooks/usePrediction";

export default function Prediction() {

  const { data, isLoading, error } = usePrediction();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>No data</Text>;

  return (
    <View className="flex-1 justify-center items-center bg-green-main p-4">
      <Text className="text-2xl text-beige-light font-bold font-heading mt-10">
        {data?.matches_by_date.map((match) => (
          <View key={match.date} className="flex-1 justify-center items-center bg-green-main p-4">
            <Text>{match.date}</Text>
            {match.matches.map((match) => (
              <View key={match.id} className="flex-1 justify-center items-center bg-green-main p-4">
                <Text>{match.home_team.name} - {match.away_team.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </Text>
    </View>
  );
}
