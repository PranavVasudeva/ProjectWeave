const SUPABASE_URL = "https://mwgxazqgdxsufjylzlzc.supabase.co";
const SUPABASE_KEY = "sb_publishable_TdbTVzxTR6qkIVZLlBnnBA_1C5pfO7-";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
const STORAGE_KEY="WEAVE_V1_STATE";
const clone=o=>JSON.parse(JSON.stringify(o));
let state=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")||clone(WEAVE_SEED);
let route="home";
let activeConversation=state.conversations?.[0]?.userId||2;

function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function userById(id){return id===state.currentUser.id?state.currentUser:state.people.find(p=>p.id===id)}
function initials(name){return name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}
function tags(items=[]){return items.map(x=>`<span class="pill">${escapeHtml(x)}</span>`).join("")}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}
function toast(message){const wrap=document.getElementById("toast-root");wrap.className="toast-wrap";const el=document.createElement("div");el.className="toast";el.textContent=message;wrap.appendChild(el);setTimeout(()=>el.remove(),2600)}
function go(next){route=next;render();window.scrollTo(0,0)}
function unreadCount(){return state.notifications.filter(n=>!n.read).length}
function connectionCount(){return state.people.filter(p=>p.status==="connected").length+state.currentUser.connections}
function layout(main){
   const navItems=[
  ["home","🏠","Home"],
  ["network","👥","My Network"],
  ["jobs","💼","Jobs"],
  ["messages","💬","Messaging"],
  ["ai","🤖","AI Assistant"],
  ["notifications","🔔","Notifications"],
  ["profile","👤","My Profile"]
];
  return `<header class="topbar"><div class="topbar-inner">
    <div class="logo">W</div>
    <input id="globalSearch" class="search" placeholder="Search people, jobs, posts..." onkeydown="globalSearch(event)">
    <nav class="top-actions">${navItems.map(([id,label])=>`<button class="${route===id?"active":""}" onclick="go('${id}')"><span>${label}</span> ${id==="notifications"&&unreadCount()?`🔴`:id==="messages"?"💬":""}</button>`).join("")}</nav>
    <button style="border:0;background:transparent" onclick="go('profile')"><div class="avatar">${initials(state.currentUser.name)}</div></button>
    <button class="btn secondary small" onclick="signOutUser()">
  Sign Out
</button>
  </div></header>
  <div class="shell"><aside class="left">${leftSidebar()}</aside><main>${main}</main><aside class="right">${rightSidebar()}</aside></div>`;
}
function leftSidebar(){
 const items=[["home","🏠","Home"],["network","👥","My Network"],["jobs","💼","Jobs & Opportunities"],["messages","💬","Messaging"],["notifications","🔔","Notifications"],["profile","👤","My Profile"]];
 return `<div class="card"><div class="cover"></div><div class="profile-card-body"><div class="avatar big">${initials(state.currentUser.name)}</div><h3>${escapeHtml(state.currentUser.name)}</h3><div class="muted">${escapeHtml(state.currentUser.headline)}</div><p class="muted">${escapeHtml(state.currentUser.college)} • ${escapeHtml(state.currentUser.location)}</p><div class="metric"><span>Connections</span><b>${connectionCount()}</b></div><div class="metric"><span>Profile views</span><b>${state.currentUser.profileViews}</b></div></div></div>
  <div class="card pad side-nav">${items.map(([id,icon,label])=>`<button class="${route===id?"active":""}" onclick="go('${id}')">${icon} &nbsp; ${label}</button>`).join("")}</div>`;
}
{
  function rightSidebar(){
  const news = [
  {
    icon: "🇮🇳",
    category: "INDIA • TECH",
    title: "India gets $511.5 million in FDI under new policy",
    text: "New investment proposals cover IT, AI, data centers and other sectors.",
    time: "1 day ago",
    url: "https://www.reuters.com/world/india/india-gets-5115-million-fdi-under-new-policy-neighbouring-countries-2026-08-21/"
  },
  {
    icon: "🤖",
    category: "AI & TECH",
    title: "AI reshapes India's IT services sector",
    text: "Indian IT companies are adapting contracts and hiring models as AI changes productivity.",
    time: "2 days ago",
    url: "https://www.reuters.com/world/india/ai-reshapes-indias-it-services-sector-contracts-clients-demand-more-less-2026-08-20/"
  },
  {
    icon: "💰",
    category: "STARTUPS",
    title: "Higgsfield raises $400M Series B",
    text: "The AI startup has seen its valuation rise sharply as investors continue backing AI companies.",
    time: "Today",
    url: "https://techcrunch.com/"
  },
  {
    icon: "🚀",
    category: "STARTUPS",
    title: "TechCrunch — Latest startup & AI news",
    text: "Explore the latest verified stories across startups, AI, funding and technology.",
    time: "LIVE",
    url: "https://techcrunch.com/latest/"
  }
];

  return `
    <div class="market-pulse-card">
      <div class="market-pulse-header">
        <div>
          <div class="market-pulse-title">⚡ Market Pulse</div>
          <div class="market-pulse-subtitle">What's happening in the market</div>
        </div>
        <span class="live-dot">● LIVE</span>
      </div>

      <div class="market-pulse-list">
        ${news.map(n => `
          <a
  class="market-news-item"
  href="${n.url}"
  target="_blank"
  rel="noopener noreferrer"
>
        
          <div class="market-news-top">
              <span class="market-news-icon">${n.icon}</span>
              <span class="market-news-category">${n.category}</span>
              <span class="market-news-time">${n.time}</span>
            </div>

            <div class="market-news-title">${n.title}</div>
            <div class="market-news-text">${n.text}</div>

            <div class="market-news-link">
              Why it matters →
            </div>
          </a>
        `).join("")}
      </div>

      <div class="market-pulse-footer">
        <span>↻ Updates every 5 minutes</span>
        <span>Today</span>
      </div>
    </div>
  `;
}
}
function personMini(p){
  return `<div class="person-row"><div class="avatar">${initials(p.name)}</div><div class="person-info"><h3>${escapeHtml(p.name)}</h3><div class="muted">${escapeHtml(p.headline)}</div><button class="btn outline small" onclick="connect(${p.id})">${p.status==="pending"?"Pending":"Connect"}</button></div></div>`;
}

