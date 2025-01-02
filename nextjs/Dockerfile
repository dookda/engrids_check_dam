# ใช้ Node 18 (LTS)
FROM node:18-alpine

# กำหนดโฟลเดอร์ทำงานเป็น /app
WORKDIR /app

# copy package.json และไฟล์ lock (ถ้ามี)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# ติดตั้ง dependencies
RUN npm install

# copy ไฟล์ทั้งหมดเข้า container (ยกเว้นตาม .dockerignore)
COPY . .

# expose port 3000
EXPOSE 3000

# คำสั่ง default (ใน docker-compose เรารัน dev mode อยู่แล้ว)
CMD ["npm", "run", "dev"]
