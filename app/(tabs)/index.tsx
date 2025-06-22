import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PostCard from '@/components/PostCard';
import LevelCard from '@/components/LevelCard';
import { mockPosts, mockUser } from '@/data/mockData';
import { Post, Comment } from '@/types';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [refreshing, setRefreshing] = useState(false);

  const handlePraise = (postId: string, praiseType: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              praiseCount: post.praiseCount + 1,
              praises: [
                ...post.praises,
                {
                  id: Date.now().toString(),
                  username: mockUser.username,
                  type: 'stamp' as const,
                  content: praiseType,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, commentText: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      username: mockUser.username,
      content: commentText,
      timestamp: new Date().toISOString(),
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              commentCount: post.commentCount + 1,
              comments: [...post.comments, newComment],
            }
          : post
      )
    );

    Alert.alert('コメント投稿完了', 'コメントを投稿しました！');
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFE4E6', '#FFEEF0', '#ffffff']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ほめられ帳</Text>
          <Text style={styles.subtitle}>今日もおつかれさまです ✨</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* User Level Card */}
          <LevelCard user={mockUser} />

          {/* Posts */}
          <View style={styles.postsContainer}>
            <Text style={styles.sectionTitle}>みんなのがんばり</Text>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPraise={handlePraise}
                onComment={handleComment}
              />
            ))}
          </View>

          {/* Bottom Padding */}
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
  postsContainer: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Medium',
    color: '#374151',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  bottomPadding: {
    height: 20,
  },
});