function home(){
  return `<div class="hero"><h1>Build your network. Build your future.</h1><p>Connect with students, discover opportunities and find people to build with.</p></div>
  <div class="card pad"><div class="composer"><div class="avatar">${initials(state.currentUser.name)}</div><button class="composer-trigger" onclick="openPostModal()">Start a post</button></div>
  <div class="quick-actions"><button onclick="openPostModal()">📷 Photo</button><button onclick="openPostModal()">🎥 Video</button><button onclick="openPostModal()">📝 Article</button></div></div>
  <div class="feed-header"><h2>Your Feed</h2><select class="feed-filter" onchange="filterFeed(this.value)"><option value="all">All posts</option><option value="latest">Latest</option><option value="popular">Popular</option></select></div>
  <div id="feed">${renderPosts(state.posts)}</div>`;
}
function renderPosts(posts){
  if(!posts.length)return `<div class="card empty">No posts found.</div>`;
  return posts.map(p=>{
    const author=userById(p.authorId)||state.currentUser;
    return `<article class="card post">
      <div class="post-head"><div class="avatar">${initials(author.name)}</div><div><strong>${escapeHtml(author.name)}</strong><div class="muted">${escapeHtml(author.headline)}</div><div class="muted">${escapeHtml(p.time)} • 🌐</div></div></div>
      <div class="post-text">${escapeHtml(p.text)}</div>
      <div class="post-stats"><span>👍 ${p.likes} likes</span><span>${p.comments.length} comments</span></div>
      <div class="post-actions">
        <button class="${p.liked?"active":""}" onclick="toggleLike(${p.id})">👍 Like</button>
        <button onclick="focusComment(${p.id})">💬 Comment</button>
        <button onclick="sharePost()">↗ Share</button>
        <button class="${p.saved?"active":""}" onclick="toggleSave(${p.id})">🔖 Save</button>
      </div>
      <div id="comments-${p.id}">${p.comments.map(c=>`<div class="comment"><b>${escapeHtml(c.name)}</b><br>${escapeHtml(c.text)}</div>`).join("")}</div>
      <div class="comment-input"><input id="comment-input-${p.id}" placeholder="Add a comment..." onkeydown="commentKey(event,${p.id})"><button class="btn small" onclick="addComment(${p.id})">Post</button></div>
    </article>`;
  }).join("");
}
function filterFeed(mode){
  let posts=[...state.posts];
  if(mode==="latest")posts.sort((a,b)=>b.id-a.id);
  if(mode==="popular")posts.sort((a,b)=>b.likes-a.likes);
  document.getElementById("feed").innerHTML=renderPosts(posts);
}

