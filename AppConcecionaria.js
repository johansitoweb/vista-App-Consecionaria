import React, { useState, useMemo } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform, // Para ajustes específicos de plataforma (iOS/Android)
  Dimensions, // Para obtener las dimensiones de la pantalla y hacer el diseño responsivo
  Linking // Para abrir enlaces externos como llamadas o mapas
} from 'react-native';

// Obtener el ancho de la pantalla para imágenes responsivas
const screenWidth = Dimensions.get('window').width;

// Datos de ejemplo de vehículos con especificaciones técnicas
const initialCars = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 25000,
    description: 'Un sedán confiable y eficiente con tecnología moderna y bajo consumo de combustible. Ideal para la ciudad y viajes largos.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: true,
    specs: {
      engine: '1.8L 4-Cilindros',
      horsepower: '139 HP',
      torque: '126 lb-pie',
      transmission: 'CVT Automática',
      fuelType: 'Gasolina',
      consumption: '15 km/L (combinado)',
      dimensions: '4.63m L x 1.78m A x 1.43m H',
      capacity: '5 pasajeros',
      features: ['Pantalla táctil de 8"', 'Apple CarPlay/Android Auto', 'Sistema de seguridad Toyota Safety Sense']
    }
  },
  {
    id: '2', 
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 28000,
    description: 'Diseño deportivo y excelente rendimiento, ideal para la ciudad y viajes largos. Con un interior espacioso y tecnología avanzada.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: true,
    specs: {
      engine: '2.0L 4-Cilindros',
      horsepower: '158 HP',
      torque: '138 lb-pie',
      transmission: 'CVT Automática',
      fuelType: 'Gasolina',
      consumption: '14 km/L (combinado)',
      dimensions: '4.67m L x 1.80m A x 1.41m H',
      capacity: '5 pasajeros',
      features: ['Honda Sensing Suite', 'Asientos de cuero', 'Sistema de sonido premium']
    }
  },
  {
    id: '3',
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 45000,
    description: 'Un icónico muscle car con un potente motor V8 y un estilo inconfundible. Experimenta la emoción de la carretera.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: false,
    specs: {
      engine: '5.0L V8',
      horsepower: '460 HP',
      torque: '420 lb-pie',
      transmission: 'Manual de 6 velocidades',
      fuelType: 'Gasolina',
      consumption: '8 km/L (combinado)',
      dimensions: '4.78m L x 1.91m A x 1.39m H',
      capacity: '4 pasajeros',
      features: ['Modos de conducción seleccionables', 'Escape activo', 'Frenos Brembo']
    }
  },
  {
    id: '4',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 55000,
    description: 'Vehículo eléctrico de alto rendimiento con tecnología de punta y gran autonomía. Cero emisiones y aceleración instantánea.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: true,
    specs: {
      engine: 'Eléctrico',
      horsepower: '283 HP (estimado)',
      torque: '307 lb-pie (estimado)',
      transmission: 'Automática (velocidad única)',
      fuelType: 'Eléctrico',
      consumption: '423 km de autonomía',
      dimensions: '4.69m L x 1.85m A x 1.44m H',
      capacity: '5 pasajeros',
      features: ['Piloto automático', 'Pantalla táctil de 15"', 'Actualizaciones de software inalámbricas']
    }
  },
  {
    id: '5',
    make: 'BMW',
    model: 'X5',
    year: 2023,
    price: 60000,
    description: 'SUV de lujo con un interior espacioso y un manejo dinámico, perfecto para la familia. Combina elegancia y potencia.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: false,
    specs: {
      engine: '3.0L TwinPower Turbo I6',
      horsepower: '335 HP',
      torque: '331 lb-pie',
      transmission: 'Automática de 8 velocidades',
      fuelType: 'Gasolina',
      consumption: '10 km/L (combinado)',
      dimensions: '4.92m L x 2.00m A x 1.74m H',
      capacity: '5-7 pasajeros',
      features: ['Techo panorámico', 'Asientos calefactables', 'Sistema de navegación avanzado']
    }
  },
  {
    id: '6',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: 48000,
    description: 'Elegante sedán de lujo con un confort excepcional y características de seguridad avanzadas. Un símbolo de sofisticación.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: true,
    specs: {
      engine: '2.0L Turbo I4',
      horsepower: '255 HP',
      torque: '295 lb-pie',
      transmission: 'Automática de 9 velocidades',
      fuelType: 'Gasolina',
      consumption: '12 km/L (combinado)',
      dimensions: '4.75m L x 1.82m A x 1.43m H',
      capacity: '5 pasajeros',
      features: ['MBUX Infotainment System', 'Faros LED adaptativos', 'Asistencia activa de frenado']
    }
  },
  {
    id: '7',
    make: 'Audi',
    model: 'Q7',
    year: 2023,
    price: 65000,
    description: 'Un SUV premium con un diseño sofisticado, tecnología innovadora y gran versatilidad. Ideal para cualquier aventura.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: false,
    specs: {
      engine: '3.0L Turbo V6',
      horsepower: '335 HP',
      torque: '369 lb-pie',
      transmission: 'Automática de 8 velocidades',
      fuelType: 'Gasolina',
      consumption: '9 km/L (combinado)',
      dimensions: '5.06m L x 1.97m A x 1.74m H',
      capacity: '7 pasajeros',
      features: ['Virtual Cockpit', 'Sistema de sonido Bang & Olufsen', 'Suspensión neumática adaptable']
    }
  },
  {
    id: '8',
    make: 'Nissan',
    model: 'Rogue',
    year: 2022,
    price: 27000,
    description: 'Un crossover compacto y práctico con amplio espacio de carga y buena eficiencia de combustible. Perfecto para el día a día.',
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/VP2LPWER7FM6RDVKMLY6YWKGTU.jpg',
    isNew: true,
    specs: {
      engine: '2.5L 4-Cilindros',
      horsepower: '181 HP',
      torque: '181 lb-pie',
      transmission: 'CVT Automática',
      fuelType: 'Gasolina',
      consumption: '13 km/L (combinado)',
      dimensions: '4.65m L x 1.87m A x 1.69m H',
      capacity: '5 pasajeros',
      features: ['ProPILOT Assist', 'Asientos Zero Gravity', 'Cámara de visión 360°']
    }
  },
];


