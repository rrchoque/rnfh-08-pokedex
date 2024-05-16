import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import { FAB, Text, useTheme } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons'
import { FullScreenLoader, PokeballBg } from '../../components'
import { FlatList } from 'react-native-gesture-handler'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigator/StackNavigator'

interface Props extends StackScreenProps<RootStackParams,'HomeScreen'>{};

export const HomeScreen = ({ navigation }: Props) => {
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const theme = useTheme();

  //* Esta es la forma tradicional de una petición http
  // const {isLoading, data: pokemons = []} = useQuery({ 
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60 // 60 minutos
  // })

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 60 minutes
    //queryFn: (params) =>  getPokemons(params.pageParam),
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={ globalTheme.globalMargin } >
      <PokeballBg  style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        style={{paddingTop: top + 20}}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

      <FAB 
        icon={'search'}
        style={[ globalTheme.fab, { backgroundColor: theme.colors.primary } ]}
        mode="elevated"
        color={ theme.dark ? 'black': 'white' }
        onPress={() => navigation.push('SearchScreen') }
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