function network(){
  const connected=state.people.filter(p=>p.status==="connected");
  const pending=state.people.filter(p=>p.status==="pending");
  const suggestions=state.people.filter(p=>p.status==="none");
  return `<div class="card pad"><h1 style="margin-top:0">My Network</h1><p class="muted">Grow your professional network and find students with complementary skills.</p>
    <input class="search" style="width:100%;margin:10px 0" placeholder="Search people by name or skill..." oninput="filterPeople(this.value)">
    <div id="people-list">${peopleSection("People you may know",suggestions)}${peopleSection("Pending",pending)}${peopleSection("Connected",connected)}</div>
  </div>`;
}
function peopleSection(title,list){
  if(!list.length)return "";
  return `<h2 style="font-size:16px;margin-top:20px">${title}</h2>${list.map(p=>`<div class="person-row"><div class="avatar">${initials(p.name)}</div><div class="person-info"><h3>${escapeHtml(p.name)}</h3><div class="muted">${escapeHtml(p.headline)} • ${escapeHtml(p.college)}</div><p>${tags(p.skills)}</p><button class="btn outline small" onclick="connect(${p.id})">${p.status==="pending"?"Accept":"Connect"}</button> <button class="btn secondary small" onclick="viewPerson(${p.id})">View profile</button></div></div>`).join("")}`;
}
function filterPeople(q){
  q=q.toLowerCase();
  const list=state.people.filter(p=>(p.name+" "+p.headline+" "+p.skills.join(" ")).toLowerCase().includes(q));
  document.getElementById("people-list").innerHTML=peopleSection("Search results",list);
}
function connect(id){
  const p=state.people.find(x=>x.id===id);
  if(!p)return;
  if(p.status==="pending"){p.status="connected";state.currentUser.connections++;state.notifications.unshift({id:Date.now(),text:`You are now connected with ${p.name}.`,read:false,time:"Just now"});toast(`Connected with ${p.name}`)}
  else if(p.status==="none"){p.status="pending";state.notifications.unshift({id:Date.now(),text:`Connection request sent to ${p.name}.`,read:false,time:"Just now"});toast(`Request sent to ${p.name}`)}
  save();render();
}
function viewPerson(id){const p=userById(id);openModal(`<div class="profile-hero"><div class="cover"></div><div class="profile-details"><div class="avatar big">${initials(p.name)}</div><h1>${escapeHtml(p.name)}</h1><h3>${escapeHtml(p.headline)}</h3><p class="muted">${escapeHtml(p.college)} • ${escapeHtml(p.branch||"")} • ${escapeHtml(p.year||"")} • ${escapeHtml(p.location||"")}</p><p>${tags(p.skills)}</p><p>${escapeHtml(p.about||"")}</p><button class="btn" onclick="closeModal();connect(${p.id})">${p.status==="connected"?"Connected":p.status==="pending"?"Accept":"Connect"}</button></div></div>`)}

