import { useState, useEffect, useContext, createContext } from "react";
import { restaurantAPI, orderAPI, authAPI, authHelpers, cartAPI, reviewAPI } from './api';

const RESTAURANTS = [
  {id:1,name:"Spice Garden",cuisine:"North Indian",emoji:"🍛",rating:4.7,reviews:842,deliveryTime:"25-35",price:"₹₹",tags:["Popular","Spicy"],open:true,description:"Authentic Mughal flavors from the heart of Delhi",veg:false},
  {id:2,name:"Dragon Palace",cuisine:"Chinese",emoji:"🥡",rating:4.5,reviews:631,deliveryTime:"30-40",price:"₹₹",tags:["Trending"],open:true,description:"Wok-fresh dishes inspired by Sichuan street food",veg:false},
  {id:3,name:"The Green Bowl",cuisine:"Healthy",emoji:"🥗",rating:4.8,reviews:415,deliveryTime:"20-30",price:"₹₹₹",tags:["Healthy","Veg"],open:true,description:"Farm-to-table bowls packed with nutrients",veg:true},
  {id:4,name:"Pizza Republic",cuisine:"Italian",emoji:"🍕",rating:4.6,reviews:978,deliveryTime:"35-45",price:"₹₹",tags:["Bestseller"],open:true,description:"Stone-baked pizzas with authentic Italian recipes",veg:false},
  {id:5,name:"Burger Lab",cuisine:"American",emoji:"🍔",rating:4.4,reviews:763,deliveryTime:"20-30",price:"₹",tags:["Budget","Fast"],open:true,description:"Smash burgers crafted with locally sourced beef",veg:false},
  {id:6,name:"Sushi Sakura",cuisine:"Japanese",emoji:"🍣",rating:4.9,reviews:289,deliveryTime:"40-50",price:"₹₹₹₹",tags:["Premium","New"],open:true,description:"Omakase-inspired rolls from a Michelin-trained chef",veg:false},
  {id:7,name:"Café Monsoon",cuisine:"Café",emoji:"☕",rating:4.6,reviews:523,deliveryTime:"15-25",price:"₹₹",tags:["Cozy"],open:true,description:"All-day breakfast and artisan brews",veg:true},
  {id:8,name:"The Curry House",cuisine:"South Indian",emoji:"🍲",rating:4.5,reviews:447,deliveryTime:"30-40",price:"₹",tags:["Traditional"],open:false,description:"Traditional Chettinad recipes from Tamil Nadu",veg:false},
  {id:9,name:"Taco Fiesta",cuisine:"Mexican",emoji:"🌮",rating:4.3,reviews:334,deliveryTime:"25-35",price:"₹₹",tags:["Fun","Casual"],open:true,description:"Street-style tacos with fresh homemade salsas",veg:false},
  {id:10,name:"The Vegan Co.",cuisine:"Vegan",emoji:"🌱",rating:4.7,reviews:198,deliveryTime:"35-45",price:"₹₹₹",tags:["Vegan","Healthy"],open:true,description:"100% plant-based comfort food done right",veg:true},
  {id:11,name:"Kebab Express",cuisine:"Mughlai",emoji:"🍢",rating:4.4,reviews:601,deliveryTime:"25-35",price:"₹₹",tags:["Meaty"],open:true,description:"Smoky seekh kebabs grilled over coal flame",veg:false},
  {id:12,name:"Biryani Brothers",cuisine:"Hyderabadi",emoji:"🍚",rating:4.8,reviews:1204,deliveryTime:"40-50",price:"₹₹",tags:["Bestseller","Spicy"],open:true,description:"Dum-cooked biryani in traditional handis",veg:false},
  {id:13,name:"Waffle Wonder",cuisine:"Desserts",emoji:"🧇",rating:4.5,reviews:382,deliveryTime:"20-30",price:"₹₹",tags:["Sweet","Trending"],open:true,description:"Belgian waffles with 30+ topping combinations",veg:true},
  {id:14,name:"Thai Orchid",cuisine:"Thai",emoji:"🍜",rating:4.6,reviews:298,deliveryTime:"35-45",price:"₹₹₹",tags:["Authentic"],open:true,description:"Royal Thai kitchen recipes passed down for generations",veg:false},
  {id:15,name:"Street Bites",cuisine:"Street Food",emoji:"🥘",rating:4.3,reviews:889,deliveryTime:"15-25",price:"₹",tags:["Budget","Local"],open:true,description:"Best of Bangalore street food at your doorstep",veg:false},
  {id:16,name:"Korean Kitchen",cuisine:"Korean",emoji:"🍱",rating:4.5,reviews:213,deliveryTime:"35-45",price:"₹₹₹",tags:["K-Food","Trending"],open:true,description:"Authentic kimchi, bibimbap and Korean BBQ",veg:false},
  {id:17,name:"Poke Paradise",cuisine:"Hawaiian",emoji:"🐟",rating:4.6,reviews:167,deliveryTime:"20-30",price:"₹₹₹",tags:["Fresh","Trending"],open:true,description:"Build-your-own poke bowls with premium toppings",veg:false},
  {id:18,name:"The Pancake Lab",cuisine:"Breakfast",emoji:"🥞",rating:4.7,reviews:276,deliveryTime:"25-35",price:"₹₹",tags:["Brunch"],open:true,description:"Fluffy Japanese soufflé pancakes all day long",veg:true},
];

// MENU is empty — items will come from your backend
const MENU = {};

const EVENTS=[
  {id:1,name:"Jazz Night at Leela",emoji:"🎷",cat:"Music",date:"Apr 26",time:"7:00 PM",price:799,venue:"The Leela Palace",tags:["Live Music","Premium"]},
  {id:2,name:"Street Food Festival",emoji:"🎪",cat:"Food",date:"Apr 27",time:"12:00 PM",price:199,venue:"Cubbon Park",tags:["Outdoor","Family"]},
  {id:3,name:"Comedy Chaos Night",emoji:"😂",cat:"Comedy",date:"Apr 28",time:"8:00 PM",price:499,venue:"The Comedy Factory",tags:["Adults","Fun"]},
  {id:4,name:"Wine & Dine Evening",emoji:"🍷",cat:"Dining",date:"Apr 29",time:"6:30 PM",price:1499,venue:"Taj West End",tags:["Romantic","Exclusive"]},
  {id:5,name:"Rooftop Bollywood Night",emoji:"🎬",cat:"Music",date:"Apr 30",time:"9:00 PM",price:699,venue:"Skybar 360",tags:["Party","Rooftop"]},
  {id:6,name:"Sip & Paint Workshop",emoji:"🎨",cat:"Workshop",date:"May 2",time:"4:00 PM",price:899,venue:"Canvas & Co.",tags:["Creative","Couples"]},
  {id:7,name:"Food Startup Expo",emoji:"🚀",cat:"Networking",date:"May 3",time:"10:00 AM",price:0,venue:"BIC",tags:["Free","Networking"]},
  {id:8,name:"Open Mic Night",emoji:"🎤",cat:"Comedy",date:"May 4",time:"7:30 PM",price:299,venue:"Café Noir",tags:["Intimate"]},
  {id:9,name:"Biryani Battle",emoji:"🏆",cat:"Food",date:"May 5",time:"1:00 PM",price:399,venue:"Phoenix MarketCity",tags:["Competition"]},
  {id:10,name:"Midnight DJ Rave",emoji:"🎧",cat:"Music",date:"May 6",time:"11:00 PM",price:999,venue:"Vapour Pub",tags:["Night","18+"]},
  {id:11,name:"Couples Cooking Class",emoji:"👩‍🍳",cat:"Workshop",date:"May 7",time:"5:00 PM",price:1299,venue:"Culinary Academy",tags:["Romantic"]},
  {id:12,name:"Craft Beer Carnival",emoji:"🍺",cat:"Food",date:"May 8",time:"3:00 PM",price:599,venue:"Toit Brewpub",tags:["Beer","Chill"]},
];

const MOODS={
  Happy:{emoji:"😊",rests:[4,5,2],events:[2,5]},
  Stressed:{emoji:"😤",rests:[12,7,3],events:[6,8]},
  Lazy:{emoji:"😴",rests:[12,4,2],events:[]},
  Party:{emoji:"🥳",rests:[9,11,6],events:[5,10,3]},
  Romantic:{emoji:"❤️",rests:[6,14,4],events:[4,6,11]},
};

const BADGES=[
  {id:1,emoji:"🍕",label:"First Order",earned:true},
  {id:2,emoji:"🔥",label:"Foodie",earned:true},
  {id:3,emoji:"🌍",label:"Explorer",earned:false},
  {id:4,emoji:"🦉",label:"Night Owl",earned:false},
  {id:5,emoji:"👑",label:"VIP",earned:false},
  {id:6,emoji:"⭐",label:"Reviewer",earned:true},
];

// ─── Context ───────────────────────────────────────────────────────────────
const CartCtx = createContext(null);
const AppCtx  = createContext(null);

