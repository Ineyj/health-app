"use client"

import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"

// Same mock data as index.tsx
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

export default function GuideDetail() {
  const { id } = useLocalSearchParams()
  const [favorites, setFavorites] = useState<number[]>([])

  const guide = firstAidGuides.find((g) => g.id === Number.parseInt(id as string))

  if (!guide) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-lg text-gray-500">Guide not found</Text>
      </SafeAreaView>
    )
  }

  const toggleFavorite = (guideId: number) => {
    setFavorites((prev) => (prev.includes(guideId) ? prev.filter((fav) => fav !== guideId) : [...prev, guideId]))
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
      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-lg border border-gray-200">
          {/* Header */}
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-2xl font-sans-bold text-gray-900">{guide.title}</Text>
                <Text className="text-lg text-gray-600 font-sans-semibold mt-2">{guide.category}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <View className={`px-3 py-1 rounded ${getSeverityColor(guide.severity)}`}>
                  <Text className="text-white text-sm font-sans-medium">{guide.severity}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorite(guide.id)}>
                  <Ionicons
                    name={favorites.includes(guide.id) ? "heart" : "heart-outline"}
                    size={24}
                    color={favorites.includes(guide.id) ? "#EF4444" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Illustration Placeholder */}
          <View className="bg-gray-100 p-8 m-4 rounded-lg items-center">
            <Ionicons name="medical-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2 text-center">[Illustration: {guide.title} demonstration]</Text>
          </View>

          {/* Steps */}
          <View className="p-4">
            <Text className="font-sans-semibold text-lg mb-4">Step-by-Step Instructions:</Text>
            <View className="gap-4">
              {guide.steps.map((step, index) => (
                <View key={index} className="flex-row gap-3">
                  <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                    <Text className="text-white text-sm font-sans-semibold">{index + 1}</Text>
                  </View>
                  <Text className="flex-1 pt-1 text-base leading-6">{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Warning */}
          <View className="bg-red-50 border border-red-200 rounded-lg m-4 p-4">
            <View className="flex-row gap-2">
              <Ionicons name="warning" size={20} color="#DC2626" />
              <View className="flex-1">
                <Text className="font-sans-semibold text-red-800 mb-1">Important Warning:</Text>
                <Text className="text-red-700 leading-5">{guide.warning}</Text>
              </View>
            </View>
          </View>

          {/* Emergency Contacts */}
          <View className="bg-blue-50 border border-blue-200 rounded-lg m-4 p-4">
            <Text className="font-sans-semibold text-blue-800 mb-3">Emergency Contacts:</Text>
            <View className="gap-2">
              <TouchableOpacity
                onPress={() => callEmergency("911")}
                className="bg-white border border-gray-300 rounded-lg p-3 flex-row items-center"
              >
                <Ionicons name="call" size={20} color="#374151" />
                <Text className="ml-2 text-gray-700">Emergency Services: 911</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => callEmergency("18002221222")}
                className="bg-white border border-gray-300 rounded-lg p-3 flex-row items-center"
              >
                <Ionicons name="call" size={20} color="#374151" />
                <Text className="ml-2 text-gray-700">Poison Control: 1-800-222-1222</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