function profile(){
    const user = state.currentUser;

    return `
    <div class="profile-page">

        <!-- PROFILE HERO -->
        <div class="card profile-hero-card">

            <div class="profile-cover">
                <div class="cover-glow"></div>
            </div>

            <div class="profile-main">

                <div class="profile-avatar-wrap">
                    <div class="avatar big profile-avatar">
                        ${initials(user.name)}
                    </div>
                    <span class="online-dot"></span>
                </div>

                <div class="profile-header-content">

                    <div class="profile-title-row">
                        <div>
                            <h1>${escapeHtml(user.name)}</h1>

                            <p class="profile-headline">
                                ${escapeHtml(user.headline)}
                            </p>

                            <p class="profile-location">
                                📍 KIIT • Bhubaneswar, India
                            </p>
                        </div>

                        <button class="btn profile-edit-btn"
                            onclick="editProfile()">
                            ✏️ Edit Profile
                        </button>
                    </div>

                    <div class="profile-stats">
                        <div>
                            <strong>${user.connections || 0}</strong>
                            <span>Connections</span>
                        </div>

                        <div>
                            <strong>${user.profileViews || 0}</strong>
                            <span>Profile Views</span>
                        </div>

                        <div>
                            <strong>${state.posts.filter(p => p.authorId === user.id).length}</strong>
                            <span>Posts</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <!-- ABOUT -->
        <div class="card profile-section-card">
            <div class="section-heading">
                <div>
                    <span class="section-icon">👋</span>
                    <h2>About</h2>
                </div>
            </div>

            <p class="profile-about">
                ${escapeHtml(user.about)}
            </p>
        </div>


        <!-- SKILLS -->
        <div class="card profile-section-card">
            <div class="section-heading">
                <div>
                    <span class="section-icon">⚡</span>
                    <h2>Skills</h2>
                </div>
            </div>

            <div class="profile-skills">
                ${user.skills.map(skill => `
                    <span class="skill-chip">
                        ${escapeHtml(skill)}
                    </span>
                `).join("")}
            </div>
        </div>


        <!-- PROFILE ANALYTICS -->
        <div class="card profile-section-card">

            <div class="section-heading">
                <div>
                    <span class="section-icon">📊</span>
                    <h2>Profile Analytics</h2>
                </div>

                <span class="muted">Your activity</span>
            </div>

            <div class="analytics-grid">

                <div class="analytics-box">
                    <div class="analytics-icon">👁️</div>
                    <div>
                        <strong>${user.profileViews || 0}</strong>
                        <span>Profile Views</span>
                    </div>
                </div>

                <div class="analytics-box">
                    <div class="analytics-icon">🤝</div>
                    <div>
                        <strong>${user.connections || 0}</strong>
                        <span>Connections</span>
                    </div>
                </div>

                <div class="analytics-box">
                    <div class="analytics-icon">📝</div>
                    <div>
                        <strong>${state.posts.filter(p => p.authorId === user.id).length}</strong>
                        <span>Your Posts</span>
                    </div>
                </div>

            </div>
        </div>


        <!-- PROFILE COMPLETION -->
        <div class="card profile-section-card">

            <div class="section-heading">
                <div>
                    <span class="section-icon">🚀</span>
                    <h2>Build your profile</h2>
                </div>
            </div>

            <p class="muted">
                Keep your profile updated to get better opportunities,
                connections and team matches.
            </p>

            <div class="profile-progress">
                <div class="progress-track">
                    <div class="progress-fill" style="width: 75%;"></div>
                </div>

                <span>75% Complete</span>
            </div>

        </div>

    </div>
    `;
}
function aiAssistant(){
  return `
    <div class="card pad ai-page">
      <div class="ai-header">
        <div>
          <h1>🤖 WEAVE AI</h1>
          <p class="muted">
            Your personal AI assistant for careers, skills, internships and startups.
          </p>
        </div>
      </div>

      <div id="aiMessages" class="ai-messages">
        <div class="ai-message ai-bot">
          <b>WEAVE AI</b>
          <p>
            Hey! 👋 I'm your WEAVE AI assistant.
            Ask me about internships, skills, projects, careers or startups.
          </p>
        </div>
      </div>

      <div class="ai-input-row">
        <input
          id="aiInput"
          class="search"
          placeholder="Ask WEAVE AI anything..."
          onkeydown="if(event.key==='Enter') sendAIMessage()"
        />
        <button class="btn" onclick="sendAIMessage()">Send ➤</button>
      </div>

      <div class="ai-suggestions">
        <button onclick="askAI('What skills should I learn for AI internships?')">
          💼 AI Internship Skills
        </button>

        <button onclick="askAI('Give me a roadmap to become a full stack developer.')">
          🚀 Full Stack Roadmap
        </button>

        <button onclick="askAI('What projects should I build as a first year student?')">
          💡 Project Ideas
        </button>
      </div>
    </div>
  `;
}
function jobs(){
  return `<div class="card pad"><h1 style="margin-top:0">Jobs & Opportunities</h1><p class="muted">Discover internships, projects and competitions matched to student skills.</p><input class="search" style="width:100%;margin:10px 0 12px" placeholder="Search jobs, companies or skills..." oninput="filterJobs(this.value)"><div id="jobs-list">${renderJobs(state.jobs)}</div></div>`;
}
function renderJobs(jobs){
  if(!jobs.length)return `<div class="empty">No opportunities found.</div>`;
  return jobs.map(j=>`<div class="job"><h3>${escapeHtml(j.title)}</h3><b>${escapeHtml(j.company)}</b><div class="job-meta">${escapeHtml(j.location)} • ${escapeHtml(j.type)} • Deadline ${escapeHtml(j.deadline)}</div><p>${tags(j.skills)}</p><button class="btn" onclick="applyJob(${j.id})">Apply</button> <button class="btn secondary" onclick="toast('Opportunity saved')">🔖 Save</button></div>`).join("");
}
function filterJobs(q){q=q.toLowerCase();document.getElementById("jobs-list").innerHTML=renderJobs(state.jobs.filter(j=>(j.title+" "+j.company+" "+j.skills.join(" ")).toLowerCase().includes(q)))}
function applyJob(id){const j=state.jobs.find(x=>x.id===id);state.notifications.unshift({id:Date.now(),text:`Application started for ${j.title} at ${j.company}.`,read:false,time:"Just now"});save();toast("Application flow started");}

