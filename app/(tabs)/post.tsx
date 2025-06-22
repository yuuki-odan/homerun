import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Smile } from 'lucide-react-native';

const EFFORT_EMOJIS = [
  '🚶‍♂️', '📚', '🍳', '💪', '🧘‍♀️', '🎯',
  '✍️', '🎨', '🌱', '💻', '🏃‍♀️', '🎵',
  '📖', '🧹', '🥗', '💤', '☕', '🎉',
];

export default function PostScreen() {
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('エラー', 'がんばったことを入力してください');
      return;
    }

    setIsPosting(true);
    
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      setContent('');
      setSelectedEmoji('');
      Alert.alert('投稿完了', 'あなたのがんばりを投稿しました！', [
        { text: 'OK', onPress: () => {} }
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFE4E6', '#FFEEF0', '#ffffff']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>今日のがんばり</Text>
          <Text style={styles.subtitle}>小さな一歩も大きな成果です 🌟</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Post Form */}
          <View style={styles.formContainer}>
            <LinearGradient
              colors={['#ffffff', '#fef7ff']}
              style={styles.form}
            >
              <Text style={styles.inputLabel}>今日がんばったこと</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={6}
                placeholder="例：早起きして散歩した、資格の勉強を1時間やった、家族のために料理を作った..."
                placeholderTextColor="#9CA3AF"
                value={content}
                onChangeText={setContent}
                textAlignVertical="top"
              />

              {/* Emoji Selection */}
              <View style={styles.emojiSection}>
                <Text style={styles.emojiLabel}>気分を表現 (選択)</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.emojiContainer}
                >
                  {EFFORT_EMOJIS.map((emoji, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.emojiButton,
                        selectedEmoji === emoji && styles.selectedEmoji,
                      ]}
                      onPress={() => setSelectedEmoji(selectedEmoji === emoji ? '' : emoji)}
                    >
                      <Text style={styles.emoji}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Post Button */}
              <TouchableOpacity
                style={[styles.postButton, (!content.trim() || isPosting) && styles.disabledButton]}
                onPress={handlePost}
                disabled={!content.trim() || isPosting}
              >
                <LinearGradient
                  colors={content.trim() && !isPosting ? ['#FF6B9D', '#FFB6C1'] : ['#E5E7EB', '#E5E7EB']}
                  style={styles.postButtonGradient}
                >
                  <Send size={20} color="#ffffff" />
                  <Text style={styles.postButtonText}>
                    {isPosting ? '投稿中...' : '投稿する'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>投稿のコツ ✨</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tip}>• どんな小さなことでも大丈夫です</Text>
              <Text style={styles.tip}>• 具体的に書くとより共感されやすいです</Text>
              <Text style={styles.tip}>• ポジティブな気持ちを大切にしましょう</Text>
              <Text style={styles.tip}>• 他の人のがんばりも褒めてあげましょう</Text>
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSansJP-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Regular',
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    margin: 20,
  },
  form: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Medium',
    color: '#374151',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'NotoSansJP-Regular',
    color: '#374151',
    backgroundColor: '#ffffff',
    minHeight: 120,
    marginBottom: 20,
  },
  emojiSection: {
    marginBottom: 24,
  },
  emojiLabel: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
    color: '#6B7280',
    marginBottom: 12,
  },
  emojiContainer: {
    paddingHorizontal: 4,
  },
  emojiButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedEmoji: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FF6B9D',
  },
  emoji: {
    fontSize: 20,
  },
  postButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  postButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    marginLeft: 8,
  },
  tipsContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    color: '#374151',
    marginBottom: 12,
  },
  tipsList: {
    paddingLeft: 8,
  },
  tip: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 6,
  },
  bottomPadding: {
    height: 20,
  },
});