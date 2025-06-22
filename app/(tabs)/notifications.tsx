import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Heart, Trophy, Gift, Clock, MessageCircle } from 'lucide-react-native';
import { mockNotifications } from '@/data/mockData';
import { Notification } from '@/types';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return '数分前';
    if (hours < 24) return `${hours}時間前`;
    return `${Math.floor(hours / 24)}日前`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'praise':
        return <Heart size={20} color="#FF6B9D" fill="#FF6B9D" />;
      case 'comment':
        return <MessageCircle size={20} color="#4FACFE" />;
      case 'level_up':
        return <Trophy size={20} color="#FFB347" />;
      case 'badge':
        return <Gift size={20} color="#4FACFE" />;
      default:
        return <Bell size={20} color="#9CA3AF" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFE4E6', '#FFEEF0', '#ffffff']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>通知</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Bell size={48} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>通知はありません</Text>
              <Text style={styles.emptyMessage}>
                新しい褒めやコメント、レベルアップがあるとここに表示されます
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsContainer}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.unreadCard,
                  ]}
                  onPress={() => markAsRead(notification.id)}
                >
                  <LinearGradient
                    colors={
                      notification.read
                        ? ['#ffffff', '#ffffff']
                        : ['#ffffff', '#fef7ff']
                    }
                    style={styles.cardGradient}
                  >
                    <View style={styles.notificationContent}>
                      <View style={styles.iconContainer}>
                        {getNotificationIcon(notification.type)}
                      </View>
                      
                      <View style={styles.textContent}>
                        <Text style={[
                          styles.notificationTitle,
                          !notification.read && styles.unreadTitle,
                        ]}>
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationMessage}>
                          {notification.message}
                        </Text>
                        <View style={styles.timeContainer}>
                          <Clock size={12} color="#9CA3AF" />
                          <Text style={styles.timestamp}>
                            {formatTime(notification.timestamp)}
                          </Text>
                        </View>
                      </View>

                      {!notification.read && (
                        <View style={styles.unreadDot} />
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          )}

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
  unreadBadge: {
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'NotoSansJP-Bold',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Medium',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationsContainer: {
    paddingHorizontal: 16,
  },
  notificationCard: {
    marginBottom: 12,
    borderRadius: 16,
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
  unreadCard: {
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  cardGradient: {
    padding: 16,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Medium',
    color: '#374151',
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#1F2937',
    fontFamily: 'NotoSansJP-Bold',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'NotoSansJP-Regular',
    marginLeft: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B9D',
    marginLeft: 8,
    marginTop: 4,
  },
  bottomPadding: {
    height: 20,
  },
});