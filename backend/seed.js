require('dotenv').config();
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

const seed = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/paradise';
  await connectDB(mongoURI);

  // Admin user
  const adminEmail = 'admin@paradise.com';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = new User({
      name: 'Paradise Admin',
      email: adminEmail,
      password: 'admin123', // ⚠️ hash in production
      isAdmin: true
    });
    await admin.save();
    console.log('✅ Admin created:', adminEmail);
  }

  // Paradise Hyderabadi Menu
  const items = [
    // 🍲 Starters
    {
      name: 'Chicken 65',
      description: 'Crispy deep-fried chicken with curry leaves & spices.',
      category: 'Starters',
      price: 220,
      image: 'https://media.istockphoto.com/id/1265209311/photo/fried-chicken-kebab-or-kabab.jpg?s=612x612&w=0&k=20&c=cq6fgpRnjpiD3ILifT3bPg2m8EnxtUvG7M8oB-9h1MY='
    },
    {
      name: 'Paneer 65',
      description: 'Paneer cubes tossed in Hyderabadi masala.',
      category: 'Starters',
      price: 200,
      image: 'https://media.istockphoto.com/id/1175005402/photo/paneer-manchurian-in-bowl-at-black-concrete-background-paneer-manchurian-is-indian-chinese.jpg?s=612x612&w=0&k=20&c=PZgGHk-ssy0e1_3Ro8NLxx_AvFhz5D8OPF_lCjMrYrg='
    },
    {
      name: 'Apollo Fish',
      description: 'Boneless fish tossed with spicy masala.',
      category: 'Starters',
      price: 280,
      image: 'https://media.istockphoto.com/id/1230001174/photo/fried-cod-fillet-with-fresh-vegetables.jpg?s=612x612&w=0&k=20&c=d3zoqHtISpWslyS-g7iLBZnuKog3zFg2jdmfw8LlfaY='
    },
    {
      name: 'Pepper Chicken',
      description: 'Spicy chicken fry with black pepper.',
      category: 'Starters',
      price: 250,
      image: 'https://media.istockphoto.com/id/1138127308/photo/jamaican-jerk-chicken-wings-top-view.jpg?s=612x612&w=0&k=20&c=oqiy7-oXYxKBVgCzDPA4TrFPx_4o9l95l1Y4K5hfS_o='
    },
    {
      name: 'Paneer Tikka',
      description: 'Grilled paneer with yogurt & spices.',
      category: 'Starters',
      price: 230,
      image: 'https://media.istockphoto.com/id/2181204121/photo/a-closeup-picture-of-a-tasty-panner-tikka-served-in-a-plate-at-a-restaurant.jpg?s=612x612&w=0&k=20&c=ag27UhNUrjrwdUj_hNZSOAfrPIPQ0sdnd_qjjpNNf2c='
    },

    // 🍛 Biryanis
    {
      name: 'Chicken Dum Biryani',
      description: 'Authentic Hyderabadi chicken biryani cooked on dum.',
      category: 'Biryani',
      price: 320,
      image: 'https://media.istockphoto.com/id/1396899676/photo/closeup-of-dum-baked-chicken-tikka-biryani-prepared-with-juicy-marinated-and-barbecued.jpg?s=612x612&w=0&k=20&c=U97DX1OgoAKMf_LsB6By2YUpioqcbBq4V3e9JdAcXRk='
    },
    {
      name: 'Mutton Dum Biryani',
      description: 'Tender mutton cooked with basmati rice & spices.',
      category: 'Biryani',
      price: 380,
      image: 'https://media.istockphoto.com/id/1453793327/photo/homemade-goat-fry-biryani-mutton-dum-biryani.jpg?s=612x612&w=0&k=20&c=i9x91ZYk-vNdACvJ-ljyx3neVcO1S_XZkVrJgwXccp0='
    },
    {
      name: 'Veg Dum Biryani',
      description: 'Flavorful biryani with vegetables.',
      category: 'Biryani',
      price: 250,
      image: 'https://media.istockphoto.com/id/1292442924/photo/traditional-hyderabadi-vegetable-veg-dum-biryani-with-mixed-veggies-served-with-mixed-raita.jpg?s=612x612&w=0&k=20&c=qnjf7lPWGRZf0sLroltZcc3Tiu6pDwfkFzricoV1kFQ='
    },
    {
      name: 'Egg Biryani',
      description: 'Spicy biryani layered with boiled eggs.',
      category: 'Biryani',
      price: 240,
      image: 'https://media.istockphoto.com/id/651110156/photo/egg-biryani-served-with-yogurt-dip-on-a-clay-pot-selective-focus.jpg?s=612x612&w=0&k=20&c=ElJdGWDqulk9OtBQeFHNRvNckbhArSOJR7K17vMMtFc='
    },
    {
      name: 'Special Family Pack Biryani',
      description: 'Large portion, perfect for family meals.',
      category: 'Biryani',
      price: 950,
      image: 'https://media.istockphoto.com/id/1349363909/photo/top-view-of-delicious-eastern-rice-dish-its-so-hot-and-spicy-and-very-healthy-made-by-the.jpg?s=612x612&w=0&k=20&c=mERc2h7ViS5TkV4St6hw1af0xd41M_Zqp3JGtEE5Bd4='
    },

    // 🍗 Curries
    {
      name: 'Butter Chicken',
      description: 'Chicken in rich buttery tomato gravy.',
      category: 'Curries',
      price: 300,
      image: 'https://media.istockphoto.com/id/1437063730/photo/butter-chicken-karahi-or-chicken-makhni-with-onion-and-chili-served-in-a-dish-isolated-on.jpg?s=612x612&w=0&k=20&c=cPbESsLYcNYpJV488bx0hnNc3vjpQTrUPNczLBGVE94='
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Paneer cubes cooked in buttery tomato curry.',
      category: 'Curries',
      price: 280,
      image: 'https://media.istockphoto.com/id/666569534/photo/kadai-paneer-matar-or-jafrezi-curry-indian-food.jpg?s=612x612&w=0&k=20&c=S3OlsxZ1aJfJTfk1Tobc7T4z65j6u5qeNwDlsJa18dw='
    },
    {
      name: 'Mutton Rogan Josh',
      description: 'Kashmiri-style mutton curry full of flavor.',
      category: 'Curries',
      price: 350,
      image: 'https://media.istockphoto.com/id/1309538220/photo/rogan-josh.jpg?s=612x612&w=0&k=20&c=BbE-J3j_Zklr_oGP7Z3A02NK5euTHCzx9Ynudy710gw='
    },
    {
      name: 'Chicken Chettinad',
      description: 'South Indian chicken curry with spices.',
      category: 'Curries',
      price: 310,
      image: 'https://media.istockphoto.com/id/908271102/photo/indian-traditional-mushroom-recipe.jpg?s=612x612&w=0&k=20&c=nXYdFPpHD8QHlO6vDZUCe7ZduquCP9kOB4OL-8dApog='
    },
    {
      name: 'Dal Tadka',
      description: 'Yellow dal tempered with garlic & ghee.',
      category: 'Curries',
      price: 180,
      image: 'https://media.istockphoto.com/id/1289218716/photo/traditional-indian-lentils-soup-or-yellow-dal.jpg?s=612x612&w=0&k=20&c=Mdm4BlPNBoaFO2QWaRAGZaMcQxJIwk9TNEi_zc1UYAQ='
    },
    {
      name: 'Palak Paneer',
      description: 'Cottage cheese in spinach curry.',
      category: 'Curries',
      price: 260,
      image: 'https://media.istockphoto.com/id/1395371502/photo/palak-paneer-and-tandoori-roti.jpg?s=612x612&w=0&k=20&c=8iqrvrhGxTC9zklH2xOPvMcUkd7oBOsPU1m6nQx6DeU='
    },

    // 🫓 Breads
    {
      name: 'Butter Naan',
      description: 'Soft naan topped with butter.',
      category: 'Breads',
      price: 50,
      image: 'https://media.istockphoto.com/id/1143530040/photo/indian-naan-bread-with-garlic-butter-on-wooden-table.jpg?s=612x612&w=0&k=20&c=71SgbJtnfiHUiud1oGxnhiZsx5nuivWwZt8DlIk8hi0='
    },
    {
      name: 'Garlic Naan',
      description: 'Naan with garlic & coriander.',
      category: 'Breads',
      price: 60,
      image: 'https://media.istockphoto.com/id/674462754/photo/coriander-naan-bread-on-wooden-board.jpg?s=612x612&w=0&k=20&c=wlbHHXMMy4R0BkrKpe-nJstJ157LBZTiLInMkzHUeHA='
    },
    {
      name: 'Rumali Roti',
      description: 'Thin soft roti perfect with curries.',
      category: 'Breads',
      price: 40,
      image: 'https://media.istockphoto.com/id/960453798/photo/fresh-chapatti-in-woven-palm-leaf-basket.jpg?s=612x612&w=0&k=20&c=kSSPsQiQVNtYp6mGtNYlRcrUpFw7tQzbpYfjGmNWqYw='
    },
    {
      name: 'Tandoori Roti',
      description: 'Whole wheat flatbread from clay oven.',
      category: 'Breads',
      price: 35,
      image: 'https://media.istockphoto.com/id/2229588298/photo/pile-of-naan-bread-on-a-plate.jpg?s=612x612&w=0&k=20&c=ZR_znmJLvxgjlLhWMIcX4q9MsgjEWuS9ZvkmJA_wTLo='
    },
    // 🍰 Desserts
    {
      name: 'Double Ka Meetha',
      description: 'Hyderabadi bread pudding with dry fruits.',
      category: 'Desserts',
      price: 120,
      image: 'https://media.istockphoto.com/id/1318273648/photo/bread-halwa-sweet-dessert-prepared-with-bread-and-garnished-with-almonds.jpg?s=612x612&w=0&k=20&c=YwVCd1l5yuk-Oi3Fcb9HPWSZ2Hl5htD_j5DCPaqGGrc='
    },
    {
      name: 'Qubani Ka Meetha',
      description: 'Apricot dessert from Hyderabad.',
      category: 'Desserts',
      price: 150,
      image: 'https://media.istockphoto.com/id/1396447003/photo/kolak-without-coconut-cream.jpg?s=612x612&w=0&k=20&c=hXz4bxGX6M7UMpGGOWzpi7eQHF3LAVMdj1WaRwNidlc='
    },
    {
      name: 'Gulab Jamun',
      description: 'Fried dumplings in sugar syrup.',
      category: 'Desserts',
      price: 100,
      image: 'https://media.istockphoto.com/id/163064596/photo/gulab-jamun.jpg?s=612x612&w=0&k=20&c=JvJ4AAs-N5pRzzRmVg1lG0talC3QoUt0ZGiO1NKz-kQ='
    },
    {
      name: 'Khurbani Ice Cream',
      description: 'Apricot-flavored ice cream delight.',
      category: 'Desserts',
      price: 180,
      image: 'https://media.istockphoto.com/id/1705115060/photo/food-photos-various-entrees-appetizers-deserts-etc.jpg?s=612x612&w=0&k=20&c=_nztc_tBojfTBMTiFk6-h7xejSRma-EoZLWODJM60jQ='
    },
    {
      name: 'Rasmalai',
      description: 'Soft paneer balls soaked in creamy milk.',
      category: 'Desserts',
      price: 160,
      image: 'https://media.istockphoto.com/id/1408919738/photo/angoori-ras-malai-is-an-indian-dessert.jpg?s=612x612&w=0&k=20&c=-StwcjS5WzzLInYXqmee1-ecqVE11oscOglcYllJI-Y='
    },

    // 🥤 Drinks
    {
      name: 'Irani Chai',
      description: 'Famous Hyderabadi tea.',
      category: 'Drinks',
      price: 40,
      image: 'https://media.istockphoto.com/id/842767432/photo/tea.jpg?s=612x612&w=0&k=20&c=y66wXKyQJSafR0eXH2U0coQSl5c6n9aXU9daoY61Xyw='
    },
    {
      name: 'Lassi',
      description: 'Refreshing yogurt drink.',
      category: 'Drinks',
      price: 60,
      image: 'https://media.istockphoto.com/id/2214087109/photo/lassi-in-clay-cup-topped-with-dry-fruits.jpg?s=612x612&w=0&k=20&c=y8yMkG9FpKJroMDrev7QFj4L9MjJ9ZahF0CZ-bAXSYA='
    },
    {
      name: 'Falooda',
      description: 'Rose-flavored milkshake with vermicelli & basil seeds.',
      category: 'Drinks',
      price: 120,
      image: 'https://media.istockphoto.com/id/1410280579/photo/falooda.jpg?s=612x612&w=0&k=20&c=OzzC1tB1JFY7h0WJuQlziEnRBCoaGbav-wdtoUDfNCk='
    },
    {
      name: 'Mango Lassi',
      description: 'Sweet mango & yogurt blend.',
      category: 'Drinks',
      price: 90,
      image: 'https://media.istockphoto.com/id/174958711/photo/non-alcoholic-mango-passion-cocktail-on-the-classic-black-bar-table.jpg?s=612x612&w=0&k=20&c=pazafmZgU7PctJrMQJ0qaQUpxMTsFtnBYQpjm8-aaGQ='
    },
    {
      name: 'Masala Chaas',
      description: 'Spiced buttermilk drink.',
      category: 'Drinks',
      price: 40,
      image: 'https://media.istockphoto.com/id/2104303077/photo/buttermilk-drink-in-glass-cups-closeup-view.jpg?s=612x612&w=0&k=20&c=u170GoT-yDzgmopbzr6aF0zAun74YfMMk66ahipkVjk='
    }
  ];

  await MenuItem.deleteMany({});
  await MenuItem.insertMany(items);
  console.log('✅ Paradise Hyderabadi menu seeded with ₹');

  process.exit();
};

seed().catch(err => console.error(err));
