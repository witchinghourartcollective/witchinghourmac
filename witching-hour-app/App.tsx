import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable
} from "react-native";
import { Audio } from "expo-av";

const ROOMS = [
  {
    id: "foyer",
    title: "Foyer",
    description: "Enter the house. Whispered light. Ritual artifacts.",
    mood: "A vestibule of black glass and slow ember light."
  },
  {
    id: "studio",
    title: "Studio",
    description: "Commissioned soundscapes and session bookings.",
    mood: "Walls breathe in maroon haze. The console glows gold."
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Artworks hung in a moving corridor of light.",
    mood: "Frames float in green fog, shifting with your steps."
  },
  {
    id: "vault",
    title: "NFT Vault",
    description: "Token-gated pieces and collector editions.",
    mood: "A dark prism chamber. Sigils hum in ultraviolet."
  },
  {
    id: "attic",
    title: "Attic",
    description: "Behind-the-scenes experiments and lore.",
    mood: "Dust motes orbit in a purple beam."
  }
];

const TRACKS = [
  {
    id: "whm-001",
    title: "Witching Hour - Session 001",
    artist: "Witching Hour",
    previewUrl: null as string | null
  }
];

const ARTWORKS = [
  {
    id: "art-1",
    title: "Ash Bloom",
    medium: "Ink + light",
    note: "Replace with your artwork image."
  },
  {
    id: "art-2",
    title: "Black Glass",
    medium: "Digital painting",
    note: "Replace with your artwork image."
  },
  {
    id: "art-3",
    title: "Ritual Frame",
    medium: "Mixed media",
    note: "Replace with your artwork image."
  }
];

const NFTS = [
  {
    id: "nft-1",
    title: "Sigil Room",
    edition: "1/1",
    status: "Reserved"
  },
  {
    id: "nft-2",
    title: "Night Corridor",
    edition: "1/5",
    status: "Available"
  }
];

const BOOKINGS = [
  {
    id: "booking-1",
    title: "Studio Session",
    price: "$350",
    detail: "3 hours, tracking + mix notes."
  },
  {
    id: "booking-2",
    title: "Commission",
    price: "$750",
    detail: "Custom soundscape, 2 rounds."
  },
  {
    id: "booking-3",
    title: "Live Ritual",
    price: "$1,800",
    detail: "Performance + installation."
  }
];

const THEME = {
  ink: "#050507",
  void: "#0b0b12",
  smoke: "#111218",
  ember: "#7b2a1e",
  ash: "#bdb3a7",
  mist: "#7c7a85",
  glow: "#efe7dc",
  green: "#0f3b2b",
  purple: "#2b103f",
  maroon: "#3b1014",
  gold: "#d1b15a"
};

