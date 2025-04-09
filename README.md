# 📁 File Upload Status Tracker

## 📄 Q&A

### 🔧 What did you choose to mock the API and why?
I used a simple `simulateStartTask(taskId)` function with `setTimeout` to mimic an async API.


---

### 🤖 If you used an AI tool, what parts did it help with?
I used ChatGPT to:
- plan the structure of the app 
- help with markdown format for readme file
- also to quickly improve UI with tailwind

---
### 🚀 What would you improve or add with more time?
- i will add loading spinner or progress bar for `"processing"` tasks (might use library or use my own spinner UI)
- add drag-and-drop and multi-file upload support
- wanted to add React Query but ran out of time, i mainly use React Query in my project to handle API states for Restful API and Apollo for GraphQL

---

### 🧩 What was the trickiest part and how did you debug it?
- had some issues to work around pollStatus() as status of file upload wasn't working as it should 
- i solved it by putting different console.log to log states to see which one doesn't trigger correctly