function AppProvider({ children }) {
  const [page,       setPage]       = useState("home");
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems,  setMenuItems]  = useState([]);   // fetched from backend
  const [menuLoading,setMenuLoading]= useState(false);
  const [orders,     setOrders]     = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [points,     setPoints]     = useState(340);
  const [toasts,     setToasts]     = useState([]);
  const [mood,       setMood]       = useState(null);
  const [weather,    setWeather]    = useState("☀️ Sunny");
  
  // Authentication state
  const [user,       setUser]       = useState(authHelpers.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(authHelpers.isAuthenticated());
  const [authLoading, setAuthLoading] = useState(false);

  const toast = (msg, type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, {id, msg, type}]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  };

  const addOrder = (order) => {
    const o = {...order, id: Date.now(), status: "placed", time: new Date().toLocaleTimeString()};
    setOrders(p => [o, ...p]);
    setPoints(p => p + 50);
    return o;
  };

  // Authentication functions
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      authHelpers.setToken(response.token);
      // Note: You might want to fetch user profile here
      setIsAuthenticated(true);
      setUser({ email }); // Simplified user object
      toast("Login successful!", "success");
      return response;
    } catch (error) {
      toast(error.message || "Login failed", "error");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setAuthLoading(true);
    try {
      const response = await authAPI.register({ name, email, password });
      authHelpers.setToken(response.token);
      setIsAuthenticated(true);
      setUser({ name, email });
      toast("Registration successful!", "success");
      return response;
    } catch (error) {
      toast(error.message || "Registration failed", "error");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    authHelpers.clearAuth();
    setIsAuthenticated(false);
    setUser(null);
    toast("Logged out successfully", "info");
    setPage("home");
  };

  // State for real restaurants from backend
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  
  // Load restaurants from backend on component mount
  useEffect(() => {
    loadRestaurants();
  }, []);
  
  const loadRestaurants = async () => {
    setRestaurantsLoading(true);
    try {
      const data = await restaurantAPI.getAll();
      // Transform backend data to match frontend format
      const transformedRestaurants = data.map(restaurant => ({
        id: restaurant._id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        emoji: "🍽️", // Default emoji
        rating: restaurant.rating || 4.5,
        reviews: Math.floor(Math.random() * 1000), // Random reviews for now
        deliveryTime: "25-35", // Default delivery time
        price: "₹₹", // Default price
        tags: restaurant.isOpen ? ["Popular"] : ["Closed"],
        open: restaurant.isOpen,
        description: `Authentic ${restaurant.cuisine} cuisine`,
        veg: restaurant.menu?.some(item => item.veg) || false,
        menu: restaurant.menu || []
      }));
      setRestaurants(transformedRestaurants);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
      // Keep using hardcoded restaurants as fallback
    }
    setRestaurantsLoading(false);
  };

  // Called when user taps a restaurant — fetches menu from backend
  const viewRestaurant = async (r) => {
    setRestaurant(r);
    setRecentlyViewed(p => [r, ...p.filter(x => x.id !== r.id)].slice(0, 6));
    setPage("restaurant");
    setMenuItems([]);
    setMenuLoading(true);
    try {
      // Try to get restaurant details with menu from backend
      const restaurantData = await restaurantAPI.getById(r.id);
      
      // Transform menu items to match frontend format
      const transformedMenuItems = restaurantData.menu.map((item, index) => {
        // Better emoji assignment based on item name
        let emoji = "🍽️"; // default
        const name = item.name.toLowerCase();
        
        if (name.includes("burger") || name.includes("patty")) emoji = "🍔";
        else if (name.includes("pizza")) emoji = "🍕";
        else if (name.includes("biryani") || name.includes("rice")) emoji = "🍚";
        else if (name.includes("noodle") || name.includes("pasta")) emoji = "🍜";
        else if (name.includes("salad")) emoji = "🥗";
        else if (name.includes("soup")) emoji = "🍲";
        else if (name.includes("taco") || name.includes("burrito")) emoji = "🌮";
        else if (name.includes("sandwich")) emoji = "🥪";
        else if (name.includes("fries")) emoji = "🍟";
        else if (name.includes("chicken") || name.includes("meat")) emoji = "🍗";
        else if (name.includes("fish")) emoji = "🐟";
        else if (name.includes("egg")) emoji = "🍳";
        else if (name.includes("cheese")) emoji = "🧀";
        else if (name.includes("bread") || name.includes("naan") || name.includes("roti")) emoji = "🍞";
        else if (name.includes("roll") || name.includes("spring")) emoji = "🥟";
        else if (item.veg) emoji = "🥗";
        
        return {
          id: item._id || index,
          name: item.name,
          emoji: emoji,
          cat: item.category || "Main Course",
          price: item.price,
          veg: item.veg || false,
          popular: item.popular || false,
          desc: item.description || ""
        };
      });
      
      setMenuItems(transformedMenuItems);
    } catch (error) {
      console.error('Failed to load menu:', error);
      // If restaurant has menu from the list, use it
      if (r.menu && r.menu.length > 0) {
        const transformedMenuItems = r.menu.map((item, index) => {
          // Better emoji assignment based on item name
          let emoji = "🍽️"; // default
          const name = item.name.toLowerCase();
          
          if (name.includes("burger") || name.includes("patty")) emoji = "🍔";
          else if (name.includes("pizza")) emoji = "🍕";
          else if (name.includes("biryani") || name.includes("rice")) emoji = "🍚";
          else if (name.includes("noodle") || name.includes("pasta")) emoji = "🍜";
          else if (name.includes("salad")) emoji = "🥗";
          else if (name.includes("soup")) emoji = "🍲";
          else if (name.includes("taco") || name.includes("burrito")) emoji = "🌮";
          else if (name.includes("sandwich")) emoji = "🥪";
          else if (name.includes("fries")) emoji = "🍟";
          else if (name.includes("chicken") || name.includes("meat")) emoji = "🍗";
          else if (name.includes("fish")) emoji = "🐟";
          else if (name.includes("egg")) emoji = "🍳";
          else if (name.includes("cheese")) emoji = "🧀";
          else if (name.includes("bread") || name.includes("naan") || name.includes("roti")) emoji = "🍞";
          else if (name.includes("roll") || name.includes("spring")) emoji = "🥟";
          else if (item.veg) emoji = "🥗";
          
          return {
            id: index,
            name: item.name,
            emoji: emoji,
            cat: "Main Course",
            price: item.price,
            veg: item.veg || false,
            popular: false,
            desc: item.description || ""
          };
        });
        setMenuItems(transformedMenuItems);
      } else {
        setMenuItems([]);
      }
    }
    setMenuLoading(false);
  };

  return (
    <AppCtx.Provider value={{
      page,setPage,restaurant,viewRestaurant,menuItems,menuLoading,orders,addOrder,recentlyViewed,points,toast,toasts,mood,setMood,weather,setWeather,
      restaurants,restaurantsLoading,loadRestaurants,
      // Authentication
      user,isAuthenticated,authLoading,login,register,logout
    }}>
      {children}
    </AppCtx.Provider>
  );
}

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  
  const add    = (item) => setItems(p => { const e = p.find(i => i.id === item.id); return e ? p.map(i => i.id === item.id ? {...i, qty: i.qty+1} : i) : [...p, {...item, qty:1}]; });
  const remove = (id)   => setItems(p => p.filter(i => i.id !== id));
  const update = (id, qty) => qty <= 0 ? remove(id) : setItems(p => p.map(i => i.id === id ? {...i, qty} : i));
  const clear  = ()     => setItems([]);
  const total  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count  = items.reduce((s, i) => s + i.qty, 0);
  
  return <CartCtx.Provider value={{items,add,remove,update,clear,total,count,open,setOpen}}>{children}</CartCtx.Provider>;
}

const useCart = () => useContext(CartCtx);
const useApp  = () => useContext(AppCtx);