function messages(){
  const c=state.conversations.find(x=>x.userId===activeConversation)||state.conversations[0];
  if(c)activeConversation=c.userId;
  const p=userById(activeConversation);
  const msgs=state.messages.filter(m=>m.from===1&&m.to===activeConversation||m.from===activeConversation&&m.to===1);
  return `<div class="card message-layout"><div class="conversation-list">${state.conversations.map(x=>{const u=userById(x.userId);return `<div class="conversation ${x.userId===activeConversation?"active":""}" onclick="openConversation(${x.userId})"><div style="display:flex;gap:9px"><div class="avatar">${initials(u.name)}</div><div><b>${escapeHtml(u.name)}</b><div class="muted">${escapeHtml(x.last)}</div>${x.unread?`<span class="pill">${x.unread} new</span>`:""}</div></div></div>`}).join("")}</div>
  <div class="chat"><div class="chat-head"><div class="avatar">${initials(p.name)}</div><div><b>${escapeHtml(p.name)}</b><div class="muted">${escapeHtml(p.headline)}</div></div></div>
  <div class="chat-body">${msgs.map(m=>`<div class="bubble ${m.from===1?"me":""}">${escapeHtml(m.text)}<div class="muted" style="margin-top:4px">${escapeHtml(m.time||"")}</div></div>`).join("")||`<div class="empty">Start a conversation.</div>`}</div>
  <div class="chat-compose"><input id="messageInput" placeholder="Write a message..." onkeydown="messageKey(event)"><button class="btn" onclick="sendMessage()">Send</button></div></div></div>`;
}
function openConversation(id){activeConversation=id;const c=state.conversations.find(x=>x.userId===id);if(c)c.unread=0;save();render()}
async function sendAIMessage(){

  const input = document.getElementById("aiInput");
  const message = input.value.trim();

  if(!message) return;

  const messages = document.getElementById("aiMessages");

  messages.innerHTML += `
    <div class="ai-message ai-user">
      <b>You</b>
      <p>${escapeHtml(message)}</p>
    </div>
  `;

  input.value = "";

  messages.innerHTML += `
    <div id="aiThinking" class="ai-message ai-bot">
      <b>WEAVE AI</b>
      <p>Thinking... 🤔</p>
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;

  try{

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    document.getElementById("aiThinking")?.remove();

    messages.innerHTML += `
      <div class="ai-message ai-bot">
        <b>WEAVE AI</b>
        <p>${escapeHtml(data.reply || "I couldn't generate a response.")}</p>
      </div>
    `;

  }catch(error){

    document.getElementById("aiThinking")?.remove();

    messages.innerHTML += `
      <div class="ai-message ai-bot">
        <b>WEAVE AI</b>
        <p>⚠️ Something went wrong. Please try again.</p>
      </div>
    `;
  }

  messages.scrollTop = messages.scrollHeight;
}
function sendMessage() {
    const input = document.getElementById("messageInput");

    if (!input) {
        console.error("Message input not found");
        return;
    }

    const text = input.value.trim();

    if (!text) return;

    if (!activeConversation) {
        console.error("No active conversation selected");
        return;
    }

    // Make sure messages array exists
    if (!Array.isArray(state.messages)) {
        state.messages = [];
    }

    // Create the new message
    const newMessage = {
        id: Date.now(),
        from: 1,
        to: activeConversation,
        text: text,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    // Add message
    state.messages.push(newMessage);

    // Clear input
    input.value = "";

    // Re-render messaging page
    render();

    // Put cursor back in input
    setTimeout(() => {
        const newInput = document.getElementById("messageInput");
        if (newInput) {
            newInput.focus();
        }
    }, 50);
}

function askAI(question){
  const input = document.getElementById("aiInput");

  if(input){
    input.value = question;
    sendAIMessage();
  }
}
function notifications(){
  return `<div class="card"><div class="pad" style="display:flex;justify-content:space-between;align-items:center"><div><h1 style="margin:0">Notifications</h1><p class="muted">${unreadCount()} unread</p></div><button class="btn secondary" onclick="markAllRead()">Mark all as read</button></div>${state.notifications.map(n=>`<div class="notification ${n.read?"":"unread"}"><div class="avatar">🔔</div><div style="flex:1"><div>${escapeHtml(n.text)}</div><div class="muted">${escapeHtml(n.time||"")}</div></div></div>`).join("")||`<div class="empty">You're all caught up.</div>`}</div>`;
}
function markAllRead(){state.notifications.forEach(n=>n.read=true);save();render();toast("All notifications marked as read")}

function openPostModal(){
  openModal(`<h2>Create a post</h2><p class="muted">Share an update, project, achievement or useful knowledge with your network.</p><textarea id="postText" rows="7" placeholder="What do you want to talk about?"></textarea><div class="modal-actions"><button class="btn secondary" onclick="closeModal()">Cancel</button><button class="btn" onclick="createPost()">Post</button></div>`);
}
function createPost(){
  const text=document.getElementById("postText").value.trim();if(!text)return toast("Write something first");
  state.posts.unshift({id:Date.now(),authorId:1,text,likes:0,liked:false,saved:false,comments:[],time:"Just now"});save();closeModal();render();toast("Post published");
}
function toggleLike(id){const p=state.posts.find(x=>x.id===id);if(p.liked){p.likes--;p.liked=false}else{p.likes++;p.liked=true}save();render()}
function toggleSave(id){const p=state.posts.find(x=>x.id===id);p.saved=!p.saved;save();toast(p.saved?"Post saved":"Post removed from saved")}
function sharePost(){navigator.clipboard?.writeText(location.href);toast("Post link copied")}
function focusComment(id){document.getElementById(`comment-input-${id}`)?.focus()}
function commentKey(e,id){if(e.key==="Enter")addComment(id)}
function addComment(id){const input=document.getElementById(`comment-input-${id}`);const text=input.value.trim();if(!text)return;const p=state.posts.find(x=>x.id===id);p.comments.push({name:state.currentUser.name,text});save();render();toast("Comment added")}

function editProfile(){
    openModal(`
        <div class="profile-edit-modal">
            <h2>Edit Profile</h2>
            <p class="muted">Update your professional information</p>

            <label>Professional Headline</label>
            <input 
                id="editHeadline" 
                value="${escapeHtml(state.currentUser.headline)}"
                placeholder="e.g. B.Tech Student • AI Enthusiast"
            >

            <label>About</label>
            <textarea 
                id="editAbout" 
                rows="5"
                placeholder="Tell people about yourself..."
            >${escapeHtml(state.currentUser.about)}</textarea>

            <label>Skills</label>
            <input 
                id="editSkills"
                value="${escapeHtml(state.currentUser.skills.join(", "))}"
                placeholder="Python, C++, Web Development, AI"
            >

            <div class="modal-actions">
                <button class="btn secondary" onclick="closeModal()">
                    Cancel
                </button>

                <button class="btn" onclick="saveProfile()">
                    Save Profile
                </button>
            </div>
        </div>
    `);
}
function saveProfile(){
  state.currentUser.headline=document.getElementById("editHeadline").value.trim()||state.currentUser.headline;
  state.currentUser.about=document.getElementById("editAbout").value.trim();
  state.currentUser.skills=document.getElementById("editSkills").value.split(",").map(x=>x.trim()).filter(Boolean);
  save();closeModal();render();toast("Profile updated");
}

function globalSearch(e){
  if(e.key!=="Enter")return;
  const q=e.target.value.trim().toLowerCase();if(!q)return;
  const people=state.people.filter(p=>(p.name+" "+p.headline+" "+p.skills.join(" ")).toLowerCase().includes(q));
  const jobsFound=state.jobs.filter(j=>(j.title+" "+j.company+" "+j.skills.join(" ")).toLowerCase().includes(q));
  const posts=state.posts.filter(p=>p.text.toLowerCase().includes(q));
  openModal(`<h2>Search results</h2><h3>People (${people.length})</h3>${people.map(p=>personMini(p)).join("")||`<p class="muted">None</p>`}<h3>Jobs (${jobsFound.length})</h3>${renderJobs(jobsFound)}<h3>Posts (${posts.length})</h3>${posts.map(p=>`<p>${escapeHtml(p.text)}</p>`).join("")||`<p class="muted">None</p>`}`);
}

function openModal(html){document.body.insertAdjacentHTML("beforeend",`<div class="modal" id="modal"><div class="modal-box">${html}</div></div>`)}
function closeModal(){document.getElementById("modal")?.remove()}

function render(){
  let main=home();
  if(route==="network")main=network();
  if(route==="jobs")main=jobs();
  if(route==="messages")main=messages();
  if(route==="notifications")main=notifications();
  if(route==="profile")main=profile();
  document.getElementById("app").innerHTML=layout(main);
}
/* =========================
   WEAVE AI ASSISTANT
========================= */

function openAIAssistant() {
  if (document.getElementById("ai-modal")) return;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal" id="ai-modal">
      <div class="modal-box ai-modal-box">

        <div class="ai-header">
          <div>
            <div class="ai-title">✦ WEAVE AI</div>
            <div class="muted">Your student & career copilot</div>
          </div>

          <button class="icon-btn" onclick="closeAIAssistant()">✕</button>
        </div>

        <div class="ai-suggestions">
          <button onclick="useAISuggestion('How can I improve my resume?')">
            📄 Improve my resume
          </button>

          <button onclick="useAISuggestion('Find skills I should learn for AI internships')">
            🚀 Career advice
          </button>

          <button onclick="useAISuggestion('Give me ideas for a student startup')">
            💡 Startup ideas
          </button>

          <button onclick="useAISuggestion('Help me prepare for a hackathon')">
            🏆 Hackathon help
          </button>
        </div>

        <div id="ai-chat" class="ai-chat">
          <div class="ai-message">
            <div class="ai-avatar">✦</div>
            <div class="ai-bubble">
              Hey ${escapeHtml(state.currentUser.name.split(" ")[0])}! 👋
              <br><br>
              I'm your WEAVE AI assistant. I can help you with
              careers, projects, networking, internships, startups,
              hackathons and more.
              <br><br>
              What are we building today?
            </div>
          </div>
        </div>

        <div class="ai-input-area">
          <input
            id="ai-input"
            placeholder="Ask WEAVE AI anything..."
            onkeydown="aiInputKey(event)"
          />

          <button class="btn ai-send" onclick="sendAIMessage()">
            Send ↑
          </button>
        </div>

      </div>
    </div>
  `);

  document.getElementById("ai-input").focus();
}

