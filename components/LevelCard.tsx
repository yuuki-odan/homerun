import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Star } from 'lucide-react-native';
import { User } from '@/types';

interface LevelCardProps {
  user: User;
}

export default function LevelCard({ user }: LevelCardProps) {
  const getNextLevelPraises = (level: number) => {
    return (level + 1) * 25;
  };

  const getCurrentLevelPraises = (level: number) => {
    return level * 25;
  };

  const progress = Math.min(
    (user.totalPraises - getCurrentLevelPraises(user.level)) /
    (getNextLevelPraises(user.level) - getCurrentLevelPraises(user.level)),
    1
  );

  return (
    <LinearGradient
      colors={['#FF6B9D', '#FFB6C1']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Trophy size={20} color="#ffffff" />
          <Text style={styles.levelText}>レベル {user.level}</Text>
        </View>
        <View style={styles.praiseCount}>
          <Star size={16} color="#ffffff" />
          <Text style={styles.praiseCountText}>{user.totalPraises}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>
          次のレベルまで {getNextLevelPraises(user.level) - user.totalPraises} 褒め
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      {user.badges.length > 0 && (
        <View style={styles.badgesContainer}>
          <Text style={styles.badgesTitle}>獲得バッジ</Text>
          <View style={styles.badges}>
            {user.badges.slice(0, 3).map((badge) => (
              <View key={badge.id} style={styles.badge}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    marginLeft: 6,
  },
  praiseCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  praiseCountText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 8,
    opacity: 0.9,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  badgesContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: 16,
  },
  badgesTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  badgeName: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'NotoSansJP-Regular',
  },
});