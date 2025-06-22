import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, Clock, Send } from 'lucide-react-native';
import { Post, PRAISE_STAMPS, Comment } from '@/types';

interface PostCardProps {
  post: Post;
  onPraise: (postId: string, praiseType: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export default function PostCard({ post, onPraise, onComment }: PostCardProps) {
  const [showPraiseOptions, setShowPraiseOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [userPraised, setUserPraised] = useState(false);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return '数分前';
    if (hours < 24) return `${hours}時間前`;
    return `${Math.floor(hours / 24)}日前`;
  };

  const handlePraise = (stampId: string) => {
    setUserPraised(true);
    onPraise(post.id, stampId);
    setShowPraiseOptions(false);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      Alert.alert('エラー', 'コメントを入力してください');
      return;
    }

    onComment(post.id, commentText.trim());
    setCommentText('');
    setShowCommentInput(false);
    setShowComments(true);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && post.comments.length === 0) {
      setShowCommentInput(true);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#fef7ff']}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {post.username.charAt(0)}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{post.username}</Text>
            <View style={styles.timeContainer}>
              <Clock size={12} color="#9CA3AF" />
              <Text style={styles.timestamp}>
                {formatTime(post.timestamp)}
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.contentText}>{post.content}</Text>
          {post.emoji && (
            <Text style={styles.emoji}>{post.emoji}</Text>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.praiseButton, userPraised && styles.praisedButton]}
            onPress={() => setShowPraiseOptions(!showPraiseOptions)}
          >
            <Heart
              size={18}
              color={userPraised ? '#FF6B9D' : '#9CA3AF'}
              fill={userPraised ? '#FF6B9D' : 'none'}
            />
            <Text style={[styles.praiseCount, userPraised && styles.praisedText]}>
              {post.praiseCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.commentButton}
            onPress={toggleComments}
          >
            <MessageCircle size={18} color="#9CA3AF" />
            <Text style={styles.commentText}>
              {post.commentCount}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Praise Options */}
        {showPraiseOptions && (
          <View style={styles.praiseOptions}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.praiseStamps}
            >
              {PRAISE_STAMPS.map((stamp) => (
                <TouchableOpacity
                  key={stamp.id}
                  style={styles.stampButton}
                  onPress={() => handlePraise(stamp.id)}
                >
                  <Text style={styles.stampEmoji}>{stamp.emoji}</Text>
                  <Text style={styles.stampText}>{stamp.text}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Comments Section */}
        {showComments && (
          <View style={styles.commentsSection}>
            <View style={styles.commentsSectionHeader}>
              <Text style={styles.commentsSectionTitle}>コメント</Text>
              <TouchableOpacity
                style={styles.addCommentButton}
                onPress={() => setShowCommentInput(!showCommentInput)}
              >
                <MessageCircle size={16} color="#FF6B9D" />
                <Text style={styles.addCommentText}>コメントする</Text>
              </TouchableOpacity>
            </View>

            {/* Comment Input */}
            {showCommentInput && (
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="応援コメントを書いてください..."
                  placeholderTextColor="#9CA3AF"
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                <View style={styles.commentInputActions}>
                  <TouchableOpacity
                    style={styles.cancelCommentButton}
                    onPress={() => {
                      setShowCommentInput(false);
                      setCommentText('');
                    }}
                  >
                    <Text style={styles.cancelCommentText}>キャンセル</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.submitCommentButton,
                      !commentText.trim() && styles.disabledSubmitButton
                    ]}
                    onPress={handleCommentSubmit}
                    disabled={!commentText.trim()}
                  >
                    <Send size={16} color="#ffffff" />
                    <Text style={styles.submitCommentText}>送信</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Comments List */}
            {post.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>
                    {comment.username.charAt(0)}
                  </Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>{comment.username}</Text>
                    <Text style={styles.commentTime}>
                      {formatTime(comment.timestamp)}
                    </Text>
                  </View>
                  <Text style={styles.commentMessage}>{comment.content}</Text>
                </View>
              </View>
            ))}

            {post.comments.length === 0 && !showCommentInput && (
              <View style={styles.noCommentsContainer}>
                <Text style={styles.noCommentsText}>
                  まだコメントがありません
                </Text>
                <Text style={styles.noCommentsSubtext}>
                  最初のコメントを書いてみませんか？
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Recent Praises */}
        {post.praises.length > 0 && (
          <View style={styles.recentPraises}>
            {post.praises.slice(0, 2).map((praise) => (
              <View key={praise.id} style={styles.praiseItem}>
                <Text style={styles.praiseUsername}>{praise.username}</Text>
                <Text style={styles.praiseContent}>
                  {praise.type === 'stamp' ? praise.content : `"${praise.content}"`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Medium',
    color: '#1F2937',
    marginBottom: 2,
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
  content: {
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  praiseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    marginRight: 12,
  },
  praisedButton: {
    backgroundColor: '#FEF2F2',
  },
  praiseCount: {
    marginLeft: 6,
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'NotoSansJP-Medium',
  },
  praisedText: {
    color: '#FF6B9D',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'NotoSansJP-Medium',
  },
  praiseOptions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  praiseStamps: {
    paddingHorizontal: 4,
  },
  stampButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 60,
  },
  stampEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  stampText: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
  },
  commentsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  commentsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  commentsSectionTitle: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
    color: '#374151',
  },
  addCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  addCommentText: {
    fontSize: 12,
    color: '#FF6B9D',
    fontFamily: 'NotoSansJP-Medium',
    marginLeft: 4,
  },
  commentInputContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  commentInput: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#374151',
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  commentInputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelCommentButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  cancelCommentText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'NotoSansJP-Regular',
  },
  submitCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  disabledSubmitButton: {
    backgroundColor: '#E5E7EB',
  },
  submitCommentText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'NotoSansJP-Medium',
    marginLeft: 4,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    color: '#6B7280',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    color: '#374151',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'NotoSansJP-Regular',
  },
  commentMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    fontFamily: 'NotoSansJP-Regular',
  },
  noCommentsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noCommentsText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 4,
  },
  noCommentsSubtext: {
    fontSize: 12,
    color: '#D1D5DB',
    fontFamily: 'NotoSansJP-Regular',
  },
  recentPraises: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  praiseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  praiseUsername: {
    fontSize: 12,
    color: '#FF6B9D',
    fontFamily: 'NotoSansJP-Medium',
    marginRight: 8,
  },
  praiseContent: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'NotoSansJP-Regular',
    flex: 1,
  },
});