function closeAIAssistant() {
  document.getElementById("ai-modal")?.remove();
}

function aiInputKey(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendAIMessage();
  }
}

function useAISuggestion(text) {
  const input = document.getElementById("ai-input");
  if (!input) return;

  input.value = text;
  input.focus();
}
function addAIMessage(text, type = "ai") {
    const chat = document.getElementById("ai-chat");

    if (!chat) {
        console.error("AI chat container not found");
        return;
    }

    const message = document.createElement("div");

    message.className = `ai-message ${type}`;

    message.innerHTML = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

    return message;
}
async function sendAIMessage() {
  const input = document.getElementById("ai-input");

  if (!input) return;

  const text = input.value.trim();

  if (!text) return;

  // Show user's message
  addAIMessage(text, "user");

  // Clear input
  input.value = "";

  // Show temporary loading message
  addAIMessage("WEAVE AI is thinking... 🤖", "ai");

  try {
    const response = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    // Remove the loading message
    const chat = document.getElementById("ai-chat");

    if (chat && chat.lastElementChild) {
      chat.removeChild(chat.lastElementChild);
    }

    // Show real AI response
    addAIMessage(data.reply, "ai");

  } catch (error) {
    console.error("WEAVE AI Error:", error);

    // Remove loading message
    const chat = document.getElementById("ai-chat");

    if (chat && chat.lastElementChild) {
      chat.removeChild(chat.lastElementChild);
    }

    addAIMessage(
      "Sorry, I couldn't connect to WEAVE AI right now. Please try again. ⚠️",
      "ai"
    );
  }
}

