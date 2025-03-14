## Environment Variables

Make sure to set your Database url env var for prisma to connect:

```
DATABASE_URL=database_url_here
```

## Generate the types

```
npx prisma format
npx prisma generate
```

## Seed the database

There are two files available for seeding

#### `supported_ordinal_collections.json` and `your_owned_ordinals.json`

### Run

```
npx prisma db seed
```

## Getting Started

```
npm run dev
```

and go to `localhost:3000`
