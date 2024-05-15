import { StackScreenProps } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import { RootStackParams } from '../../navigator/StackNavigator'
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {

  const {pokemonId} = route.params;

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (!pokemon) {
    return <FullScreenLoader />;
  }

  return (
    <View>
      <Text>PokemonScreen { pokemon.name }</Text>
    </View>
  )
}