function aiAssistant(){

  return `
    <div class="card ai-page">

      <div class="ai-header">
        <div class="ai-avatar">🤖</div>

        <div>
          <h1>WEAVE AI</h1>
          <p class="muted">
            Your AI-powered student & career assistant
          </p>
        </div>
      </div>

      <div id="ai-chat" class="ai-chat">

        <div class="ai-message">
          <div class="ai-avatar small">🤖</div>

          <div class="ai-bubble">
            <strong>Hi! I'm WEAVE AI 👋</strong>
            <br><br>

            I can help you with:
            <ul>
              <li>🎓 College & academic guidance</li>
              <li>💼 Internships & jobs</li>
              <li>🚀 Projects & startups</li>
              <li>🧠 Skills & learning roadmaps</li>
              <li>🤝 Networking suggestions</li>
              <li>📈 Career advice</li>
            </ul>

            What would you like help with?
          </div>
        </div>

      </div>

      <div class="ai-input-area">

        <input
          id="ai-input"
          type="text"
          placeholder="Ask WEAVE AI anything..."
          onkeydown="if(event.key==='Enter') sendAIMessage()"
        >

        <button
          class="btn"
          onclick="sendAIMessage()">
          Send ➤
        </button>

      </div>

    </div>
  `;
}
function render(){
  let main=home();

  if(route==="network")main=network();
  if(route==="jobs")main=jobs();
  if(route==="messages")main=messages();
  if(route==="ai")main=aiAssistant();
  if(route==="notifications")main=notifications();
  if(route==="profile")main=profile();


  document.getElementById("app").innerHTML=layout(main);
}
initApp();
// ===============================
// WEAVE SUPABASE AUTH
// ===============================