export default function App() {
  // Estados de la aplicación
  const [cars, setCars] = useState(initialCars);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedCar, setSelectedCar] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [showNewCarsOnly, setShowNewCarsOnly] = useState(false);
  // Nuevo estado para la navegación entre pantallas
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'details', 'favorites', 'contact', 'loanCalculator'

  // Vehículos filtrados basados en la consulta de búsqueda y el filtro de coches nuevos
  const filteredCars = useMemo(() => {
    let currentCars = cars;

    // Aplicar filtro de coches nuevos si está activado
    if (showNewCarsOnly) {
      currentCars = currentCars.filter(car => car.isNew);
    }

    // Aplicar filtro de búsqueda
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentCars = currentCars.filter(car =>
        car.make.toLowerCase().includes(lowerCaseQuery) ||
        car.model.toLowerCase().includes(lowerCaseQuery) ||
        car.price.toString().includes(lowerCaseQuery) ||
        car.year.toString().includes(lowerCaseQuery) ||
        (car.description && car.description.toLowerCase().includes(lowerCaseQuery)) ||
        (car.specs && Object.values(car.specs).some(spec => String(spec).toLowerCase().includes(lowerCaseQuery)))
      );
    }
    return currentCars;
  }, [cars, searchQuery, showNewCarsOnly]);

  // Alternar el estado de favorito para un vehículo
  const toggleFavorite = (carId) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Función para alternar la vista de solo coches nuevos
  const toggleShowNewCarsOnly = () => {
    setShowNewCarsOnly(prev => !prev);
  };

  // Componente para la Tarjeta de Vehículo
  const CarCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.carCard, darkMode && styles.carCardDark]}
      onPress={() => {
        setSelectedCar(item);
        setCurrentScreen('details'); // Navegar a la vista de detalles
      }}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.carImage}
        onError={(e) => console.log('Error al cargar imagen:', e.nativeEvent.error)}
      />
      <View style={styles.carInfo}>
        <Text style={[styles.carTitle, darkMode && styles.textDark]}>{item.make} {item.model}</Text>
        <Text style={[styles.carYear, darkMode && styles.textSecondaryDark]}>Año: {item.year}</Text>
        <Text style={[styles.carPrice, darkMode && styles.priceDark]}>${item.price.toLocaleString()}</Text>
        {item.isNew && (
          <View style={[styles.newCarBadge, darkMode && styles.newCarBadgeDark]}>
            <Text style={[styles.newCarBadgeText, darkMode && styles.newCarBadgeTextDark]}>¡Nuevo!</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.favoriteButton, darkMode && styles.favoriteButtonDark]}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={[styles.favoriteButtonText, darkMode && styles.favoriteButtonTextDark]}>
            {favorites.has(item.id) ? '❤️ Favorito' : '🤍 Añadir a Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Componente para la Vista de Detalles del Vehículo
  const CarDetailScreen = ({ car, onBack }) => (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.detailScrollViewContent}>
        <Image
          source={{ uri: car.imageUrl }}
          style={styles.detailImage}
          onError={(e) => console.log('Error al cargar imagen de detalle:', e.nativeEvent.error)}
        />
        <View style={[styles.detailContent, darkMode && styles.detailContentDark]}>
          <Text style={[styles.detailTitle, darkMode && styles.textDark]}>{car.make} {car.model}</Text>
          <Text style={[styles.detailYear, darkMode && styles.textSecondaryDark]}>Año: {car.year}</Text>
          <Text style={[styles.detailPrice, darkMode && styles.priceDark]}>Precio: ${car.price.toLocaleString()}</Text>
          {car.isNew && (
            <View style={[styles.newCarBadgeDetail, darkMode && styles.newCarBadgeDetailDark]}>
              <Text style={[styles.newCarBadgeTextDetail, darkMode && styles.newCarBadgeTextDetailDark]}>¡Vehículo Nuevo!</Text>
            </View>
          )}
          <Text style={[styles.detailDescription, darkMode && styles.textSecondaryDark]}>{car.description}</Text>

          {/* Especificaciones Técnicas */}
          {car.specs && (
            <View style={styles.specsContainer}>
              <Text style={[styles.specsTitle, darkMode && styles.textDark]}>Especificaciones Técnicas:</Text>
              {Object.entries(car.specs).map(([key, value]) => (
                <View key={key} style={styles.specItem}>
                  <Text style={[styles.specLabel, darkMode && styles.textSecondaryDark]}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</Text>
                  {Array.isArray(value) ? (
                    <View>
                      {value.map((feature, index) => (
                        <Text key={index} style={[styles.specValue, darkMode && styles.textDark]}>- {feature}</Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={[styles.specValue, darkMode && styles.textDark]}>{value}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.favoriteButtonLarge,
              favorites.has(car.id) ? styles.favoriteButtonActive : styles.favoriteButtonInactive,
              darkMode && (favorites.has(car.id) ? styles.favoriteButtonActiveDark : styles.favoriteButtonInactiveDark)
            ]}
            onPress={() => toggleFavorite(car.id)}
          >
            <Text style={[
              styles.favoriteButtonTextLarge,
              favorites.has(car.id) ? { color: '#4c51bf' } : { color: '#ffffff' },
              darkMode && (favorites.has(car.id) ? { color: '#818cf8' } : { color: '#ffffff' })
            ]}>
              {favorites.has(car.id) ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backButton, darkMode && styles.backButtonDark]}
            onPress={onBack}
          >
            <Text style={[styles.backButtonText, darkMode && styles.backButtonTextDark]}>Volver a la Lista</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Componente para la Sección de Favoritos
  const FavoritesScreen = ({ favorites, cars, onSelectCar, onBack }) => {
    const favoriteCarsList = useMemo(() => {
      return cars.filter(car => favorites.has(car.id));
    }, [favorites, cars]);

    return (
      <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButtonHeader}>
            <Text style={[styles.backButtonTextHeader, darkMode && styles.textDark]}>{'< Volver'}</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.headerTitleDark, { flex: 1 }]}>Mis Favoritos</Text>
        </View>
        {favoriteCarsList.length === 0 ? (
          <Text style={[styles.noResultsText, darkMode && styles.textSecondaryDark]}>No tienes vehículos favoritos aún.</Text>
        ) : (
          <FlatList
            data={favoriteCarsList}
            renderItem={({ item }) => <CarCard item={item} />} // Reutiliza CarCard
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    );
  };

  // Componente para el Simulador de Financiamiento
  const LoanCalculatorScreen = ({ onBack }) => {
    const [carPrice, setCarPrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState(''); // in months
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = () => {
      const P = parseFloat(carPrice) - parseFloat(downPayment);
      const I = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
      const N = parseFloat(loanTerm); // Total number of payments

      if (P <= 0 || I <= 0 || N <= 0 || isNaN(P) || isNaN(I) || isNaN(N)) {
        setMonthlyPayment('Datos inválidos');
        return;
      }

      // PMT formula: P * [ I * (1 + I)^N ] / [ (1 + I)^N – 1]
      const payment = P * (I * Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1);
      setMonthlyPayment(payment.toFixed(2));
    };

    return (
      <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButtonHeader}>
            <Text style={[styles.backButtonTextHeader, darkMode && styles.textDark]}>{'< Volver'}</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.headerTitleDark, { flex: 1 }]}>Simulador de Financiamiento</Text>
        </View>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Precio del Vehículo ($):</Text>
          <TextInput
            style={[styles.formInput, darkMode && styles.searchBarDark]}
            keyboardType="numeric"
            value={carPrice}
            onChangeText={setCarPrice}
            placeholder="Ej. 25000"
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          />

          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Enganche ($):</Text>
          <TextInput
            style={[styles.formInput, darkMode && styles.searchBarDark]}
            keyboardType="numeric"
            value={downPayment}
            onChangeText={setDownPayment}
            placeholder="Ej. 5000"
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          />

          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Tasa de Interés Anual (%):</Text>
          <TextInput
            style={[styles.formInput, darkMode && styles.searchBarDark]}
            keyboardType="numeric"
            value={interestRate}
            onChangeText={setInterestRate}
            placeholder="Ej. 5.5 (para 5.5%)"
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          />

          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Plazo del Préstamo (Meses):</Text>
          <TextInput
            style={[styles.formInput, darkMode && styles.searchBarDark]}
            keyboardType="numeric"
            value={loanTerm}
            onChangeText={setLoanTerm}
            placeholder="Ej. 60 (para 5 años)"
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          />

          <TouchableOpacity style={styles.calculateButton} onPress={calculatePayment}>
            <Text style={styles.calculateButtonText}>Calcular Pago Mensual</Text>
          </TouchableOpacity>

          {monthlyPayment !== null && (
            <View style={styles.resultContainer}>
              <Text style={[styles.resultText, darkMode && styles.textDark]}>Pago Mensual Estimado:</Text>
              <Text style={[styles.monthlyPaymentText, darkMode && styles.priceDark]}>${monthlyPayment}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Componente para el Formulario de Contacto
  const ContactScreen = ({ onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      // Aquí normalmente enviarías los datos a un backend
      console.log('Formulario enviado:', { name, email, message });
      setSubmitted(true);
      // Resetear formulario después de un breve tiempo
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(false);
      }, 3000);
    };

    return (
      <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButtonHeader}>
            <Text style={[styles.backButtonTextHeader, darkMode && styles.textDark]}>{'< Volver'}</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.headerTitleDark, { flex: 1 }]}>Contáctanos</Text>
        </View>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Envíanos un Mensaje</Text>
          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Tu Nombre:</Text>
          <TextInput
            style={[styles.formInput, darkMode && styles.searchBarDark]}
            value={name}
            onChangeText={setName}
            placeholder="Nombre completo"
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          />

          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Tu Email:</Text>
          <TextInput
            style={[styles.formInput, darkMode && styles.searchBarDark]}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          />

          <Text style={[styles.formLabel, darkMode && styles.textDark]}>Tu Mensaje:</Text>
          <TextInput
            style={[styles.formTextArea, darkMode && styles.searchBarDark]}
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe tu mensaje aquí..."
            placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar Mensaje</Text>
          </TouchableOpacity>

          {submitted && (
            <Text style={[styles.submissionMessage, darkMode && styles.textDark]}>¡Mensaje enviado con éxito!</Text>
          )}

          <Text style={[styles.sectionTitle, darkMode && styles.textDark, { marginTop: 30 }]}>Información de Contacto</Text>
          <View style={styles.contactInfoRow}>
            <Text style={[styles.contactLabel, darkMode && styles.textSecondaryDark]}>Teléfono:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+18095551234')}>
              <Text style={[styles.contactValue, darkMode && styles.priceDark]}>+1 (809) 555-1234</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoRow}>
            <Text style={[styles.contactLabel, darkMode && styles.textSecondaryDark]}>Dirección:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://maps.app.goo.gl/YourDealershipLocation')}>
              <Text style={[styles.contactValue, darkMode && styles.priceDark]}>Av. Principal #123, Santo Domingo, RD</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoRow}>
            <Text style={[styles.contactLabel, darkMode && styles.textSecondaryDark]}>Horario:</Text>
            <Text style={[styles.contactValue, darkMode && styles.textDark]}>Lun-Vie: 9 AM - 6 PM</Text>
          </View>
          <View style={styles.contactInfoRow}>
            <Text style={[styles.contactLabel, darkMode && styles.textSecondaryDark]}>Email:</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:info@concesionaria.com')}>
              <Text style={[styles.contactValue, darkMode && styles.priceDark]}>info@concesionaria.com</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Lógica de renderizado de pantallas
  if (currentScreen === 'details' && selectedCar) {
    return <CarDetailScreen car={selectedCar} onBack={() => setCurrentScreen('home')} />;
  } else if (currentScreen === 'favorites') {
    return <FavoritesScreen favorites={favorites} cars={cars} onSelectCar={(car) => { setSelectedCar(car); setCurrentScreen('details'); }} onBack={() => setCurrentScreen('home')} />;
  } else if (currentScreen === 'contact') {
    return <ContactScreen onBack={() => setCurrentScreen('home')} />;
  } else if (currentScreen === 'loanCalculator') {
    return <LoanCalculatorScreen onBack={() => setCurrentScreen('home')} />;
  } else {
    // Vista principal (Home)
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, darkMode && styles.headerTitleDark]}>Concesionaria de Autos</Text>
          <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeToggle}>
            <Text style={styles.darkModeIcon}>{darkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.searchBar, darkMode && styles.searchBarDark]}
          placeholder="Buscar por marca, modelo, año, precio o especificaciones..."
          placeholderTextColor={darkMode ? '#a0aec0' : '#888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              !showNewCarsOnly && styles.filterButtonActive,
              darkMode && !showNewCarsOnly && styles.filterButtonActiveDark,
              darkMode && showNewCarsOnly && styles.filterButtonDark
            ]}
            onPress={() => setShowNewCarsOnly(false)}
          >
            <Text style={[
              styles.filterButtonText,
              !showNewCarsOnly && styles.filterButtonTextActive,
              darkMode && !showNewCarsOnly && styles.filterButtonTextActiveDark
            ]}>Todos los Autos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              showNewCarsOnly && styles.filterButtonActive,
              darkMode && showNewCarsOnly && styles.filterButtonActiveDark,
              darkMode && !showNewCarsOnly && styles.filterButtonDark
            ]}
            onPress={() => setShowNewCarsOnly(true)}
          >
            <Text style={[
              styles.filterButtonText,
              showNewCarsOnly && styles.filterButtonTextActive,
              darkMode && showNewCarsOnly && styles.filterButtonTextActiveDark
            ]}>Autos Nuevos</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Autos */}
        {filteredCars.length === 0 ? (
          <Text style={[styles.noResultsText, darkMode && styles.textSecondaryDark]}>No se encontraron vehículos.</Text>
        ) : (
          <FlatList
            data={filteredCars}
            renderItem={({ item }) => <CarCard item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {/* Barra de Navegación Inferior */}
        <View style={[styles.bottomNav, darkMode && styles.bottomNavDark]}>
          <TouchableOpacity style={[styles.navButton, currentScreen === 'home' && styles.navButtonActiveCircle]} onPress={() => setCurrentScreen('home')}>
            <Text style={[styles.navButtonIcon, currentScreen === 'home' && styles.navButtonIconActive]}>🚗</Text>
            <Text style={[styles.navButtonText, currentScreen === 'home' && styles.navButtonTextActive, darkMode && styles.navButtonTextDark]}>Autos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, currentScreen === 'favorites' && styles.navButtonActiveCircle]} onPress={() => setCurrentScreen('favorites')}>
            <Text style={[styles.navButtonIcon, currentScreen === 'favorites' && styles.navButtonIconActive]}>❤️</Text>
            <Text style={[styles.navButtonText, currentScreen === 'favorites' && styles.navButtonTextActive, darkMode && styles.navButtonTextDark]}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, currentScreen === 'loanCalculator' && styles.navButtonActiveCircle]} onPress={() => setCurrentScreen('loanCalculator')}>
            <Text style={[styles.navButtonIcon, currentScreen === 'loanCalculator' && styles.navButtonIconActive]}>💰</Text>
            <Text style={[styles.navButtonText, currentScreen === 'loanCalculator' && styles.navButtonTextActive, darkMode && styles.navButtonTextDark]}>Financiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, currentScreen === 'contact' && styles.navButtonActiveCircle]} onPress={() => setCurrentScreen('contact')}>
            <Text style={[styles.navButtonIcon, currentScreen === 'contact' && styles.navButtonIconActive]}>📞</Text>
            <Text style={[styles.navButtonText, currentScreen === 'contact' && styles.navButtonTextActive, darkMode && styles.navButtonTextDark]}>Contacto</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Fondo azul-gris claro
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Ajuste para la barra de estado de Android
  },
  containerDark: {
    backgroundColor: '#1a202c', // Fondo oscuro
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a202c', // Texto oscuro
    flex: 1, // Permite que el título ocupe el espacio restante
  },
  headerTitleDark: {
    color: '#f0f4f8', // Texto claro en modo oscuro
  },
  darkModeToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'transparent', // Sin fondo para el icono
  },
  darkModeIcon: {
    fontSize: 24,
  },
  searchBar: {
    height: 50,
    borderColor: '#cbd5e0', // Borde gris claro
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 10, // Menos margen para dejar espacio a los botones de filtro
    backgroundColor: '#ffffff', // Fondo blanco para la barra de búsqueda
    fontSize: 16,
    color: '#333',
    shadowColor: '#000', // Sombra para profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Sombra para Android
  },
  searchBarDark: {
    backgroundColor: '#2d3748', // Fondo oscuro para la barra de búsqueda
    borderColor: '#4a5568',
    color: '#f0f4f8', // Texto claro
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#e2e8f0', // Fondo por defecto
  },
  filterButtonDark: {
    backgroundColor: '#4a5568', // Fondo oscuro para botones inactivos
  },
  filterButtonActive: {
    backgroundColor: '#4c51bf', // Fondo activo
  },
  filterButtonActiveDark: {
    backgroundColor: '#6366f1', // Fondo activo en modo oscuro
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568', // Texto por defecto
  },
  filterButtonTextActive: {
    color: '#ffffff', // Texto activo
  },
  filterButtonTextActiveDark: {
    color: '#ffffff', // Texto activo en modo oscuro
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    // Asegura que la FlatList no se superponga con la barra de navegación inferior
    marginBottom: 70, // Ajustado para la altura de la barra de navegación
  },
  carCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  carCardDark: {
    backgroundColor: '#2d3748', // Fondo oscuro para la tarjeta
    shadowColor: '#fff', // Sombra clara para modo oscuro
    shadowOpacity: 0.1,
  },
  carImage: {
    width: '100%',
    height: screenWidth * 0.5, // Altura responsiva basada en el ancho de la pantalla
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  carInfo: {
    padding: 15,
  },
  carTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2d3748', // Texto más oscuro
  },
  carYear: {
    fontSize: 16,
    color: '#4a5568', // Texto gris medio
    marginBottom: 5,
  },
  carPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4c51bf', // Color índigo
    marginBottom: 10,
  },
  newCarBadge: {
    backgroundColor: '#28a745', // Color verde para "Nuevo"
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start', // Alinear al inicio del contenedor
    marginBottom: 5,
  },
  newCarBadgeDark: {
    backgroundColor: '#4CAF50', // Verde más brillante para modo oscuro
  },
  newCarBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newCarBadgeTextDark: {
    color: '#ffffff',
  },
  favoriteButton: {
    backgroundColor: '#edf2f7', // Fondo gris claro
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start', // Alinear al inicio del contenedor
    marginTop: 5, // Añadido para separar del badge
  },
  favoriteButtonDark: {
    backgroundColor: '#4a5568', // Fondo oscuro para el botón de favorito
  },
  favoriteButtonText: {
    fontSize: 14,
    color: '#4c51bf', // Color índigo
    fontWeight: '600',
  },
  favoriteButtonTextDark: {
    color: '#818cf8', // Color más claro para el texto del botón de favorito
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
  textDark: {
    color: '#f0f4f8', // Texto claro en modo oscuro
  },
  textSecondaryDark: {
    color: '#a0aec0', // Texto secundario más claro en modo oscuro
  },
  priceDark: {
    color: '#818cf8', // Color de precio más claro en modo oscuro
  },
  // Estilos de la Vista de Detalles
  detailScrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  detailImage: {
    width: '100%',
    height: screenWidth * 0.6, // Altura responsiva basada en el ancho de la pantalla
    resizeMode: 'cover',
  },
  detailContent: {
    padding: 20,
    backgroundColor: '#ffffff', // Fondo blanco por defecto
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: -50, // Superponer ligeramente la imagen
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailContentDark: {
    backgroundColor: '#2d3748', // Fondo oscuro para el contenido de detalle
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a202c',
  },
  detailYear: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 5,
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c51bf',
    marginBottom: 15,
  },
  detailDescription: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 20,
  },
  newCarBadgeDetail: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start', // Alinear al inicio del contenedor
    marginBottom: 15,
  },
  newCarBadgeDetailDark: {
    backgroundColor: '#4CAF50',
  },
  favoriteButtonLarge: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  favoriteButtonActive: {
    backgroundColor: '#e0f2f7', // Azul más claro para favorito activo
  },
  favoriteButtonActiveDark: {
    backgroundColor: '#4a5568', // Fondo oscuro para favorito activo en modo oscuro
  },
  favoriteButtonInactive: {
    backgroundColor: '#4c51bf', // Índigo para favorito inactivo
  },
  favoriteButtonInactiveDark: {
    backgroundColor: '#6366f1', // Índigo más claro para favorito inactivo en modo oscuro
  },
  favoriteButtonTextLarge: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#718096', // Gris para el botón de volver
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonDark: {
    backgroundColor: '#4a5568', // Gris oscuro para el botón de volver en modo oscuro
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backButtonTextDark: {
    color: '#f0f4f8', // Texto claro para el botón de volver en modo oscuro
  },
  // --- START: Estilos para la navegación inferior (footer) ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Clean white background for the footer
    borderTopWidth: 0,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Enhanced shadow for a more pronounced "floating" effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 }, // Stronger shadow pointing upwards
    shadowOpacity: 0.15, // Slightly more opaque
    shadowRadius: 8, // Wider shadow blur
    elevation: 15, // Increased elevation for Android
    borderTopLeftRadius: 20, // More rounded top corners
    borderTopRightRadius: 20,
  },
  bottomNavDark: {
    backgroundColor: '#2C3E50', // A deep, professional blue-gray for dark mode
    borderTopColor: '#4A6572', // A subtle border in dark mode
    shadowColor: '#00BCD4', // A hint of light blue shadow in dark mode
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  navButton: {
    flex: 1, // Allow buttons to take equal space
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5, // Keep this to ensure vertical alignment for text
    marginHorizontal: 0, // Remove horizontal margin from the button container
    // No explicit width/height/borderRadius here; let activeCircle handle that
    backgroundColor: 'transparent', // Crucial: ensure inactive background is transparent
  },
  navButtonActiveCircle: {
    backgroundColor: '#FF6F61', // A warm, vibrant coral/red for the active circle
    borderRadius: 32.5, // Half of width/height for perfect circle
    width: 65, // Slightly larger width for the circle itself
    height: 65, // Slightly larger height for the circle itself
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6F61', // Shadow matches the vibrant active color
    shadowOffset: { width: 0, height: 6 }, // More pronounced shadow below the circle
    shadowOpacity: 0.5, // Stronger shadow opacity
    shadowRadius: 10, // Wider shadow blur
    elevation: 12, // Increased elevation for active circle on Android
    transform: [{ translateY: -15 }], // Lift the circle up even more
    position: 'absolute', // Position absolutely so other buttons aren't affected
  },
  navButtonIcon: {
    fontSize: 26, // Slightly larger icon size for inactive icons
    color: '#7F8C8D', // A medium gray for inactive icons
    // Remove marginBottom if it causes issues with text alignment
  },
  navButtonIconActive: {
    color: '#FFFFFF', // Pure white icon when active
  },
  navButtonText: {
    fontSize: 11, // Slightly smaller font size for text
    color: '#7F8C8D', // Same medium gray for inactive text
    fontWeight: '600', // Slightly bolder
    marginTop: 5, // More space between icon and text
  },
  navButtonTextDark: {
    color: '#BDC3C7', // Lighter gray for text in dark mode
  },
  navButtonTextActive: {
    color: '#FF6F61', // Vibrant coral/red for active text (if shown outside circle)
    fontWeight: 'bold',
  },
  // --- END: Estilos para la navegación inferior (footer) ---

  // Estilos para formularios y secciones (sin cambios significativos en esta iteración)
  formContainer: {
    padding: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    color: '#333',
  },
  formInput: {
    height: 45,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff',
  },
  formTextArea: {
    height: 100,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff',
    textAlignVertical: 'top', // Para que el texto empiece arriba en Android
  },
  calculateButton: {
    backgroundColor: '#4c51bf',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0f2f7',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#333',
  },
  monthlyPaymentText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4c51bf',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submissionMessage: {
    marginTop: 15,
    fontSize: 16,
    color: '#28a745',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1a202c',
    textAlign: 'center',
  },
  contactInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  contactValue: {
    fontSize: 16,
    color: '#333',
  },
  // Estilos para especificaciones
  specsContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  specsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a202c',
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#edf2f7',
  },
  specLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4a5568',
    flex: 1,
  },
  specValue: {
    fontSize: 15,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  // Estilos para el botón de volver en los headers de pantalla
  backButtonHeader: {
    padding: 8,
    marginRight: 10,
  },
  backButtonTextHeader: {
    fontSize: 16,
    color: '#4c51bf',
    fontWeight: 'bold',
  },
});
