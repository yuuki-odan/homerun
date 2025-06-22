import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Calendar, ChartBar as BarChart3, Award, Heart } from 'lucide-react-native';
import LevelCard from '@/components/LevelCard';
import { mockUser } from '@/data/mockData';

export default function ProfileScreen() {
  const stats = [
    {
      icon: <Calendar size={20} color="#FF6B9D" />,
      label: '連続投稿日数',
      value: '7日',
      description: '今週は毎日がんばりました！',
    },
    {
      icon: <Heart size={20} color="#FFB347" />,
      label: '今月の褒め数',
      value: '45回',
      description: '先月より15回増えました',
    },
    {
      icon: <BarChart3 size={20} color="#4FACFE" />,
      label: '投稿数',
      value: '28件',
      description: '小さながんばりの積み重ね',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFE4E6', '#FFEEF0', '#ffffff']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>プロフィール</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* User Level Card */}
          <LevelCard user={mockUser} />

          {/* Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>今月の活動</Text>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <LinearGradient
                  colors={['#ffffff', '#fef7ff']}
                  style={styles.statCardGradient}
                >
                  <View style={styles.statIcon}>
                    {stat.icon}
                  </View>
                  <View style={styles.statContent}>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statDescription}>{stat.description}</Text>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </View>

          {/* All Badges */}
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>獲得バッジ</Text>
            <View style={styles.badgesGrid}>
              {mockUser.badges.map((badge) => (
                <View key={badge.id} style={styles.badgeCard}>
                  <LinearGradient
                    colors={['#ffffff', '#fef7ff']}
                    style={styles.badgeCardGradient}
                  >
                    <Text style={styles.badgeIcon}>{badge.icon}</Text>
                    <Text style={styles.badgeTitle}>{badge.name}</Text>
                    <Text style={styles.badgeDescription}>{badge.description}</Text>
                    <Text style={styles.badgeDate}>
                      {new Date(badge.unlockedAt).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                      })} 獲得
                    </Text>
                  </LinearGradient>
                </View>
              ))}
              
              {/* Placeholder badges */}
              <View style={styles.lockedBadgeCard}>
                <View style={styles.lockedBadgeContent}>
                  <Text style={styles.lockedBadgeIcon}>🔒</Text>
                  <Text style={styles.lockedBadgeTitle}>???</Text>
                  <Text style={styles.lockedBadgeDescription}>
                    まだ獲得していないバッジ
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Motivation Message */}
          <View style={styles.motivationCard}>
            <LinearGradient
              colors={['#FF6B9D', '#FFB6C1']}
              style={styles.motivationGradient}
            >
              <Award size={24} color="#ffffff" />
              <Text style={styles.motivationTitle}>
                あなたは素晴らしいです！
              </Text>
              <Text style={styles.motivationMessage}>
                毎日の小さながんばりが、大きな成長につながっています。
                続けることが一番大切です。今日もお疲れ様でした！
              </Text>
            </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSansJP-Bold',
    color: '#1F2937',
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Medium',
    color: '#374151',
    marginBottom: 16,
  },
  statCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'NotoSansJP-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statDescription: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Regular',
    color: '#9CA3AF',
  },
  badgesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 11,
    fontFamily: 'NotoSansJP-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  badgeDate: {
    fontSize: 10,
    fontFamily: 'NotoSansJP-Regular',
    color: '#9CA3AF',
  },
  lockedBadgeCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  lockedBadgeContent: {
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  lockedBadgeIcon: {
    fontSize: 24,
    marginBottom: 8,
    opacity: 0.5,
  },
  lockedBadgeTitle: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
  lockedBadgeDescription: {
    fontSize: 11,
    fontFamily: 'NotoSansJP-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  motivationCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  motivationGradient: {
    padding: 20,
    alignItems: 'center',
  },
  motivationTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  motivationMessage: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
  bottomPadding: {
    height: 40,
  },
});