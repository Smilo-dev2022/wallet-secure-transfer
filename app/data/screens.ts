const screens = [
  { 
    name: "index", 
    options: { 
      headerShown: false,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackVisible: false,
      zIndex: 5,
      headerTitle: "Index"
    }, 
    title: "index" 
  },
  { 
    name: "pages/SplashPage", 
    options: { 
      headerShown: false,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackVisible: false,
      zIndex: 5,
      headerTitle: ''
    },
    title: "SplashPage" 
  },
  { 
    name: "auth/Login", 
    options: { 
      headerShown: false,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackVisible: false,
      zIndex: 5,
      headerTitle: ''
    }, 
    title: "Login" 
  },
  { 
    name: "auth/Signup", 
    options: { 
      headerShown: false,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackvisible: false,
      zIndex: 5,
      headerTitle: ''
    }, 
    title: "Signup" 
  },
  { 
    name: "pages/Dashboard", 
    options: { 
      headerShown: true,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackVisible: false,
      zIndex: 5,
      headerTitle: ''
    }, 
    title: "Dashboard" 
  },
  { 
    name: "pages/About", 
    options: { 
      headerShown: true,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackVisible: false,
      zIndex: 5
    }, 
    title: "About" 
  },
  { 
    name: "pages/Settings", 
    options: { 
      headerShown: true,
      headerTintColor: '#fff', 
      headerStyle: { backgroundColor: "#344d92ff", zIndex: 5 },
      headerBackVisible: false,
      zIndex: 5,
      headerTitle: 'Settings'
    }, 
    title: "Settings" 
  },
];

export default screens;
