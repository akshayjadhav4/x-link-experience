# XPreview

A React Native mobile app demonstrating X's (formerly Twitter) new link preview experience that allows users to engage with posts while browsing linked content.

## 🎥 Demo

https://github.com/user-attachments/assets/64a1043d-6d94-4bc4-be15-39b68eb4984d


## 📱 About

This project is inspired by X's experimental feature that addresses a common creator complaint: **posts with links tend to get lower reach because the web browser covers the post and people forget to like or reply.**

XPreview implements an interactive solution where:
- Posts collapse to the bottom of the screen as you scroll through linked content
- Users can still see and interact with the post while reading
- The tweet sheet expands and collapses dynamically based on scroll behavior
- X gets better engagement signals on link-containing posts

## ✨ Features

### 🔄 Dynamic Tweet Sheet
- **Three display modes:**
  - **Minimal (10%)** - Shows only user info when scrolling through content
  - **Compact (30%)** - Shows user info + truncated tweet content
  - **Full** - Complete tweet with all engagement options

### 📲 Smart Scroll Behavior
- Automatically collapses when scrolling down (after 100 threshold)
- Expands back when scrolling up significantly
- Smooth animations between states using React Native Reanimated

### 🌐 Integrated Web Browser
- Full WebView integration for reading linked content
- Real-time URL display in the collapsed header
- Native back/forward gesture support
- Seamless navigation experience