export default function App() {
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);
  const travel = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const logoutFade = useRef(new Animated.Value(0)).current;

  const currentRoom = useMemo(
    () => ROOMS.find((room) => room.id === roomId) ?? ROOMS[0],
    [roomId]
  );

  const track = TRACKS[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 3800,
          useNativeDriver: true
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 3800,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [shimmer]);

  useEffect(() => {
    travel.setValue(0);
    Animated.timing(travel, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true
    }).start();
    setTransitionKey((prev) => prev + 1);
  }, [roomId, travel]);

  useEffect(() => {
    Animated.timing(logoutFade, {
      toValue: loggingOut ? 1 : 0,
      duration: 600,
      useNativeDriver: true
    }).start();
  }, [loggingOut, logoutFade]);

  const handleLogOut = () => {
    setLoggingOut(true);
  };

  const handleReenter = () => {
    setLoggingOut(false);
  };

  const handleTogglePlayback = async () => {
    if (!track.previewUrl) {
      setPlaying((prev) => !prev);
      return;
    }

    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.previewUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlaying(true);
      return;
    }

    if (playing) {
      await sound.pauseAsync();
      setPlaying(false);
      return;
    }

    await sound.playAsync();
    setPlaying(true);
  };

  const { width } = Dimensions.get("window");
  const roomTranslate = travel.interpolate({
    inputRange: [0, 1],
    outputRange: [width * 0.45, 0]
  });
  const roomRotate = travel.interpolate({
    inputRange: [0, 1],
    outputRange: ["-8deg", "0deg"]
  });
  const roomOpacity = travel.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  const shimmerTranslate = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 20]
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Witching Hour</Text>
          <Text style={styles.title}>Walk the House</Text>
          <Text style={styles.subtitle}>
            A cross-platform ritual space for music, art, NFTs, and
            commission bookings.
          </Text>
        </View>

        <View style={styles.roomStrip}>
          {ROOMS.map((room) => (
            <Pressable
              key={room.id}
              onPress={() => setRoomId(room.id)}
              style={[
                styles.roomChip,
                room.id === roomId && styles.roomChipActive
              ]}
            >
              <Text
                style={[
                  styles.roomChipText,
                  room.id === roomId && styles.roomChipTextActive
                ]}
              >
                {room.title}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sceneFrame}>
          <Animated.View
            key={transitionKey}
            style={[
              styles.sceneRoom,
              {
                opacity: roomOpacity,
                transform: [
                  { perspective: 900 },
                  { translateX: roomTranslate },
                  { rotateY: roomRotate }
                ]
              }
            ]}
          >
            <View style={styles.sceneBackdrop} />
            <View style={styles.sceneWallLeft} />
            <View style={styles.sceneWallRight} />
            <View style={styles.sceneWallBack} />
            <View style={styles.sceneWindow} />
            <View style={styles.sceneFloor} />
            <Animated.View
              style={[
                styles.sceneGlow,
                { transform: [{ translateX: shimmerTranslate }] }
              ]}
            />
            <View style={styles.sceneContent}>
              <Text style={styles.roomTitle}>{currentRoom.title}</Text>
              <Text style={styles.roomDesc}>{currentRoom.description}</Text>
              <Text style={styles.roomMood}>{currentRoom.mood}</Text>
              <View style={styles.roomActions}>
                <Text style={styles.roomHint}>
                  Tap other rooms to keep walking.
                </Text>
                <Pressable style={styles.exitButton} onPress={handleLogOut}>
                  <Text style={styles.exitButtonText}>Exit the House</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound Chamber</Text>
          <Text style={styles.sectionCopy}>
            Add preview URLs for streaming playback. Use this for albums,
            commissions, or live session previews.
          </Text>
          <View style={styles.playerCard}>
            <View style={styles.playerMeta}>
              <Text style={styles.playerTitle}>{track.title}</Text>
              <Text style={styles.playerArtist}>{track.artist}</Text>
            </View>
            <Pressable style={styles.playerButton} onPress={handleTogglePlayback}>
              <Text style={styles.playerButtonText}>
                {playing ? "Pause" : "Play"}
              </Text>
            </Pressable>
          </View>
          {!track.previewUrl && (
            <Text style={styles.playerNote}>
              Add a preview URL in `TRACKS` to enable real playback.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery Wing</Text>
          <Text style={styles.sectionCopy}>
            Replace the cards with your art images. Each card can open a
            full-screen walkthrough room.
          </Text>
          <View style={styles.grid}>
            {ARTWORKS.map((art) => (
              <View key={art.id} style={styles.artCard}>
                <Text style={styles.artTitle}>{art.title}</Text>
                <Text style={styles.artMeta}>{art.medium}</Text>
                <Text style={styles.artNote}>{art.note}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NFT Vault</Text>
          <Text style={styles.sectionCopy}>
            Hook this section to your chain indexer or marketplace API.
          </Text>
          {NFTS.map((nft) => (
            <View key={nft.id} style={styles.nftRow}>
              <View>
                <Text style={styles.nftTitle}>{nft.title}</Text>
                <Text style={styles.nftMeta}>{nft.edition}</Text>
              </View>
              <Text style={styles.nftStatus}>{nft.status}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bookings + Commissions</Text>
          <Text style={styles.sectionCopy}>
            Stripe checkout will live here. Each tier can link to a paid
            booking flow.
          </Text>
          {BOOKINGS.map((booking) => (
            <View key={booking.id} style={styles.bookingRow}>
              <View>
                <Text style={styles.bookingTitle}>{booking.title}</Text>
                <Text style={styles.bookingDetail}>{booking.detail}</Text>
              </View>
              <Text style={styles.bookingPrice}>{booking.price}</Text>
            </View>
          ))}
          <Pressable style={styles.bookingButton}>
            <Text style={styles.bookingButtonText}>Start Booking</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Replace text + data with your real catalog and connect Stripe +
            NFT APIs when ready.
          </Text>
        </View>
      </ScrollView>
      <Animated.View
        pointerEvents={loggingOut ? "auto" : "none"}
        style={[
          styles.logoutOverlay,
          {
            opacity: logoutFade
          }
        ]}
      >
        <View style={styles.logoutPanel}>
          <Text style={styles.logoutTitle}>Witching Hour Terminal</Text>
          <View style={styles.logoutLog}>
            <Text style={styles.logoutLine}>$ exit --house</Text>
            <Text style={styles.logoutLine}>Disconnecting rooms...</Text>
            <Text style={styles.logoutLine}>Saving ambient state...</Text>
            <Text style={styles.logoutLine}>Door sealed. You remain.</Text>
          </View>
          <Pressable style={styles.reenterButton} onPress={handleReenter}>
            <Text style={styles.reenterButtonText}>Return Inside</Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.ink
  },
  container: {
    padding: 24,
    gap: 24
  },
  hero: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: THEME.void,
    borderWidth: 1,
    borderColor: "#1d1d28"
  },
  eyebrow: {
    textTransform: "uppercase",
    letterSpacing: 2,
    color: THEME.mist,
    fontSize: 12,
    marginBottom: 8
  },
  title: {
    fontSize: 32,
    color: THEME.glow,
    fontWeight: "600"
  },
  subtitle: {
    marginTop: 12,
    color: THEME.ash,
    lineHeight: 20
  },
  roomStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  roomChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#2b2b35",
    backgroundColor: THEME.smoke
  },
  roomChipActive: {
    borderColor: THEME.ember,
    backgroundColor: "#1c0f0b"
  },
  roomChipText: {
    color: THEME.ash,
    fontSize: 13
  },
  roomChipTextActive: {
    color: THEME.glow
  },
  sceneFrame: {
    height: 240,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#0a0a10",
    borderWidth: 1,
    borderColor: "#222232"
  },
  sceneRoom: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden"
  },
  sceneBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#14141f"
  },
  sceneWallLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "32%",
    backgroundColor: "#1d5c43",
    opacity: 0.9
  },
  sceneWallRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "32%",
    backgroundColor: "#4b1b6f",
    opacity: 0.85
  },
  sceneWallBack: {
    position: "absolute",
    left: "20%",
    right: "20%",
    top: "16%",
    bottom: "16%",
    backgroundColor: "#5a1a22",
    borderWidth: 1,
    borderColor: "#3a3a4a",
    opacity: 0.9
  },
  sceneWindow: {
    position: "absolute",
    left: "38%",
    right: "38%",
    top: "18%",
    height: "24%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1b15a",
    backgroundColor: "rgba(209, 177, 90, 0.18)"
  },
  sceneFloor: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -40,
    height: "45%",
    backgroundColor: "#0a0a10",
    opacity: 0.95,
    transform: [{ skewX: "-8deg" }]
  },
  sceneGlow: {
    position: "absolute",
    left: "25%",
    right: "25%",
    top: "10%",
    bottom: "10%",
    backgroundColor: THEME.gold,
    opacity: 0.18,
    borderRadius: 999
  },
  sceneContent: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end"
  },
  roomTitle: {
    fontSize: 22,
    color: THEME.glow,
    marginBottom: 8
  },
  roomDesc: {
    color: THEME.ash,
    lineHeight: 20
  },
  roomMood: {
    color: THEME.mist,
    marginTop: 6,
    fontSize: 12
  },
  roomActions: {
    marginTop: 12
  },
  roomHint: {
    color: THEME.mist,
    fontSize: 12
  },
  exitButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#2b2b35",
    backgroundColor: "#0d0d14",
    alignSelf: "flex-start"
  },
  exitButtonText: {
    color: THEME.ash,
    fontSize: 12,
    letterSpacing: 1
  },
  section: {
    gap: 12
  },
  sectionTitle: {
    fontSize: 20,
    color: THEME.glow
  },
  sectionCopy: {
    color: THEME.ash,
    lineHeight: 20
  },
  playerCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#101018",
    borderWidth: 1,
    borderColor: "#2c2c3b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16
  },
  playerMeta: {
    flex: 1
  },
  playerTitle: {
    color: THEME.glow,
    fontSize: 16
  },
  playerArtist: {
    color: THEME.mist,
    marginTop: 4
  },
  playerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: THEME.ember,
    borderRadius: 999
  },
  playerButtonText: {
    color: "#130606",
    fontWeight: "600"
  },
  playerNote: {
    color: THEME.mist,
    fontSize: 12
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  artCard: {
    flexBasis: "48%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#0f0f15",
    borderWidth: 1,
    borderColor: "#2b2b3a"
  },
  artTitle: {
    color: THEME.glow,
    fontSize: 15
  },
  artMeta: {
    color: THEME.mist,
    marginTop: 6
  },
  artNote: {
    color: THEME.ash,
    marginTop: 10,
    fontSize: 12
  },
  nftRow: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#11111a",
    borderWidth: 1,
    borderColor: "#2b2b3a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nftTitle: {
    color: THEME.glow,
    fontSize: 15
  },
  nftMeta: {
    color: THEME.mist,
    marginTop: 4
  },
  nftStatus: {
    color: THEME.ember,
    fontWeight: "600"
  },
  bookingRow: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#0f0f18",
    borderWidth: 1,
    borderColor: "#2b2b3a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bookingTitle: {
    color: THEME.glow,
    fontSize: 15
  },
  bookingDetail: {
    color: THEME.mist,
    marginTop: 4,
    fontSize: 12
  },
  bookingPrice: {
    color: THEME.ember,
    fontWeight: "600"
  },
  bookingButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: THEME.glow,
    alignItems: "center"
  },
  bookingButtonText: {
    color: "#15131a",
    fontWeight: "600"
  },
  footer: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#0b0b12",
    borderWidth: 1,
    borderColor: "#1f1f2a"
  },
  footerText: {
    color: THEME.mist,
    fontSize: 12,
    lineHeight: 18
  },
  logoutOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(3, 3, 6, 0.94)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  logoutPanel: {
    width: "100%",
    maxWidth: 520,
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2b2b3a",
    backgroundColor: "#0a0a12"
  },
  logoutTitle: {
    color: THEME.glow,
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 16
  },
  logoutLog: {
    gap: 8,
    marginBottom: 18
  },
  logoutLine: {
    color: THEME.mist,
    fontSize: 12,
    letterSpacing: 1
  },
  reenterButton: {
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: THEME.ember,
    alignItems: "center"
  },
  reenterButtonText: {
    color: "#130606",
    fontWeight: "600"
  }
});
