# 🏁 Rev-Red Racing - Streaming Setup Guide

## 🎮 Rick Sanchez AI Racing Coach

Your AI coach is configured with Rick Sanchez's personality:
- **Chaotic genius racing commentary**
- **Dark humor and scientific explanations** 
- **Fourth-wall breaking moments**
- **Classic Rick phrases** ("Wubba lubba dub dub!", "Listen up, Morty!")
- **Racing-specific tips** with Rick's cynical genius personality

## 📺 Private Live Stream Setup

### Option 1: YouTube Private Stream
1. Go to YouTube Studio
2. Create a new live stream
3. Set visibility to "Private" or "Unlisted"
4. Copy the stream URL
5. Replace `YOUR_CHANNEL_ID` in `script.js` line 23

### Option 2: Twitch Private Stream
1. Go to Twitch Creator Dashboard
2. Start a new stream
3. Set to private (requires Twitch Affiliate/Partner)
4. Replace `YOUR_CHANNEL` in `script.js` line 26
5. Add `rev-red.netlify.app` to allowed domains

### Option 3: Custom RTMP Stream
1. Use OBS Studio or similar software
2. Configure RTMP settings
3. Replace `YOUR_CUSTOM_STREAM_URL` in `script.js` line 29

## 🔒 Security & Privacy

### Public Visitors Cannot:
- **Interfere with your stream** (read-only access)
- **Access stream controls** (private configuration)
- **See private stream details** (only you can connect)

### Stream Protection:
- **Private YouTube/Twitch streams** - only invited viewers
- **Domain restrictions** - only your site can embed
- **No public chat access** - controlled by streaming platform
- **Stream key protection** - never share your RTMP key

## 🛠️ Configuration

### Update Stream Settings:
Edit `script.js` lines 21-30:

```javascript
const streamOptions = {
    youtube: 'https://www.youtube.com/embed/live_stream?channel=YOUR_ACTUAL_CHANNEL_ID&autoplay=1',
    twitch: 'https://player.twitch.tv/?channel=YOUR_ACTUAL_CHANNEL&parent=rev-red.netlify.app&autoplay=true',
    custom: 'YOUR_ACTUAL_STREAM_URL'
};
```

### Change Default Platform:
Edit line 33:
```javascript
const streamUrl = streamOptions.youtube; // Change to 'twitch' or 'custom'
```

## 🎯 Features

### Stream Player:
- ✅ **Private connection** - only authorized access
- ✅ **Live duration timer** - tracks stream length
- ✅ **Dynamic viewer count** - simulates audience
- ✅ **Game title updates** - shows current game
- ✅ **Responsive design** - works on all devices

### Rick Sanchez AI Coach:
- ✅ **Racing-specific advice** - drift techniques, racing lines
- ✅ **Physics explanations** - scientific approach to gaming
- ✅ **Chaotic personality** - authentic Rick Sanchez behavior
- ✅ **Voice interaction** - microphone enabled
- ✅ **Context-aware** - responds to racing content

## 🚀 Quick Start

1. **Set up your private stream** on YouTube/Twitch/OBS
2. **Update the stream URL** in `script.js`
3. **Deploy the changes** to Netlify
4. **Click "CONNECT PRIVATE STREAM"** on your site
5. **Start streaming!** 🏁

## 📱 Mobile Support

The stream player works on:
- ✅ **Desktop browsers** - full experience
- ✅ **Mobile browsers** - responsive player
- ✅ **Tablets** - optimized viewing
- ✅ **Smart TVs** - casting supported

## 🔧 Troubleshooting

### Stream Won't Load:
- Check your stream URL is correct
- Ensure stream is live on your platform
- Verify domain permissions (Twitch)
- Clear browser cache

### AI Coach Not Working:
- Allow microphone permissions when prompted
- Check ElevenLabs agent ID is valid
- Ensure internet connection is stable
- Refresh the page if needed

### Mobile Issues:
- Use landscape orientation for best viewing
- Ensure stable internet connection
- Update browser to latest version
- Check mobile data permissions

---

**🏁 Ready to race? Your private streaming setup is complete!**
