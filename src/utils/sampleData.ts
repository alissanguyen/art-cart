export const EXAMPLE_PRODUCT_LISTING: Record<string, Product> = {
  laksjflkajs232323: {
    artistId: "abc123",
    displayName: "My Neighbor Totoro Impressionist Painting",
    isFavorited: false,
    notableBadges: [],
    numberOfFavorites: 123,
    numberofCopiesSold: 0,
    priceInUsd: 123,
    previewImageSrc: `https://static.displate.com/280x392/displate/2020-11-16/541489ac4907205537d08397d4f4b00d_2937f0d3b000bca476ef5f1c29f21050.jpg`,
  },
  alksfjklasjfklajsklfajsf: {
    artistId: "abc123",
    displayName: "Princess Mononoke Oil Painting",
    isFavorited: false,
    notableBadges: [],
    numberOfFavorites: 2312,
    numberofCopiesSold: 0,
    priceInUsd: 69.42,
    previewImageSrc: `https://static.displate.com/280x392/displate/2020-11-17/f35cb731e0e6260c3cd69c4b808df61c_a70dd9f95f29593a9ac3e8b93c2677d3.jpg`,
  },
  hfuehfhwebfjsbfjs: {
    artistId: "abc123",
    displayName: "Naruto Red Circle",
    isFavorited: false,
    notableBadges: [],
    numberOfFavorites: 212,
    numberofCopiesSold: 0,
    priceInUsd: 87,
    previewImageSrc: `https://static.displate.com/280x392/displate/2019-12-13/62838514fcbaed03aa752807c0b2009a_91c7095ad0da2872cb374c84282b91b7.jpg`,
  },
  kahdkgfkgjkgekhui: {
    artistId: "abddw23",
    displayName: "Ruby",
    isFavorited: true,
    notableBadges: [],
    numberofCopiesSold: 12,
    numberOfFavorites: 235,
    priceInUsd: 350,
    previewImageSrc: `https://cdnb.artstation.com/p/assets/images/images/030/318/171/large/c-j-pose1-new5-s-crop.jpg?1600248803`,
  },
};

export const EXAMPLE_ARTISTS: Record<string, Artist> = {
  abc123: {
    artistId: "abc123",
    associatedArtworkIds: ["laksjflkajs232323", "alksfjklasjfklajsklfajsf"],
    displayName: "Hayao Miyazaki",
    bio: 'a very talented Japanese artist',
    overallRating: 4.5,
    reviews: ['great artworks', 'fast shipping', 'artwork carefully wrapped'],
    favoriteArtworks: ["kahdkgfkgjkgekhui"]
  },
  abddw23: {
    artistId: "abddw23",
    associatedArtworkIds: ["kahdkgfkgjkgekhui"],
    displayName: "C J",
    bio: 'a very talented American artist',
    overallRating: 4,
    reviews: ['amazing artworks', 'fast shipping', 'artwork carefully wrapped'],
    favoriteArtworks: ["kahdkgfkgjkgekhui", "laksjflkajs232323"]
  },
};