function authScreen() {
  return `
    <div class="auth-page">
      <div class="auth-card">

        <div class="auth-logo">W</div>

        <h1>Welcome to WEAVE</h1>
        <p class="auth-subtitle">
          Build your network. Build your future.
        </p>

        <div class="auth-tabs">
          <button id="loginTab" class="auth-tab active">
            Login
          </button>
          <button id="signupTab" class="auth-tab">
            Create account
          </button>
        </div>

        <form id="authForm">

          <div id="nameField" class="auth-field hidden">
            <label>Full name</label>
            <input
              id="authName"
              type="text"
              placeholder="Pranav Vasudeva"
            />
          </div>

          <div class="auth-field">
            <label>Email</label>
            <input
              id="authEmail"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="auth-field">
            <label>Password</label>
            <input
              id="authPassword"
              type="password"
              placeholder="••••••••"
              required
              minlength="6"
            />
          </div>

          <button class="auth-submit" type="submit">
            Login to WEAVE
          </button>

          <div id="authMessage" class="auth-message"></div>

        </form>

        <p class="auth-footer">
          Connect. Collaborate. Grow.
        </p>

      </div>
    </div>
  `;
}


async function loginUser(email, password) {
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

  if (error) {
    console.error("SUPABASE LOGIN ERROR:", error);
    throw new Error(error.message);
  }

  if (!data.session) {
    throw new Error("Login failed. No active session found.");
  }

  console.log("LOGIN SUCCESS:", data.user);
  console.log("SESSION:", data.session);

  return data.user;
}


async function signupUser(name, email, password) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: name.trim()
        }
      }
    });

    if (error) {
      console.error("SUPABASE SIGNUP ERROR:", error);
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Account could not be created.");
    }

    console.log("SUPABASE USER CREATED:", data.user);

    // Create profile record in public.profiles
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert({
        id: data.user.id,
        full_name: name.trim(),
        email: email.trim()
      });

    if (profileError) {
      console.error("PROFILE INSERT ERROR:", profileError);
      throw new Error(profileError.message);
    }

    return data.user;

  } catch (error) {
    console.error("SIGNUP FAILED:", error);
    throw error;
  }

  if (error) throw error;

  return data.user;
}


async function initApp() {
  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      console.error("LOAD FAILED:", error);
      document.getElementById("app").innerHTML = authScreen();
      setupAuth();
      return;
    }

    if (!data || !data.session) {
      document.getElementById("app").innerHTML = authScreen();
      setupAuth();
      return;
    }

    render();

  } catch (error) {
    console.error("LOAD FAILED:", error);

    document.getElementById("app").innerHTML = authScreen();
    setupAuth();
  }
}


function setupAuth() {

  let signupMode = false;

  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const nameField = document.getElementById("nameField");
  const submitBtn = document.querySelector(".auth-submit");
  const form = document.getElementById("authForm");
  const message = document.getElementById("authMessage");

  loginTab.onclick = () => {

    signupMode = false;

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    nameField.classList.add("hidden");

    submitBtn.textContent = "Login to WEAVE";
  };


  signupTab.onclick = () => {

    signupMode = true;

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    nameField.classList.remove("hidden");

    submitBtn.textContent = "Create WEAVE account";
  };


  form.onsubmit = async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("authEmail").value.trim();

    const password =
      document.getElementById("authPassword").value;

    const name =
      document.getElementById("authName").value.trim();

    message.textContent = "Please wait...";

    try {

      if (signupMode) {

        if (!name) {
          throw new Error("Please enter your full name.");
        }

        await signupUser(name, email, password);

        message.textContent =
          "Account created! Check your email to verify your account.";

      } else {
  const user = await loginUser(email, password);

  console.log("Logged in user:", user);

  message.textContent = "Login successful!";

  // Give Supabase a moment to persist the session
  setTimeout(async () => {
    const { data: { session } } =
      await supabaseClient.auth.getSession();

    if (session) {
      document.getElementById("app").innerHTML = "";
      render();
    } else {
      message.textContent = "Login failed: session not found.";
    }
  }, 300);
}

    } catch (error) {

      console.error(error);

      message.textContent =
        error.message || "Something went wrong.";

    }
  };
}
async function signOutUser() {
  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      throw error;
    }

    localStorage.removeItem(STORAGE_KEY);

    document.getElementById("app").innerHTML = authScreen();
    setupAuth();

    console.log("Signed out successfully");
  } catch (error) {
    console.error("SIGNOUT ERROR:", error);
    alert("Unable to sign out. Please try again.");
  }
}