// ─── Styles ────────────────────────────────────────────────────────────────
const S = {
  app:    { display:"flex", flexDirection:"column", height:"100vh", background:"#f8f5f1", color:"#1a1a1a", fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:14, overflow:"hidden" },
  navbar: { display:"flex", alignItems:"center", gap:10, padding:"0 16px", height:52, background:"#ffffff", borderBottom:"1px solid #e8e2db", flexShrink:0, zIndex:100, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" },
  logo:   { fontWeight:800, fontSize:20, background:"linear-gradient(135deg,#e8440a,#ff7c45)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", cursor:"pointer", marginRight:4 },
  main:   { flex:1, overflowY:"auto", padding:16 },
  card:   { background:"#ffffff", border:"1px solid #ede8e1", borderRadius:14, overflow:"hidden", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" },
  btn:    (v="primary") => ({ padding:"8px 16px", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:600, display:"inline-flex", alignItems:"center", gap:6, transition:"all 0.2s",
    ...(v==="primary"  ? { background:"#e8440a", color:"#fff" } : {}),
    ...(v==="ghost"    ? { background:"#f2ede7", color:"#1a1a1a", border:"1px solid #ddd6ce" } : {}),
    ...(v==="outline"  ? { background:"transparent", color:"#e8440a", border:"1px solid #e8440a" } : {}),
  }),
  input:  { width:"100%", background:"#faf8f5", border:"1px solid #ddd6ce", borderRadius:10, padding:"9px 12px", color:"#1a1a1a", fontFamily:"inherit", fontSize:13, outline:"none" },
  tag:    (c="orange") => {
    const map = { orange:["#fde8de","#c4370a"], green:["#dcf5e7","#1a7a40"], blue:["#ddeeff","#1a5fa8"], purple:["#ede8ff","#5c35b5"], yellow:["#fff3d4","#9a6c00"] };
    const [bg,col] = map[c]||map.orange;
    return { padding:"2px 8px", borderRadius:6, fontSize:11, fontWeight:600, background:bg, color:col };
  },
  section:{ fontWeight:800, fontSize:17, marginBottom:12, display:"flex", alignItems:"center", gap:8, fontFamily:"inherit", color:"#1a1a1a" },
  grid:   { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 },
  chip:   (active) => ({ padding:"6px 14px", borderRadius:20, border:`1px solid ${active?"#e8440a":"#ddd6ce"}`, background:active?"#fde8de":"#ffffff", color:active?"#e8440a":"#666", cursor:"pointer", fontSize:12, fontWeight:600, whiteSpace:"nowrap" }),
  modal:  { position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", padding:16 },
  modalBox: { background:"#ffffff", border:"1px solid #ede8e1", borderRadius:18, width:"100%", maxWidth:460, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.15)" },
  drawer: { position:"fixed", right:0, top:0, bottom:0, width:360, background:"#ffffff", borderLeft:"1px solid #ede8e1", zIndex:300, display:"flex", flexDirection:"column", boxShadow:"-4px 0 20px rgba(0,0,0,0.08)" },
};

// ─── Toast ─────────────────────────────────────────────────────────────────
function Toasts() {
  const { toasts } = useApp();
  if (!toasts?.length) return null;
  const icons = { success:"✅", error:"❌", info:"💬" };
  return (
    <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:999,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none"}}>
      {toasts.map(t => (
        <div key={t.id} style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:"9px 16px",fontSize:13,display:"flex",alignItems:"center",gap:8,color:"#1a1a1a",boxShadow:"0 4px 16px rgba(0,0,0,0.12)"}}>
          {icons[t.type]||"💬"} {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const { page, setPage, isAuthenticated, logout } = useApp();
  const { count, setOpen } = useCart();
  const tabs = [["home","🏠","Home"],["food","🍔","Food"],["dine","🍽️","Dine"],["events","🎟️","Events"],["orders","📦","Orders"],["smart","🧠","Smart"]];
  const isFood = ["restaurant","checkout","tracking"].includes(page);
  return (
    <nav style={S.navbar}>
      <div style={S.logo} onClick={() => setPage("home")}>FOODELO</div>
      <div style={{display:"flex",gap:2,flex:1,overflowX:"auto"}}>
        {tabs.map(([k,ic,lb]) => {
          const active = page===k || (isFood && k==="food");
          return (
            <button key={k} onClick={() => setPage(k)} style={{padding:"5px 11px",borderRadius:8,border:"none",background:active?"#fde8de":"transparent",color:active?"#e8440a":"#555",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>
              {ic} {lb}
            </button>
          );
        })}
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {isAuthenticated ? (
          <>
            <button 
              onClick={() => setPage("addRestaurant")} 
              style={{...S.btn("outline"),padding:"6px 12px",fontSize:11}}
            >
              ➕ Add Restaurant
            </button>
            <button 
              onClick={logout} 
              style={{...S.btn("ghost"),padding:"6px 12px",fontSize:11}}
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={() => setPage("auth")} 
            style={{...S.btn("primary"),padding:"6px 12px",fontSize:11}}
          >
            Login / Register
          </button>
        )}
        <button onClick={() => setOpen(true)} style={{...S.btn("ghost"),position:"relative",padding:"7px 12px"}}>
          🛒 Cart {count > 0 && <span style={{background:"#e8440a",color:"#fff",fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:10}}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}

// ─── Cart ──────────────────────────────────────────────────────────────────
function CartDrawer() {
  const { items, update, remove, total, open, setOpen } = useCart();
  const { toast, setPage } = useApp();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);
  if (!open) return null;
  const delivery = total > 0 ? 49 : 0;
  const taxes = Math.round(total * 0.05);
  const grand = total + delivery + taxes - discount;
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "CRAVELY20") { setDiscount(Math.round(total * 0.2)); setApplied(true); toast("20% discount applied! 🎉","success"); }
    else toast("Invalid coupon","error");
  };
  return (
    <>
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:299}} onClick={() => setOpen(false)} />
      <div style={S.drawer}>
        <div style={{padding:16,borderBottom:"1px solid #ede8e1",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontWeight:700,fontSize:16,color:"#1a1a1a"}}>🛒 Your Cart</span>
          <button onClick={() => setOpen(false)} style={{...S.btn("ghost"),padding:"4px 10px"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:14}}>
          {items.length === 0 ? (
            <div style={{textAlign:"center",padding:"40px 0",color:"#999"}}>
              <div style={{fontSize:40,marginBottom:10}}>🛒</div>
              <div>Cart is empty</div>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #f0ebe4"}}>
                  <span style={{fontSize:28}}>{item.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13,color:"#1a1a1a"}}>{item.name}</div>
                    <div style={{color:"#e8440a",fontSize:12}}>₹{item.price}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <button onClick={() => update(item.id, item.qty-1)} style={{width:24,height:24,borderRadius:6,border:"1px solid #ddd6ce",background:"#f8f5f1",color:"#1a1a1a",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontWeight:700,minWidth:18,textAlign:"center",color:"#1a1a1a"}}>{item.qty}</span>
                    <button onClick={() => update(item.id, item.qty+1)} style={{width:24,height:24,borderRadius:6,border:"1px solid #ddd6ce",background:"#f8f5f1",color:"#1a1a1a",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <span style={{cursor:"pointer",fontSize:16}} onClick={() => remove(item.id)}>🗑</span>
                </div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:14}}>
                <input style={{...S.input,flex:1}} placeholder="Coupon (try CRAVELY20)" value={coupon} onChange={e => setCoupon(e.target.value)} disabled={applied} />
                <button style={S.btn("outline")} onClick={applyCoupon} disabled={applied}>{applied?"✓":"Apply"}</button>
              </div>
              <div style={{marginTop:16}}>
                {[["Subtotal",`₹${total}`],["Delivery",`₹${delivery}`],["Taxes",`₹${taxes}`],discount>0&&["Discount",`-₹${discount}`]].filter(Boolean).map(([l,v],i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:13,color:l==="Discount"?"#1a7a40":"#666"}}><span>{l}</span><span style={{color:l==="Discount"?"#1a7a40":"#1a1a1a"}}>{v}</span></div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",fontWeight:700,fontSize:15,borderTop:"1px solid #ede8e1",marginTop:6}}>
                  <span>Total</span><span style={{color:"#e8440a"}}>₹{grand}</span>
                </div>
              </div>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div style={{padding:14,borderTop:"1px solid #ede8e1"}}>
            <button style={{...S.btn("primary"),width:"100%",justifyContent:"center",padding:"11px"}} onClick={() => { setOpen(false); setPage("checkout"); }}>
              Proceed to Checkout → ₹{grand}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Pages ─────────────────────────────────────────────────────────────────
function HomePage() {
  const { setPage, viewRestaurant, mood, setMood, weather, setWeather, toast, restaurants, restaurantsLoading } = useApp();
  const [mystery, setMystery] = useState(null);
  
  const showMystery = () => {
    const availableRestaurants = restaurants.length > 0 ? restaurants : RESTAURANTS.filter(r=>r.open);
    const rests = availableRestaurants.sort(()=>Math.random()-.5).slice(0,3);
    const event = EVENTS[Math.floor(Math.random()*EVENTS.length)];
    setMystery({ rests, event });
    toast("✨ Suggestions ready!","success");
  };
  const weatherMap = {"☀️ Sunny":"Salads & cold drinks 🥗","🌧️ Rainy":"Hot chai & pakoras ☕","🌨️ Cold":"Biryani & hot cocoa 🍫","🥵 Hot":"Ice cream & cold drinks 🍦","🌫️ Foggy":"Spicy chai & street food 🌶️"};
  const moodData = mood && MOODS[mood];
  return (
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#fff4ef,#fef3ff)",border:"1px solid #f5d9cc",borderRadius:18,padding:22,marginBottom:20}}>
        <div style={{fontSize:11,color:"#e8440a",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Good {new Date().getHours()<12?"Morning":new Date().getHours()<17?"Afternoon":"Evening"} 🌆</div>
        <h1 style={{fontWeight:800,fontSize:24,marginBottom:8,color:"#1a1a1a"}}>What are you <span style={{color:"#e8440a"}}>craving</span> today?</h1>
        <p style={{color:"#777",fontSize:13,marginBottom:16}}>Food delivery · Restaurant booking · Events near you</p>
        <button style={{...S.btn("primary"),background:"linear-gradient(135deg,#7c3aed,#e8440a)",padding:"10px 20px",fontSize:14,fontWeight:700}} onClick={showMystery}>
          🎲 I Don't Know What to Eat
        </button>
        {mystery && (
          <div style={{marginTop:14,padding:12,background:"rgba(255,255,255,0.7)",borderRadius:12,border:"1px solid #f0e8e0"}}>
            <div style={{fontSize:11,color:"#e8440a",fontWeight:700,marginBottom:8}}>✨ YOUR PICKS</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {mystery.rests.map(r=><span key={r.id} style={{...S.tag("blue"),cursor:"pointer"}} onClick={()=>viewRestaurant(r)}>{r.emoji} {r.name}</span>)}
              <span style={{...S.tag("purple"),cursor:"pointer"}} onClick={()=>setPage("events")}>{mystery.event.emoji} {mystery.event.name}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mood */}
      <div style={{marginBottom:20}}>
        <div style={S.section}>🧠 Mood Picker <span style={{fontSize:12,fontWeight:400,color:"#999"}}>AI picks based on how you feel</span></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12}}>
          {Object.entries(MOODS).map(([m,v]) => (
            <div key={m} onClick={() => setMood(mood===m?null:m)}
              style={{background:mood===m?"#fde8de":"#ffffff",border:`1px solid ${mood===m?"#e8440a":"#ede8e1"}`,borderRadius:12,padding:"12px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
              <div style={{fontSize:24,marginBottom:4}}>{v.emoji}</div>
              <div style={{fontSize:11,color:mood===m?"#e8440a":"#666",fontWeight:600}}>{m}</div>
            </div>
          ))}
        </div>
        {moodData && (
          <div style={{background:"#eef5ff",border:"1px solid #c5d9f5",borderRadius:12,padding:14}}>
            <div style={{fontSize:11,color:"#1a5fa8",fontWeight:700,marginBottom:8}}>🧠 Picks for {mood} mood</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {moodData.rests.map(id => { 
                const allRestaurants = restaurants.length > 0 ? restaurants : RESTAURANTS;
                const r = allRestaurants.find(x=>x.id===id); 
                return r&&<span key={id} style={{...S.tag("blue"),cursor:"pointer"}} onClick={()=>viewRestaurant(r)}>{r.emoji} {r.name}</span>; 
              })}
              {moodData.events.map(id => { const e=EVENTS.find(x=>x.id===id); return e&&<span key={id} style={{...S.tag("purple"),cursor:"pointer"}} onClick={()=>setPage("events")}>{e.emoji} {e.name}</span>; })}
            </div>
          </div>
        )}
      </div>

      {/* Weather */}
      <div style={{marginBottom:20}}>
        <div style={S.section}>🌤 Weather Suggestions</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {Object.keys(weatherMap).map(w => <button key={w} style={S.chip(weather===w)} onClick={()=>setWeather(w)}>{w}</button>)}
        </div>
        <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:14,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>🍽️</span>
          <div><div style={{fontWeight:600,fontSize:13}}>Perfect for today</div><div style={{color:"#777",fontSize:13}}>{weatherMap[weather]}</div></div>
        </div>
      </div>

      {/* Trending */}
      <div style={{marginBottom:20}}>
        <div style={S.section}>🔥 Trending Now <span style={{fontSize:12,fontWeight:400,color:"#555"}}>{restaurantsLoading ? "Loading..." : "Most ordered today"}</span></div>
        {restaurantsLoading ? (
          <div style={{textAlign:"center",padding:"40px 0",color:"#999"}}>
            <div>Loading restaurants...</div>
          </div>
        ) : (
          <div style={S.grid}>
            {(restaurants.length > 0 ? restaurants : RESTAURANTS).filter(r=>r.tags.some(t=>["Trending","Bestseller","Popular"].includes(t))).slice(0,6).map(r=><RestCard key={r.id} r={r} onClick={()=>viewRestaurant(r)}/>)}
          </div>
        )}
      </div>

      {/* Combos */}
      <div style={{marginBottom:20}}>
        <div style={S.section}>🍽️+🎭 Perfect Combos</div>
        {[
          {food:"🍷 Fine Dining",event:"🎷 Jazz Night",desc:"Sushi Sakura + Jazz Night at Leela"},
          {food:"☕ Café Visit",event:"🎨 Sip & Paint",desc:"Café Monsoon + Sip & Paint Workshop"},
          {food:"🌮 Street Eats",event:"🎪 Food Festival",desc:"Taco Fiesta + Street Food Festival"},
        ].map((c,i)=>(
          <div key={i} onClick={()=>toast(`Combo saved: ${c.desc}`,"success")}
            style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:14,display:"flex",alignItems:"center",gap:12,marginBottom:8,cursor:"pointer",transition:"all .2s"}}>
            <span style={{fontSize:26}}>{c.food.split(" ")[0]}</span>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{c.desc}</div><div style={{fontSize:12,color:"#666",marginTop:2}}>Perfect evening pairing</div></div>
            <span style={{fontSize:26}}>{c.event.split(" ")[0]}</span>
            <span style={S.tag("purple")}>Book</span>
          </div>
        ))}
      </div>

      {/* Events preview */}
      <div>
        <div style={{...S.section,justifyContent:"space-between"}}>
          <span>🎉 Upcoming Events</span>
          <span style={{fontSize:13,fontWeight:600,color:"#e8440a",cursor:"pointer"}} onClick={()=>setPage("events")}>See all →</span>
        </div>
        <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8}}>
          {EVENTS.slice(0,5).map(e=>(
            <div key={e.id} style={{...S.card,flexShrink:0,width:180}} onClick={()=>setPage("events")}>
              <div style={{height:90,background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,position:"relative"}}>
                {e.emoji}
                <span style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,.8)",borderRadius:6,padding:"2px 7px",fontSize:10,fontWeight:700,color:"#e8440a"}}>{e.date}</span>
              </div>
              <div style={{padding:10}}>
                <div style={{fontWeight:700,fontSize:12,marginBottom:3}}>{e.name}</div>
                <div style={{fontSize:11,color:"#666",marginBottom:5}}>{e.venue}</div>
                <span style={{color:"#e8440a",fontWeight:700,fontSize:12}}>{e.price===0?"Free":`₹${e.price}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RestCard({ r, onClick }) {
  return (
    <div style={S.card} onClick={onClick}>
      <div style={{height:120,background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,position:"relative"}}>
        {r.emoji}
        {!r.open && <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>Closed</div>}
      </div>
      <div style={{padding:12}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{r.name}</div>
        <div style={{fontSize:12,color:"#777",display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}>
          <span style={{color:"#9a6c00",fontWeight:700}}>⭐ {r.rating}</span>
          <span>· {r.cuisine} · {r.price}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:"#555"}}>🕐 {r.deliveryTime} min</span>
          {r.tags.slice(0,2).map(t=><span key={t} style={S.tag(t==="Veg"||t==="Vegan"||t==="Healthy"?"green":t==="Premium"?"purple":"orange")}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function FoodPage() {
  const { viewRestaurant, recentlyViewed, restaurants, restaurantsLoading } = useApp();
  const [filter, setFilter]   = useState("All");
  const [sort,   setSort]     = useState("rating");
  const [vegOnly,setVegOnly]  = useState(false);
  const [loading,setLoading]  = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);
  const filters = ["All","Indian","Chinese","Italian","Japanese","Healthy","Fast Food","Veg"];
  const cuisineMap = { Indian:["North Indian","South Indian","Hyderabadi","Mughlai"], Chinese:["Chinese","Korean"], Italian:["Italian"], Japanese:["Japanese"], Healthy:["Healthy","Vegan"], "Fast Food":["American","Street Food"] };
  
  // Use backend restaurants if available, otherwise fallback to hardcoded
  const availableRestaurants = restaurants.length > 0 ? restaurants : RESTAURANTS;
  
  let list = availableRestaurants.filter(r => {
    if (vegOnly && !r.veg) return false;
    if (filter === "All") return true;
    if (filter === "Veg") return r.veg;
    return (cuisineMap[filter]||[]).includes(r.cuisine);
  }).sort((a,b) => sort==="rating" ? b.rating-a.rating : sort==="delivery" ? parseInt(a.deliveryTime)-parseInt(b.deliveryTime) : a.price.length-b.price.length);
  return (
    <div>
      {recentlyViewed.length > 0 && (
        <div style={{marginBottom:18}}>
          <div style={{...S.section,fontSize:15}}>⏰ Recently Viewed</div>
          <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:6}}>
            {recentlyViewed.map(r=>(
              <div key={r.id} style={{flexShrink:0,textAlign:"center",cursor:"pointer",width:70}} onClick={()=>viewRestaurant(r)}>
                <div style={{width:56,height:56,borderRadius:12,background:"#f8f5f1",border:"1px solid #ddd6ce",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 5px"}}>{r.emoji}</div>
                <div style={{fontSize:10,color:"#777",lineHeight:1.3}}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{...S.section,marginBottom:0}}>🍴 Restaurants <span style={{fontSize:12,fontWeight:400,color:"#555"}}>{list.length} found</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <label style={{display:"flex",alignItems:"center",gap:5,fontSize:12,cursor:"pointer",color:vegOnly?"#4ade80":"#888"}}>
            <input type="checkbox" checked={vegOnly} onChange={e=>setVegOnly(e.target.checked)} style={{accentColor:"#22c55e"}} /> 🌱 Veg
          </label>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{...S.input,width:"auto",padding:"5px 10px",fontSize:12}}>
            <option value="rating">Rating</option>
            <option value="delivery">Delivery Time</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
        {filters.map(f=><button key={f} style={S.chip(filter===f)} onClick={()=>setFilter(f)}>{f}</button>)}
      </div>
      {loading ? (
        <div style={S.grid}>
          {Array(6).fill(0).map((_,i)=>(
            <div key={i} style={S.card}>
              <div style={{height:120,background:"linear-gradient(90deg,#f0ebe4 25%,#e8e0d6 50%,#f0ebe4 75%)",backgroundSize:"200% 100%"}} />
              <div style={{padding:12}}><div style={{height:14,borderRadius:6,background:"#f8f5f1",marginBottom:8}}/><div style={{height:11,borderRadius:6,background:"#f8f5f1",width:"60%"}}/></div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 0",color:"#555"}}>
          <div style={{fontSize:48,marginBottom:12}}>🔍</div>
          <div style={{fontWeight:700,fontSize:18}}>No results found</div>
          <div style={{fontSize:13,marginTop:6}}>Try a different filter</div>
        </div>
      ) : (
        <div style={S.grid}>{list.map(r=><RestCard key={r.id} r={r} onClick={()=>viewRestaurant(r)}/>)}</div>
      )}
    </div>
  );
}

function RestaurantPage() {
  const { restaurant: r, setPage, toast, menuItems, menuLoading, isAuthenticated, viewRestaurant } = useApp();
  const { add, items } = useCart();
  const [cat, setCat]     = useState("All");
  const [veg, setVeg]     = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  
  // Menu item addition state
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    veg: false,
    description: ''
  });
  const [addingMenuItem, setAddingMenuItem] = useState(false);

  // Load reviews from backend when restaurant changes
  useEffect(() => {
    if (r && r.id) {
      loadReviews();
    }
  }, [r?.id]);

  if (!r) return null;

  const cats = ["All", ...[...new Set(menuItems.map(i=>i.cat))]];
  const filtered = menuItems.filter(i => (!veg || i.veg) && (cat==="All" || i.cat===cat));

  const loadReviews = async () => {
    setReviewsLoading(true);
    try {
      const reviewsData = await reviewAPI.getRestaurantReviews(r.id);
      // Transform backend reviews to frontend format
      const transformedReviews = reviewsData.map(review => ({
        id: review._id,
        user: review.user?.name || "Anonymous",
        rating: review.rating,
        text: review.comment,
        time: new Date(review.createdAt).toLocaleDateString()
      }));
      setReviews(transformedReviews);
    } catch (error) {
      console.error('Failed to load reviews:', error);
      // Fallback to sample reviews
      setReviews([
        {id:1,user:"Priya K.",rating:5,text:"Absolutely loved it! Will definitely order again.",time:"2h ago"},
        {id:2,user:"Rahul M.",rating:4,text:"Good food, delivery was a bit late but quality made up for it.",time:"1d ago"},
      ]);
    }
    setReviewsLoading(false);
  };

  const submitReview = async () => {
    if (!reviewText || !rating) { 
      toast("Add rating and review text","error"); 
      return; 
    }
    
    if (!isAuthenticated) {
      toast("Please login to submit a review","error");
      return;
    }

    try {
      await reviewAPI.addReview({
        restaurant: r.id,
        rating: rating,
        comment: reviewText
      });
      
      setReviewText(""); 
      setRating(0);
      toast("Review submitted! +10 points 🌟","success");
      
      // Reload reviews to show the new one
      await loadReviews();
    } catch (error) {
      console.error('Failed to submit review:', error);
      toast("Failed to submit review","error");
    }
  };

  const handleAddMenuItem = async () => {
    if (!newMenuItem.name || !newMenuItem.price) {
      toast('Please fill in menu item name and price', 'error');
      return;
    }
    
    if (!isAuthenticated) {
      toast('Please login to add menu items', 'error');
      return;
    }
    
    if (!r || !r.id) {
      toast('Restaurant information not available', 'error');
      return;
    }
    
    setAddingMenuItem(true);
    try {
      console.log('Adding menu item to restaurant:', r.id);
      console.log('Menu item data:', {
        name: newMenuItem.name,
        price: parseFloat(newMenuItem.price),
        veg: newMenuItem.veg,
        description: newMenuItem.description
      });
      
      await restaurantAPI.addMenuItem(r.id, {
        name: newMenuItem.name,
        price: parseFloat(newMenuItem.price),
        veg: newMenuItem.veg,
        description: newMenuItem.description
      });
      
      toast('Menu item added successfully!', 'success');
      
      // Reset form
      setNewMenuItem({
        name: '',
        price: '',
        veg: false,
        description: ''
      });
      setShowAddMenu(false);
      
      // Refresh restaurant data to show new menu item
      setTimeout(async () => {
        await viewRestaurant(r);
      }, 500);
    } catch (error) {
      console.error('Add menu item error:', error);
      toast(error.message || 'Failed to add menu item', 'error');
    } finally {
      setAddingMenuItem(false);
    }
  };

  return (
    <div>
      <button style={{...S.btn("ghost"),marginBottom:14,fontSize:12}} onClick={()=>setPage("food")}>← Back</button>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:16,padding:18,marginBottom:18}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <span style={{fontSize:56}}>{r.emoji}</span>
          <div style={{flex:1}}>
            <h2 style={{fontWeight:800,fontSize:20,marginBottom:5}}>{r.name}</h2>
            <div style={{color:"#777",fontSize:13,marginBottom:8}}>{r.description}</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{color:"#9a6c00",fontWeight:700,fontSize:12}}>⭐ {r.rating} ({r.reviews})</span>
              <span style={{fontSize:12,color:"#555"}}>🕐 {r.deliveryTime} min · {r.cuisine} · {r.price}</span>
              {r.tags.map(t=><span key={t} style={S.tag(t==="Veg"?"green":"orange")}>{t}</span>)}
            </div>
          </div>
          <button style={{...S.btn("ghost"),fontSize:12,flexShrink:0}} onClick={()=>setPage("dine")}>📅 Book Table</button>
        </div>
      </div>

      {/* Menu section */}
      {menuLoading ? (
        <div style={{textAlign:"center",padding:"40px 0",color:"#999"}}>
          <div style={{fontSize:32,marginBottom:10}}>⏳</div>
          <div style={{fontSize:13}}>Loading menu...</div>
        </div>
      ) : menuItems.length === 0 ? (
        <div style={{textAlign:"center",padding:"40px 0",color:"#999"}}>
          <div style={{fontSize:36,marginBottom:10}}>🍽️</div>
          <div style={{fontSize:13}}>No items available</div>
        </div>
      ) : (
        <>
          <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4,alignItems:"center"}}>
            {cats.map(c=><button key={c} style={S.chip(cat===c)} onClick={()=>setCat(c)}>{c}</button>)}
            <label style={{display:"flex",alignItems:"center",gap:5,fontSize:12,cursor:"pointer",color:veg?"#4ade80":"#888",marginLeft:4,flexShrink:0}}>
              <input type="checkbox" checked={veg} onChange={e=>setVeg(e.target.checked)} style={{accentColor:"#22c55e"}} /> 🌱 Veg
            </label>
          </div>
          {filtered.filter(i=>i.popular).length>0 && (
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:"#9a6c00",fontWeight:700,marginBottom:8}}>⭐ Popular Items</div>
              {filtered.filter(i=>i.popular).map(item=><MenuItem key={item.id} item={item} add={add} items={items} toast={toast}/>)}
              <div style={{height:1,background:"#ede8e1",margin:"12px 0"}}/>
            </div>
          )}
          {filtered.filter(i=>!i.popular).map(item=><MenuItem key={item.id} item={item} add={add} items={items} toast={toast}/>)}
        </>
      )}

      <div style={{height:1,background:"#ede8e1",margin:"20px 0"}}/>
      
      {/* Add Menu Item Section */}
      {isAuthenticated && (
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={S.section}>🍽️ Menu Management</div>
            <button 
              onClick={() => setShowAddMenu(!showAddMenu)}
              style={{...S.btn("outline"),fontSize:12}}
            >
              {showAddMenu ? "Cancel" : "➕ Add Menu Item"}
            </button>
          </div>
          
          {showAddMenu && (
            <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:16,marginBottom:16}}>
              <div style={{fontWeight:600,fontSize:14,marginBottom:12}}>Add New Menu Item</div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12,marginBottom:12}}>
                <input
                  type="text"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                  style={S.input}
                  placeholder="Item name"
                />
                <input
                  type="number"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
                  style={S.input}
                  placeholder="Price"
                />
              </div>
              
              <div style={{marginBottom:12}}>
                <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer",marginBottom:8}}>
                  <input
                    type="checkbox"
                    checked={newMenuItem.veg}
                    onChange={(e) => setNewMenuItem({...newMenuItem, veg: e.target.checked})}
                    style={{accentColor:"#22c55e"}}
                  />
                  🌱 Vegetarian Item
                </label>
                
                <input
                  type="text"
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                  style={S.input}
                  placeholder="Description (optional)"
                />
              </div>
              
              <button
                onClick={handleAddMenuItem}
                disabled={addingMenuItem}
                style={{
                  ...S.btn("primary"),
                  opacity: addingMenuItem ? 0.7 : 1
                }}
              >
                {addingMenuItem ? 'Adding...' : 'Add Menu Item'}
              </button>
            </div>
          )}
        </div>
      )}
      
      <div style={S.section}>⭐ Reviews</div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>Write a Review</div>
        <div style={{display:"flex",gap:4,marginBottom:10}}>
          {[1,2,3,4,5].map(s=>(
            <span key={s} onClick={()=>setRating(s)} style={{fontSize:22,cursor:"pointer",color:s<=rating?"#fbbf24":"#333"}}>★</span>
          ))}
        </div>
        <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Share your experience..." style={{...S.input,resize:"vertical",minHeight:72,marginBottom:10}}/>
        <button style={S.btn("primary")} onClick={submitReview}>Submit Review</button>
      </div>
      {reviews.map(rv=>(
        <div key={rv.id} style={{padding:"12px 0",borderBottom:"1px solid #f0ebe4"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontWeight:700,fontSize:13}}>{rv.user}</span>
            <span style={{fontSize:11,color:"#555"}}>{rv.time}</span>
          </div>
          <div style={{display:"flex",gap:2,marginBottom:5}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=rv.rating?"#fbbf24":"#333",fontSize:13}}>★</span>)}</div>
          <div style={{fontSize:13,color:"#555"}}>{rv.text}</div>
        </div>
      ))}
    </div>
  );
}

function MenuItem({ item, add, items, toast }) {
  const inCart = items.some(i=>i.id===item.id);
  const [bounce, setBounce] = useState(false);
  const handleAdd = () => { add(item); setBounce(true); toast(`${item.emoji} ${item.name} added`,"success"); setTimeout(()=>setBounce(false),400); };
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #f0ebe4"}}>
      <div style={{width:64,height:64,borderRadius:10,background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{item.emoji}</div>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:item.veg?"#22c55e":"#ef4444",display:"inline-block"}}/>
          <span style={{fontWeight:700,fontSize:13}}>{item.name}</span>
          {item.popular && <span style={S.tag("yellow")}>Popular</span>}
        </div>
        <div style={{fontSize:11,color:"#666",marginBottom:4}}>{item.desc}</div>
        <div style={{fontWeight:700,color:"#e8440a",fontSize:13}}>₹{item.price}</div>
      </div>
      <button onClick={handleAdd}
        style={{width:30,height:30,borderRadius:8,background:inCart?"rgba(255,107,53,.15)":"#e8440a",border:inCart?"1px solid #ff6b35":"none",color:inCart?"#e8440a":"#fff",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transform:bounce?"scale(1.3)":"scale(1)",transition:"all .2s"}}>
        {inCart?"✓":"+"}
      </button>
    </div>
  );
}

function CheckoutPage() {
  const { setPage, addOrder, toast, restaurant, isAuthenticated } = useApp();
  const { items, total, clear } = useCart();
  const [addr, setAddr] = useState({name:"Vikram Nair",line:"#42, 6th Cross, Indiranagar",city:"Bengaluru",pin:"560038"});
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const delivery = 49; const taxes = Math.round(total*.05); const grand = total+delivery+taxes;
  
  const place = async () => {
    if (!isAuthenticated) {
      toast("Please login to place order", "error");
      return;
    }
    
    if (items.length === 0) {
      toast("Your cart is empty", "error");
      return;
    }
    
    setPlacing(true);
    try {
      // Call backend API to place order
      const orderResponse = await orderAPI.placeOrder({
        items: items,
        totalPrice: grand,
        address: `${addr.line}, ${addr.city}, ${addr.pin} - ${addr.name}`,
      });
      
      // Add to local state for immediate UI update
      addOrder({
        items: [...items],
        total: grand,
        restaurant: restaurant?.name || "Foodelo Order",
        payment,
        addr,
        orderId: orderResponse._id
      });
      
      clear();
      setPlacing(false);
      setPage("tracking");
      toast("🎉 Order placed successfully! +50 points", "success");
    } catch (error) {
      console.error('Failed to place order:', error);
      toast(error.message || "Failed to place order", "error");
      setPlacing(false);
    }
  };
  return (
    <div style={{maxWidth:540}}>
      <button style={{...S.btn("ghost"),marginBottom:14,fontSize:12}} onClick={()=>setPage("food")}>← Back</button>
      <div style={{...S.section}}>🛍️ Checkout</div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>📍 Delivery Address</div>
        {[["name","Full Name"],["line","Address"],["city","City"],["pin","Pincode"]].map(([k,l])=>(
          <div key={k} style={{marginBottom:12}}>
            <div style={{fontSize:11,color:"#666",marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
            <input style={S.input} value={addr[k]} onChange={e=>setAddr(p=>({...p,[k]:e.target.value}))} />
          </div>
        ))}
      </div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>💳 Payment</div>
        {[["upi","📱 UPI / GPay / PhonePe"],["card","💳 Credit / Debit Card"],["cod","💵 Cash on Delivery"],["wallet","👛 Foodelo Wallet"]].map(([v,l])=>(
          <label key={v} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #f0ebe4",fontSize:13,cursor:"pointer"}}>
            <input type="radio" name="pay" value={v} checked={payment===v} onChange={()=>setPayment(v)} style={{accentColor:"#e8440a"}} /> {l}
          </label>
        ))}
      </div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>🧾 Summary</div>
        {items.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"4px 0",color:"#555"}}><span>{i.emoji} {i.name} ×{i.qty}</span><span>₹{i.price*i.qty}</span></div>)}
        <div style={{height:1,background:"#ede8e1",margin:"10px 0"}}/>
        {[["Subtotal",`₹${total}`],["Delivery","₹49"],["Taxes",`₹${taxes}`]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0",color:"#777"}}><span>{l}</span><span style={{color:"#1a1a1a"}}>{v}</span></div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:15,padding:"10px 0 0",borderTop:"1px solid #ede8e1",marginTop:6}}>
          <span>Total</span><span style={{color:"#e8440a"}}>₹{grand}</span>
        </div>
      </div>
      <button style={{...S.btn("primary"),width:"100%",justifyContent:"center",padding:"13px",fontSize:15}} onClick={place} disabled={placing}>
        {placing?"⏳ Placing Order...":"🚀 Place Order — ₹"+grand}
      </button>
    </div>
  );
}

function TrackingPage() {
  const { orders, setPage } = useApp();
  const [step, setStep] = useState(0);
  const [eta, setEta] = useState(35);
  const steps = [["📋","Order Placed","Confirmed"],["👨‍🍳","Preparing","Chefs at work"],["🛵","On the Way","Almost there!"],["✅","Delivered","Enjoy! 🎉"]];
  useEffect(()=>{ if(step>=3)return; const t=setTimeout(()=>{setStep(s=>s+1);setEta(e=>Math.max(0,e-11));},[6000,8000,10000][step]); return()=>clearTimeout(t); },[step]);
  const order = orders[0];
  return (
    <div style={{maxWidth:480}}>
      <div style={{textAlign:"center",marginBottom:20,padding:"20px 0"}}>
        <div style={{fontSize:56,marginBottom:10}}>{steps[step][0]}</div>
        <h2 style={{fontWeight:800,fontSize:22}}>{steps[step][1]}</h2>
        {step<3 && <div style={{color:"#777",fontSize:13,marginTop:6}}>ETA: <span style={{fontWeight:800,fontSize:28,color:"#e8440a"}}>{eta}</span> min</div>}
      </div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>Progress</div>
        <div style={{height:8,background:"#f0ebe4",borderRadius:4,overflow:"hidden",marginBottom:20}}>
          <div style={{height:"100%",width:`${(step/3)*100}%`,background:"linear-gradient(90deg,#ff6b35,#ff9560)",borderRadius:4,transition:"width .6s ease"}}/>
        </div>
        {steps.map(([ic,label,sub],i)=>(
          <div key={i} style={{display:"flex",gap:12,padding:"8px 0"}}>
            <div style={{width:12,height:12,borderRadius:"50%",marginTop:3,flexShrink:0,background:i<step?"#22c55e":i===step?"#e8440a":"#ddd6ce",boxShadow:i===step?"0 0 8px #ff6b35":""}}/>
            <div>
              <div style={{fontWeight:600,fontSize:13,color:i<=step?"#1a1a1a":"#aaa"}}>{label}</div>
              <div style={{fontSize:11,color:"#777",marginTop:1}}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
      {step===2 && (
        <div style={{background:"#f8f5f1",border:"1px solid #ede8e1",borderRadius:12,padding:14,display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,107,53,.15)",border:"2px solid #ff6b35",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>👨</div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>Ramesh Kumar</div><div style={{fontSize:12,color:"#777"}}>Delivery Partner · ⭐ 4.9</div></div>
          <button style={{...S.btn("ghost"),fontSize:12}}>📞 Call</button>
        </div>
      )}
      {order && (
        <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:14}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Order #{String(order.id).slice(-6)}</div>
          {order.items?.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#777",padding:"3px 0"}}><span>{i.emoji} {i.name} ×{i.qty}</span><span>₹{i.price*i.qty}</span></div>)}
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:14,borderTop:"1px solid #f0ebe4",marginTop:8,paddingTop:8}}>
            <span>Total</span><span style={{color:"#e8440a"}}>₹{order.total}</span>
          </div>
        </div>
      )}
      <button style={{...S.btn("ghost"),marginTop:14,fontSize:12}} onClick={()=>setPage("orders")}>View Order History</button>
    </div>
  );
}

function OrdersPage() {
  const { orders, setPage, toast } = useApp();
  const { add } = useCart();
  const [expanded, setExpanded] = useState(null);
  if (orders.length === 0) return (
    <div>
      <div style={S.section}>📦 Order History</div>
      <div style={{textAlign:"center",padding:"60px 0",color:"#555"}}>
        <div style={{fontSize:48,marginBottom:12}}>📭</div>
        <div style={{fontWeight:700,fontSize:18,marginBottom:6}}>No orders yet</div>
        <div style={{fontSize:13,marginBottom:16}}>Place your first order!</div>
        <button style={S.btn("primary")} onClick={()=>setPage("food")}>Browse Restaurants</button>
      </div>
    </div>
  );
  return (
    <div>
      <div style={S.section}>📦 Order History <span style={{fontSize:12,fontWeight:400,color:"#555"}}>{orders.length} orders</span></div>
      {orders.map(o=>(
        <div key={o.id} style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:12,padding:14,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{o.restaurant}</div>
              <div style={{fontSize:12,color:"#555"}}>{o.time} · {o.items?.length} items · ₹{o.total}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{...S.tag("green"),fontSize:10}}>{o.status}</span>
              <span style={{color:"#666",cursor:"pointer",fontSize:12}} onClick={()=>setExpanded(expanded===o.id?null:o.id)}>{expanded===o.id?"▲":"▼"}</span>
            </div>
          </div>
          {expanded===o.id && (
            <div style={{borderTop:"1px solid #f0ebe4",paddingTop:12,marginTop:10}}>
              {o.items?.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#777",padding:"3px 0"}}><span>{i.emoji} {i.name} ×{i.qty}</span><span>₹{i.price*i.qty}</span></div>)}
              <div style={{display:"flex",gap:8,marginTop:12}}>
                <button style={{...S.btn("primary"),fontSize:12,padding:"6px 14px"}} onClick={()=>{o.items?.forEach(i=>add(i));toast("Items added to cart 🛒","success");}}>🔄 Reorder</button>
                <button style={{...S.btn("ghost"),fontSize:12,padding:"6px 14px"}} onClick={()=>setPage("tracking")}>📍 Track</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DinePage() {
  const { toast } = useApp();
  const [form, setForm] = useState({restaurant:"",date:"",guests:"2",note:""});
  const [slot, setSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const slots = ["12:00","12:30","1:00","1:30","2:00","7:00","7:30","8:00","8:30","9:00","9:30"];
  const unavail = ["1:30","8:00"];
  const book = () => {
    if (!form.restaurant || !form.date || !slot) { toast("Fill all fields","error"); return; }
    setConfirmed(true); toast("🍽️ Table booked! Confirmation sent","success");
  };
  if (confirmed) return (
    <div style={{maxWidth:420,margin:"0 auto",textAlign:"center",padding:"40px 20px"}}>
      <div style={{fontSize:60,marginBottom:16}}>🎉</div>
      <h2 style={{fontWeight:800,fontSize:22,marginBottom:8}}>Table Confirmed!</h2>
      <div style={{color:"#777",fontSize:13,marginBottom:20}}>{form.restaurant} · {form.date} · {slot} · {form.guests} guests</div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:20}}>
        <div style={{fontSize:12,color:"#666",marginBottom:4}}>BOOKING ID</div>
        <div style={{fontWeight:800,fontSize:22,color:"#e8440a"}}>#{Math.random().toString(36).substr(2,8).toUpperCase()}</div>
      </div>
      <button style={S.btn("primary")} onClick={()=>setConfirmed(false)}>Book Another Table</button>
    </div>
  );
  return (
    <div style={{maxWidth:460}}>
      <div style={S.section}>🍽️ Reserve a Table</div>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,color:"#666",marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Restaurant</div>
        <select style={S.input} value={form.restaurant} onChange={e=>setForm(p=>({...p,restaurant:e.target.value}))}>
          <option value="">Select a restaurant</option>
          {RESTAURANTS.filter(r=>r.open).map(r=><option key={r.id} value={r.name}>{r.emoji} {r.name}</option>)}
        </select>
      </div>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,color:"#666",marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Date</div>
        <input type="date" style={S.input} value={form.date} min={new Date().toISOString().split("T")[0]} onChange={e=>setForm(p=>({...p,date:e.target.value}))} />
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:"#666",marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Guests</div>
        <select style={S.input} value={form.guests} onChange={e=>setForm(p=>({...p,guests:e.target.value}))}>
          {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}
        </select>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:"#666",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Available Slots</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
          {slots.map(s=>(
            <div key={s} onClick={()=>!unavail.includes(s)&&setSlot(s)}
              style={{padding:"9px 4px",borderRadius:8,border:`1px solid ${slot===s?"#22c55e":unavail.includes(s)?"#f0ebe4":"#ddd6ce"}`,background:slot===s?"#dcf5e7":"#f8f5f1",color:slot===s?"#1a7a40":unavail.includes(s)?"#bbb":"#555",cursor:unavail.includes(s)?"not-allowed":"pointer",textAlign:"center",fontSize:12,fontWeight:600,textDecoration:unavail.includes(s)?"line-through":"none"}}>
              {s}
            </div>
          ))}
        </div>
      </div>
      <button style={{...S.btn("primary"),width:"100%",justifyContent:"center",padding:"12px"}} onClick={book}>Confirm Reservation</button>
    </div>
  );
}

function EventsPage() {
  const { toast } = useApp();
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [tix, setTix] = useState(1);
  const cats = ["All","Music","Food","Comedy","Workshop","Networking"];
  const list = EVENTS.filter(e=>filter==="All"||e.cat===filter);
  return (
    <div>
      <div style={S.section}>🎟️ Upcoming Events <span style={{fontSize:12,fontWeight:400,color:"#555"}}>in Bengaluru</span></div>
      <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} style={S.chip(filter===c)} onClick={()=>setFilter(c)}>{c}</button>)}
      </div>
      <div style={S.grid}>
        {list.map(e=>(
          <div key={e.id} style={S.card} onClick={()=>{setModal(e);setTix(1);}}>
            <div style={{height:110,background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,position:"relative"}}>
              {e.emoji}
              <span style={{position:"absolute",top:8,right:8,background:"rgba(20,15,10,.82)",borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700,color:"#e8440a"}}>{e.date}</span>
            </div>
            <div style={{padding:12}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{e.name}</div>
              <div style={{fontSize:11,color:"#666",marginBottom:5}}>📍 {e.venue} · {e.time}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:"#e8440a",fontWeight:700,fontSize:13}}>{e.price===0?"🆓 Free":`₹${e.price}`}</span>
                <span style={S.tag("blue")}>{e.cat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div style={S.modal} onClick={ev=>{if(ev.target===ev.currentTarget)setModal(null);}}>
          <div style={S.modalBox}>
            <div style={{padding:18,borderBottom:"1px solid #ede8e1",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:700,fontSize:16}}>{modal.emoji} {modal.name}</span>
              <button onClick={()=>setModal(null)} style={{...S.btn("ghost"),padding:"4px 10px"}}>✕</button>
            </div>
            <div style={{padding:18}}>
              <div style={{color:"#777",fontSize:13,marginBottom:16}}>📍 {modal.venue} · 🕐 {modal.date} at {modal.time}</div>
              <div style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:"1px solid #f0ebe4",marginBottom:14}}>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>Tickets</div><div style={{fontSize:12,color:"#777"}}>₹{modal.price}/person</div></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>setTix(t=>Math.max(1,t-1))} style={{width:28,height:28,borderRadius:7,border:"1px solid #ddd6ce",background:"#f8f5f1",color:"#1a1a1a",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                  <span style={{fontWeight:700,minWidth:22,textAlign:"center"}}>{tix}</span>
                  <button onClick={()=>setTix(t=>Math.min(10,t+1))} style={{width:28,height:28,borderRadius:7,border:"1px solid #ddd6ce",background:"#f8f5f1",color:"#1a1a1a",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:15,marginBottom:16}}>
                <span>Total</span><span style={{color:"#e8440a"}}>{modal.price===0?"Free":`₹${modal.price*tix}`}</span>
              </div>
              <button style={{...S.btn("primary"),width:"100%",justifyContent:"center",padding:"12px"}} onClick={()=>{toast(`🎟️ ${tix} ticket${tix>1?"s":""} booked for ${modal.name}!`,"success");setModal(null);}}>
                Book {tix} Ticket{tix>1?"s":""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SmartPage() {
  const { points } = useApp();
  const level = Math.floor(points/200)+1;
  const prog  = (points%200)/200*100;
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = async () => {
    if (!query.trim()) return;
    setLoading(true); setReply("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"You are Foodelo's friendly food & dining AI for Bangalore. Give short, enthusiastic recommendations (3-4 sentences). Use emojis.",
          messages:[{role:"user",content:query}] })
      });
      const d = await res.json();
      setReply(d.content?.[0]?.text || "Sorry, try again!");
    } catch { setReply("Hmm, connection hiccup! Based on your vibe, try Biryani Brothers or Sushi Sakura tonight 🍽️"); }
    setLoading(false);
  };
  return (
    <div>
      <div style={S.section}>🧠 Smart Features</div>
      <div style={{background:"linear-gradient(135deg,#fff4ef,#f8f4ff)",border:"1px solid #f5d4c0",borderRadius:14,padding:16,marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div>
            <div style={{fontSize:11,color:"#e8440a",fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Your Points</div>
            <div style={{fontWeight:800,fontSize:28,background:"linear-gradient(135deg,#fbbf24,#ff6b35)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{points} pts</div>
          </div>
          <span style={S.tag("purple")}>Level {level}</span>
        </div>
        <div style={{fontSize:12,color:"#666",marginBottom:6}}>{200-(points%200)} pts to Level {level+1}</div>
        <div style={{height:6,background:"#ffffff",borderRadius:3,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#ff6b35,#ff9560)",borderRadius:3}}/>
        </div>
      </div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:18}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>🤖 AI Food Assistant</div>
        <div style={{fontSize:12,color:"#666",marginBottom:12}}>Powered by Claude — ask anything!</div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <input style={{...S.input,flex:1}} value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="What should I eat tonight?..." />
          <button style={{...S.btn("primary"),padding:"9px 14px"}} onClick={ask} disabled={loading}>{loading?"⏳":"🚀"}</button>
        </div>
        {loading && <div style={{color:"#777",fontSize:13,padding:"8px 0"}}>🤔 Thinking...</div>}
        {reply && <div style={{background:"#faf8f5",border:"1px solid #ede8e1",borderRadius:10,padding:14,fontSize:13,lineHeight:1.6}}>{reply}</div>}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
          {["Best for a date night 🌹","Rainy day comfort food ☔","Spicy cravings 🌶️","Quick late night bite 🌙"].map(q=>(
            <span key={q} style={{...S.tag("blue"),cursor:"pointer",fontSize:11}} onClick={()=>setQuery(q)}>{q}</span>
          ))}
        </div>
      </div>
      <div style={{marginBottom:18}}>
        <div style={{...S.section,fontSize:15}}>🏅 Your Badges</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:10}}>
          {BADGES.map(b=>(
            <div key={b.id} style={{background:b.earned?"#fff3d4":"#f8f5f1",border:`1px solid ${b.earned?"#d4a000":"#ede8e1"}`,borderRadius:10,padding:"12px 8px",textAlign:"center",fontSize:11,color:b.earned?"#9a6c00":"#888"}}>
              <div style={{fontSize:24,marginBottom:4}}>{b.emoji}</div>
              <div>{b.label}</div>
              {!b.earned&&<div style={{fontSize:10,color:"#333",marginTop:2}}>Locked</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16,marginBottom:18}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>📊 Food Personality</div>
        {[["Spice Level","🌶️",75],["Adventure Score","🌍",42],["Healthy Choices","🥗",58],["Night Owl Index","🦉",83]].map(([l,e,v])=>(
          <div key={l} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span>{e} {l}</span><span style={{color:"#e8440a",fontWeight:700}}>{v}%</span></div>
            <div style={{height:5,background:"#f0ebe4",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${v}%`,background:v>70?"linear-gradient(90deg,#ff6b35,#ef4444)":v>50?"linear-gradient(90deg,#fbbf24,#ff6b35)":"linear-gradient(90deg,#3b82f6,#a855f7)",borderRadius:3}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"#ffffff",border:"1px solid #ede8e1",borderRadius:14,padding:16}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>💡 Smart Insights</div>
        {[
          {icon:"🌙",title:"Night Owl Alert",text:"You order 3x more after 9 PM. Favourites: Biryani & Pizza"},
          {icon:"🔥",title:"Spice Lover",text:"80% of your orders are spicy. Try our new Thai Orchid!"},
          {icon:"💰",title:"Smart Spender",text:"You save ₹240/month using our combo deals"},
        ].map((i,idx)=>(
          <div key={idx} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:idx<2?"1px solid #f0ebe4":"none"}}>
            <span style={{fontSize:20,flexShrink:0}}>{i.icon}</span>
            <div><div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{i.title}</div><div style={{fontSize:12,color:"#777"}}>{i.text}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Authentication Page ─────────────────────────────────────────────────────
function AuthPage() {
  const { login, register, authLoading, toast, setPage } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      setPage('home');
    } catch (error) {
      // Error is already handled in login/register functions
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{maxWidth:400,margin:'50px auto',padding:20}}>
      <div style={{background:'#ffffff',border:'1px solid #ede8e1',borderRadius:18,padding:30,boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
        <h2 style={{fontWeight:800,fontSize:24,marginBottom:20,textAlign:'center',color:'#1a1a1a'}}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                style={S.input}
                placeholder="Your name"
              />
            </div>
          )}
          
          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={S.input}
              placeholder="your@email.com"
            />
          </div>
          
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={S.input}
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={authLoading}
            style={{
              ...S.btn('primary'),
              width: '100%',
              padding: '12px',
              fontSize: 14,
              fontWeight: 700,
              opacity: authLoading ? 0.7 : 1
            }}
          >
            {authLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        
        <div style={{textAlign:'center',marginTop:20}}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{background:'transparent',border:'none',color:'#e8440a',cursor:'pointer',fontSize:13,fontWeight:600}}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
        
        <div style={{textAlign:'center',marginTop:16}}>
          <button
            onClick={() => setPage('home')}
            style={{background:'transparent',border:'none',color:'#999',cursor:'pointer',fontSize:12}}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Restaurant Page ─────────────────────────────────────────────────────
function AddRestaurantPage() {
  const { isAuthenticated, toast, setPage, loadRestaurants } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    latitude: '',
    longitude: '',
    menu: []
  });
  const [menuItem, setMenuItem] = useState({
    name: '',
    price: '',
    veg: false,
    description: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div style={{textAlign:'center',padding:'60px 0'}}>
        <div style={{fontSize:48,marginBottom:16}}>🔒</div>
        <h3 style={{fontWeight:700,fontSize:18,marginBottom:8}}>Login Required</h3>
        <p style={{color:'#666',marginBottom:20}}>Please login to add a restaurant</p>
        <button onClick={() => setPage('auth')} style={S.btn('primary')}>
          Login / Register
        </button>
      </div>
    );
  }

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const restaurantData = {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      };
      
      await restaurantAPI.create(restaurantData);
      toast('Restaurant added successfully!', 'success');
      
      // Reset form
      setFormData({
        name: '',
        cuisine: '',
        latitude: '',
        longitude: '',
        menu: []
      });
      
      // Reload restaurants to show the new one
      await loadRestaurants();
      setPage('food');
    } catch (error) {
      toast(error.message || 'Failed to add restaurant', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = () => {
    if (!menuItem.name || !menuItem.price) {
      toast('Please fill in menu item details', 'error');
      return;
    }
    
    setFormData({
      ...formData,
      menu: [...formData.menu, { ...menuItem, price: parseFloat(menuItem.price) }]
    });
    
    setMenuItem({
      name: '',
      price: '',
      veg: false,
      description: ''
    });
    
    toast('Menu item added', 'success');
  };

  const removeMenuItem = (index) => {
    setFormData({
      ...formData,
      menu: formData.menu.filter((_, i) => i !== index)
    });
  };

  return (
    <div style={{maxWidth:600,margin:'30px auto',padding:20}}>
      <div style={{background:'#ffffff',border:'1px solid #ede8e1',borderRadius:18,padding:30,boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
        <h2 style={{fontWeight:800,fontSize:24,marginBottom:20,color:'#1a1a1a'}}>Add New Restaurant</h2>
        
        <form onSubmit={handleRestaurantSubmit}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Restaurant Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                style={S.input}
                placeholder="Restaurant name"
              />
            </div>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Cuisine Type</label>
              <input
                type="text"
                value={formData.cuisine}
                onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                required
                style={S.input}
                placeholder="e.g., Italian, Chinese"
              />
            </div>
          </div>
          
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                required
                style={S.input}
                placeholder="e.g., 12.9716"
              />
            </div>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,marginBottom:6,color:'#1a1a1a'}}>Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                required
                style={S.input}
                placeholder="e.g., 77.5946"
              />
            </div>
          </div>
          
          {/* Menu Items Section */}
          <div style={{marginBottom:20}}>
            <h3 style={{fontWeight:700,fontSize:16,marginBottom:12,color:'#1a1a1a'}}>Menu Items</h3>
            
            <div style={{background:'#f8f5f1',border:'1px solid #ede8e1',borderRadius:12,padding:16,marginBottom:16}}>
              <div style={{display:'grid',gridTemplateColumns:'2fr 1fr auto',gap:8,marginBottom:12}}>
                <input
                  type="text"
                  value={menuItem.name}
                  onChange={(e) => setMenuItem({...menuItem, name: e.target.value})}
                  style={S.input}
                  placeholder="Item name"
                />
                <input
                  type="number"
                  value={menuItem.price}
                  onChange={(e) => setMenuItem({...menuItem, price: e.target.value})}
                  style={S.input}
                  placeholder="Price"
                />
                <button type="button" onClick={addMenuItem} style={S.btn('primary')}>
                  Add
                </button>
              </div>
              
              <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
                <label style={{display:'flex',alignItems:'center',gap:6,fontSize:12,cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    checked={menuItem.veg}
                    onChange={(e) => setMenuItem({...menuItem, veg: e.target.checked})}
                    style={{accentColor:'#22c55e'}}
                  />
                  🌱 Vegetarian
                </label>
              </div>
              
              <input
                type="text"
                value={menuItem.description}
                onChange={(e) => setMenuItem({...menuItem, description: e.target.value})}
                style={S.input}
                placeholder="Description (optional)"
              />
            </div>
            
            {/* Current Menu Items */}
            {formData.menu.length > 0 && (
              <div>
                <h4 style={{fontWeight:600,fontSize:14,marginBottom:8,color:'#1a1a1a'}}>Current Menu:</h4>
                {formData.menu.map((item, index) => (
                  <div key={index} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:'#f8f5f1',borderRadius:8,marginBottom:4}}>
                    <div>
                      <span style={{fontWeight:600,fontSize:13}}>{item.name}</span>
                      <span style={{color:'#e8440a',fontSize:12,marginLeft:8}}>₹{item.price}</span>
                      {item.veg && <span style={{...S.tag('green'),marginLeft:8}}>🌱 Veg</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMenuItem(index)}
                      style={{background:'#ff4444',color:'#white',border:'none',borderRadius:4,padding:'4px 8px',fontSize:11,cursor:'pointer'}}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{display:'flex',gap:12}}>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...S.btn('primary'),
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Adding...' : 'Add Restaurant'}
            </button>
            <button
              type="button"
              onClick={() => setPage('food')}
              style={S.btn('ghost')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CartProvider>
        <Main />
      </CartProvider>
    </AppProvider>
  );
}

function Main() {
  const { page } = useApp();
  const { count, total, setOpen } = useCart();
  const pages = { 
      home:<HomePage/>, 
      food:<FoodPage/>, 
      restaurant:<RestaurantPage/>, 
      checkout:<CheckoutPage/>, 
      tracking:<TrackingPage/>, 
      orders:<OrdersPage/>, 
      dine:<DinePage/>, 
      events:<EventsPage/>, 
      smart:<SmartPage/>,
      auth:<AuthPage/>,
      addRestaurant:<AddRestaurantPage/>
    };
  return (
    <div style={S.app}>
      <Navbar />
      <div style={S.main}>
        <div key={page} style={{animation:"fadeIn .25s ease"}}>
          {pages[page] || <HomePage/>}
        </div>
      </div>
      <CartDrawer />
      {count > 0 && page !== "checkout" && (
        <div onClick={() => setOpen(true)}
          style={{position:"fixed",bottom:20,right:20,background:"#e8440a",color:"#fff",borderRadius:14,padding:"11px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontWeight:700,fontSize:13,boxShadow:"0 8px 24px rgba(232,68,10,.3)",zIndex:99,animation:"bounceIn .4s"}}>
          <span style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"1px 8px"}}>{count}</span>
          View Cart · ₹{total}
        </div>
      )}
      <Toasts />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounceIn{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px}
        select option{background:#ffffff}
      `}</style>
    </div>
  );
}
