import { useQuery } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'
import { PokeballBg } from '../../components'
import { FlatList } from 'react-native-gesture-handler'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemons = []} = useQuery({ 
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60 // 60 minutos
  })

  return (
    <View style={ globalTheme.globalMargin } >
      <PokeballBg  style={styles.imgPosition} />

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        style={{paddingTop: top + 20}}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
