import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { Alert, Linking, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import '../globals.css'

// Mock data for first aid guides
const firstAidGuides = [
  {
    id: 1,
    title: "Cuts and Scrapes",
    category: "Injuries",
    severity: "Minor",
    keywords: ["cut", "scrape", "wound", "bleeding"],
    steps: [
      "Clean your hands with soap and water",
      "Stop the bleeding by applying gentle pressure with a clean cloth",
      "Clean the wound with water",
      "Apply antibiotic ointment if available",
      "Cover with a sterile bandage",
      "Change the bandage daily and keep the wound clean",
    ],
    warning: "Seek medical attention if the cut is deep, won't stop bleeding, or shows signs of infection.",
  },
  {
    id: 2,
    title: "Burns (Minor)",
    category: "Injuries",
    severity: "Minor",
    keywords: ["burn", "scald", "heat", "fire"],
    steps: [
      "Remove from heat source immediately",
      "Cool the burn with cool (not cold) running water for 10-20 minutes",
      "Remove any jewelry or tight clothing near the burn before swelling occurs",
      "Do not break blisters if they form",
      "Apply a thin layer of aloe vera or burn gel",
      "Cover with a sterile, non-adhesive bandage",
      "Take over-the-counter pain medication if needed",
    ],
    warning:
      "Seek immediate medical attention for burns larger than 3 inches, burns on face/hands/genitals, or if blisters develop.",
  },
  {
    id: 3,
    title: "Choking (Adult)",
    category: "Breathing Issues",
    severity: "Emergency",
    keywords: ["choking", "airway", "breathing", "heimlich"],
    steps: [
      'Ask "Are you choking?" If they can speak or cough, encourage coughing',
      "If they cannot speak, stand behind them",
      "Place your arms around their waist",
      "Make a fist with one hand, place thumb side against stomach above navel",
      "Grasp fist with other hand and give quick upward thrusts",
      "Repeat until object is expelled or person becomes unconscious",
      "If unconscious, call emergency services and begin CPR",
    ],
    warning: "Call emergency services immediately. If person becomes unconscious, begin CPR.",
  },
  {
    id: 4,
    title: "Nosebleed",
    category: "Bleeding",
    severity: "Minor",
    keywords: ["nosebleed", "nose", "bleeding"],
    steps: [
      "Sit upright and lean slightly forward",
      "Pinch the soft part of the nose with thumb and index finger",
      "Hold for 10-15 minutes without releasing",
      "Breathe through your mouth",
      "Apply ice pack to bridge of nose if available",
      "Avoid blowing nose for several hours after bleeding stops",
    ],
    warning: "Seek medical attention if bleeding doesn't stop after 20 minutes or if caused by injury.",
  },
  {
    id: 5,
    title: "Allergic Reaction (Mild)",
    category: "Other Conditions",
    severity: "Minor",
    keywords: ["allergy", "reaction", "rash", "itching"],
    steps: [
      "Remove or avoid the allergen if known",
      "Take an antihistamine (like Benadryl) if available",
      "Apply cool, wet cloths to affected skin",
      "Avoid scratching the affected area",
      "Use calamine lotion or hydrocortisone cream for itching",
      "Monitor symptoms closely",
    ],
    warning:
      "Call emergency services immediately if experiencing difficulty breathing, swelling of face/throat, or severe whole-body reaction.",
  },
  {
    id: 6,
    title: "Fainting",
    category: "Other Conditions",
    severity: "Moderate",
    keywords: ["fainting", "unconscious", "dizzy", "lightheaded"],
    steps: [
      "If person feels faint, help them sit or lie down",
      "Elevate legs above heart level if possible",
      "Loosen tight clothing around neck and waist",
      "If unconscious, check for breathing and pulse",
      "Turn on side if vomiting",
      "Apply cool, damp cloth to forehead",
      "Do not give food or water until fully conscious",
    ],
    warning:
      "Call emergency services if person doesn't regain consciousness within 1 minute or if injury occurred during fall.",
  },
]

const categories = ["All", "Injuries", "Breathing Issues", "Bleeding", "Bites & Stings", "Other Conditions"]

export default function FirstAidApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredGuides = firstAidGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Emergency":
        return "bg-red-500"
      case "Moderate":
        return "bg-yellow-500"
      case "Minor":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const callEmergency = (number: string) => {
    Alert.alert("Call Emergency Services", `Do you want to call ${number}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white border-b border-gray-200 p-4">
          <View className="flex-row items-center mb-4">
            {/* [ICON: Medical cross - replace with proper SVG] */}
            <View className="w-10 h-10 bg-red-500 rounded-lg items-center justify-center mr-3">
              <Ionicons name="medical" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-sans-bold text-gray-900">First Aid Quick Guide</Text>
              <Text className="text-gray-600 font-sans-medium">Instant emergency instructions</Text>
            </View>
          </View>

          {/* Search */}
          <View className="relative">
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-base"
              placeholder="Search emergencies (e.g., 'burn', 'choking', 'cut')..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <Ionicons name="search" size={20} color="#9CA3AF" style={{ position: "absolute", left: 12, top: 14 }} />
          </View>
        </View>

        <View className="p-4">
          {/* Category Filter */}
          <View className="mb-6">
            <Text className="text-lg font-sans-semibold mb-3">Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategory === category ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                    }`}
                  >
                    <Text className={`text-sm ${selectedCategory === category ? "text-white" : "text-gray-700"}`}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Quick Access - Favorites */}
          {favorites.length > 0 && (
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons name="star" size={20} color="#EAB308" />
                <Text className="text-lg font-sans-semibold ml-2">Quick Access</Text>
              </View>
              <View className="gap-3">
                {firstAidGuides
                  .filter((guide) => favorites.includes(guide.id))
                  .map((guide) => (
                    <TouchableOpacity
                      key={guide.id}
                      onPress={() => router.push(`/guide/${guide.id}`)}
                      className="bg-white rounded-2xl p-4 border border-gray-200"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                          <Text className="font-sans-semibold text-base">{guide.title}</Text>
                          <Text className="text-sm font-sans-medium text-gray-600">{guide.category}</Text>
                        </View>
                        <View className={`px-2 py-1 rounded-2xl ${getSeverityColor(guide.severity)}`}>
                          <Text className="text-white text-xs font-sans-medium">{guide.severity}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
              <View className="h-px bg-gray-200 my-6" />
            </View>
          )}

          {/* Emergency Guides Grid */}
          <View className="mb-6">
            <Text className="text-lg font-sans-semibold mb-3">
              {searchTerm ? `Search Results (${filteredGuides.length})` : "All Emergency Guides"}
            </Text>

            {filteredGuides.length === 0 ? (
              <View className="bg-white rounded-lg p-8 items-center">
                <Text className="text-gray-500">No guides found. Try a different search term or category.</Text>
              </View>
            ) : (
              <View className="gap-4">
                {filteredGuides.map((guide) => (
                  <TouchableOpacity
                    key={guide.id}
                    onPress={() => router.push(`/guide/${guide.id}`)}
                    className="bg-white rounded-2xl p-4 border border-gray-200"
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className={`px-2 py-1 rounded-2xl ${getSeverityColor(guide.severity)}`}>
                        <Text className="text-white text-xs font-sans-medium">{guide.severity}</Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleFavorite(guide.id)} className="p-1">
                        <Ionicons
                          name={favorites.includes(guide.id) ? "heart" : "heart-outline"}
                          size={20}
                          color={favorites.includes(guide.id) ? "#EF4444" : "#9CA3AF"}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text className="font-sans-semibold text-lg mb-1">{guide.title}</Text>
                    <Text className="text-sm font-sans-mediumtext-gray-600 mb-3">{guide.category}</Text>
                    <Text className="text-sm font-sans-regular text-gray-500">{guide.steps.length} steps • Tap to view</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Emergency Contacts Footer */}
          <View className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <Ionicons name="warning" size={20} color="#DC2626" />
              <Text className="font-sans-semibold text-red-800 ml-2">Emergency Contacts</Text>
            </View>
            <View className="gap-2">
              <TouchableOpacity
                onPress={() => callEmergency("191")}
                className="bg-white border border-gray-300 rounded-2xl p-3 flex-row items-center"
              >
                <Ionicons name="call" size={20} color="#374151" />
                <Text className="ml-2 text-gray-700">Emergency Services: 191</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => callEmergency("192")}
                className="bg-white border border-gray-300 rounded-2xl p-3 flex-row items-center"
              >
                <Ionicons name="call" size={20} color="#374151" />
                <Text className="ml-2 text-gray-700">Fire Service: 192</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => callEmergency("18555")}
                className="bg-white border border-gray-300 rounded-2xl p-3 flex-row items-center"
              >
                <Ionicons name="call" size={20} color="#374151" />
                <Text className="ml-2 text-gray-700">Police: 18555</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
