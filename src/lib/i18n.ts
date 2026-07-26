export type Language = "vi" | "en";

export const translations = {
  vi: {
    nav: {
      about: "Giới thiệu",
      activities: "Lĩnh vực",
      audience: "Đối tượng",
      featured: "Hoạt động",
      projects: "Dự án",
      process: "Quy trình",
      faq: "Hỏi đáp",
      join: "Đăng ký tham gia",
    },
    hero: {
      badge: "Phòng thí nghiệm STEM",
      title: "CLB STEM-AI-ROBOTIC",
      subtitle: "Nơi khoa học gặp sáng tạo",
      description:
        "CLB STEM-AI-ROBOTIC dành cho những bạn trẻ đam mê công nghệ, khoa học và sáng tạo. Cùng nhau khám phá, thử nghiệm và biến ý tưởng thành sản phẩm thực tế.",
      ctaPrimary: "Đăng ký tham gia",
      ctaSecondary: "Khám phá hoạt động",
      stats: {
        members: "Thành viên",
        projects: "Dự án",
        areas: "Lĩnh vực",
        events: "Sự kiện",
      },
    },
    about: {
      title: "CLB STEM-AI-ROBOTIC là gì?",
      subtitle: "Về chúng tôi",
      description:
        "CLB STEM-AI-ROBOTIC là môi trường học tập và sáng tạo, nơi học sinh được tự do khám phá khoa học, công nghệ, kỹ thuật và toán học thông qua các dự án thực tế.",
      cards: [
        {
          title: "Học qua thực hành",
          desc: "Không chỉ lý thuyết, thành viên được trực tiếp xây dựng, lắp ráp và lập trình các sản phẩm STEM của riêng mình.",
        },
        {
          title: "Phát triển tư duy",
          desc: "Rèn luyện tư duy phản biện, giải quyết vấn đề và làm việc nhóm — những kỹ năng cần thiết cho tương lai.",
        },
        {
          title: "Kết nối cộng đồng",
          desc: "Gặp gỡ những người bạn cùng đam mê, được mentor hướng dẫn và tham gia các cuộc thi, sự kiện lớn.",
        },
      ],
    },
    activities: {
      title: "Các lĩnh vực hoạt động",
      subtitle: "Chúng tôi làm gì",
      description:
        "Bảy lĩnh vực cốt lõi giúp bạn khám phá đam mê và phát triển kỹ năng công nghệ.",
      items: [
        { title: "Rô-bốt", desc: "Thiết kế, lắp ráp và lập trình robot tự động." },
        { title: "Trí tuệ nhân tạo", desc: "Khám phá học máy và ứng dụng trí tuệ nhân tạo." },
        { title: "Lập trình", desc: "Học lập trình từ cơ bản đến xây dựng ứng dụng thực tế." },
        { title: "Kết nối vạn vật", desc: "Kết nối vạn vật, xây dựng hệ thống thông minh." },
        { title: "Khoa học ứng dụng", desc: "Thí nghiệm và nghiên cứu khoa học thực tiễn." },
        { title: "Thiết kế sản phẩm", desc: "Từ ý tưởng đến sản phẩm hoàn chỉnh." },
        { title: "Dự án sáng tạo", desc: "Biến ý tưởng đột phá thành hiện thực." },
      ],
    },
    audience: {
      title: "CLB chào đón Học sinh, Giáo viên và phụ huynh cùng tham gia",
      subtitle: "Đối tượng",
      description: "",
      tabs: {
        students: {
          label: "Học sinh",
          title: "Dành cho học sinh",
          points: [
            "Học kỹ năng công nghệ thực tế, ứng dụng ngay vào cuộc sống",
            "Tham gia dự án nhóm, xây dựng portfolio cá nhân ấn tượng",
            "Được mentor và anh chị khóa trên hướng dẫn tận tình",
            "Cơ hội tranh tài tại các cuộc thi STEM trong và ngoài trường",
          ],
        },
        teachers: {
          label: "Giáo viên",
          title: "Dành cho giáo viên",
          points: [
            "Đồng hành cùng học sinh trong hành trình sáng tạo",
            "Chia sẻ kiến thức chuyên môn, dẫn dắt các buổi workshop",
            "Xây dựng phương pháp giảng dạy STEM hiện đại, hiệu quả",
            "Kết nối với cộng đồng giáo dục STEM năng động",
          ],
        },
        parents: {
          label: "Phụ huynh",
          title: "Dành cho phụ huynh",
          points: [
            "Theo dõi hành trình phát triển của con qua các hoạt động",
            "Yên tâm về môi trường học tập an toàn, lành mạnh",
            "Cùng con khám phá và định hướng nghề nghiệp tương lai",
            "Nhận cập nhật thường xuyên về tiến độ và thành tích",
          ],
        },
      },
    },
    featured: {
      title: "Hoạt động nổi bật",
      subtitle: "Trải nghiệm",
      description: "Những hoạt động đa dạng giúp bạn phát triển toàn diện.",
      items: [
        { title: "Hội thảo thực hành", desc: "Các buổi học thực hành chuyên sâu theo chủ đề." },
        { title: "Cuộc thi", desc: "Tranh tài, thử thách bản thân ở nhiều cấp độ." },
        { title: "Dự án nhóm", desc: "Hợp tác xây dựng sản phẩm STEM hoàn chỉnh." },
        { title: "Đào tạo kỹ năng", desc: "Rèn luyện kỹ năng mềm và kỹ năng chuyên môn." },
        { title: "Trưng bày sản phẩm", desc: "Giới thiệu thành quả tới cộng đồng." },
        { title: "Cố vấn", desc: "Được cố vấn định hướng bởi người có kinh nghiệm." },
      ],
    },
    projects: {
      title: "Dự án tiêu biểu",
      subtitle: "Sản phẩm",
      description: "Một số dự án STEM nổi bật do thành viên thực hiện.",
      placeholder: "Sắp ra mắt",
      items: [
        {
          title: "Rô-bốt tránh vật cản",
          category: "Rô-bốt",
          desc: "Robot tự động điều hướng, phát hiện và né tránh chướng ngại vật bằng cảm biến.",
        },
        {
          title: "Nhà thông minh",
          category: "Kết nối vạn vật",
          desc: "Mô hình nhà điều khiển từ xa: đèn, cửa, nhiệt độ qua ứng dụng di động.",
        },
        {
          title: "Trợ lý học tập thông minh",
          category: "Trí tuệ nhân tạo",
          desc: "Ứng dụng dùng AI gợi ý lộ trình học và giải đáp thắc mắc cho học sinh.",
        },
        {
          title: "Dự án môi trường",
          category: "Khoa học",
          desc: "Hệ thống giám sát chất lượng không khí và cảnh báo ô nhiễm thời gian thực.",
        },
      ],
    },
    process: {
      title: "Quy trình tham gia",
      subtitle: "Bắt đầu như thế nào",
      description: "Sáu bước đơn giản để trở thành thành viên chính thức.",
      steps: [
        { title: "Tìm hiểu CLB", desc: "Khám phá các lĩnh vực và hoạt động của CLB." },
        { title: "Điền form đăng ký", desc: "Cung cấp thông tin cơ bản của bạn." },
        { title: "Chọn mảng quan tâm", desc: "Lựa chọn lĩnh vực bạn muốn theo đuổi." },
        { title: "Buổi định hướng", desc: "Tham gia buổi gặp gỡ và làm quen." },
        { title: "Vào nhóm dự án", desc: "Bắt đầu làm việc cùng team của bạn." },
        { title: "Trình bày sản phẩm", desc: "Giới thiệu thành quả tới cộng đồng." },
      ],
    },
    registration: {
      title: "Đăng ký tham gia",
      subtitle: "Gia nhập ngay",
      description: "Điền thông tin bên dưới, chúng tôi sẽ liên hệ với bạn sớm nhất.",
      fields: {
        name: "Họ và tên",
        role: "Bạn là",
        roleOptions: { student: "Học sinh", teacher: "Giáo viên", parent: "Phụ huynh" },
        interestOptions: ["Rô-bốt", "Trí tuệ nhân tạo", "Lập trình", "Kết nối vạn vật", "Khoa học ứng dụng", "Thiết kế sản phẩm", "Dự án sáng tạo"],
        class: "Lớp / Đơn vị",
        email: "Thư điện tử",
        phone: "Số điện thoại",
        interest: "Mảng quan tâm",
        experience: "Kinh nghiệm hiện tại",
        reason: "Lý do muốn tham gia",
        submit: "Gửi đăng ký",
        submitting: "Đang gửi...",
      },
      placeholders: {
        name: "Nguyễn Văn A",
        class: "VD: 10A1 hoặc Tổ Vật lý",
        email: "email@vidu.com",
        phone: "0123 456 789",
        experience: "Mô tả ngắn gọn kinh nghiệm của bạn (nếu có)",
        reason: "Chia sẻ điều khiến bạn muốn tham gia CLB...",
        interest: "Chọn mảng bạn quan tâm",
      },
      success: {
        title: "Đăng ký thành công!",
        desc: "Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.",
        again: "Đăng ký người khác",
      },
      required: "Bắt buộc",
      errors: {
        name: "Vui lòng nhập họ tên",
        email: "Email không hợp lệ",
        role: "Vui lòng chọn vai trò",
        interest: "Vui lòng chọn mảng quan tâm",
      },
      pitch: {
        status: "Đang tuyển thành viên mới",
        points: [
          "Miễn phí 100% — không cần kinh nghiệm",
          "Phản hồi trong 3–5 ngày làm việc",
          "Chọn tối đa 2 mảng chính",
        ],
      },
    },
    faq: {
      title: "Câu hỏi thường gặp",
      subtitle: "Hỏi & Đáp",
      description: "Những thắc mắc phổ biến về CLB STEM-AI-ROBOTIC.",
      more: "Vẫn còn thắc mắc?",
      moreDesc: "Đừng ngại liên hệ với chúng tôi qua email bên dưới.",
    },
    footer: {
      description:
        "CLB STEM-AI-ROBOTIC — Nơi ươm mầm những nhà sáng tạo tương lai. Khoa học, công nghệ và sáng tạo trong tầm tay bạn.",
      school: "Trường [Tên Trường]",
      quickLinks: "Liên kết nhanh",
      contact: "Liên hệ",
      follow: "Theo dõi",
      email: "stemclub@vidu.com",
      rights: "Bản quyền thuộc về CLB STEM-AI-ROBOTIC.",
      madeWith: "Xây dựng với đam mê khoa học",
    },
  },
  en: {
    nav: {
      about: "About",
      activities: "Areas",
      audience: "Who",
      featured: "Activities",
      projects: "Projects",
      process: "Process",
      faq: "FAQ",
      join: "Join Now",
    },
    hero: {
      badge: "STEM Innovation Lab",
      title: "CLB STEM-AI-ROBOTIC",
      subtitle: "Where Science Meets Creativity",
      description:
        "CLB STEM-AI-ROBOTIC is for young minds passionate about technology, science, and creativity. Explore, experiment, and turn ideas into real products together.",
      ctaPrimary: "Join the Club",
      ctaSecondary: "Explore Activities",
      stats: {
        members: "Members",
        projects: "Projects",
        areas: "Areas",
        events: "Events",
      },
    },
    about: {
      title: "What is CLB STEM-AI-ROBOTIC?",
      subtitle: "About Us",
      description:
        "CLB STEM-AI-ROBOTIC is a learning and creative environment where students freely explore science, technology, engineering, and math through hands-on projects.",
      cards: [
        {
          title: "Learn by Doing",
          desc: "Beyond theory, members directly build, assemble, and program their own STEM products.",
        },
        {
          title: "Develop Thinking",
          desc: "Cultivate critical thinking, problem-solving, and teamwork — essential skills for the future.",
        },
        {
          title: "Connect Community",
          desc: "Meet like-minded friends, get mentored, and join major competitions and events.",
        },
      ],
    },
    activities: {
      title: "Activity Areas",
      subtitle: "What We Do",
      description:
        "Seven core areas to help you discover your passion and develop tech skills.",
      items: [
        { title: "Robotics", desc: "Design, build, and program autonomous robots." },
        { title: "Artificial Intelligence", desc: "Explore machine learning and AI applications." },
        { title: "Programming", desc: "Learn to code from basics to real applications." },
        { title: "IoT", desc: "Connect devices and build smart systems." },
        { title: "Applied Science", desc: "Experiment and conduct practical research." },
        { title: "Product Design", desc: "From idea to finished product." },
        { title: "Creative Projects", desc: "Turn breakthrough ideas into reality." },
      ],
    },
    audience: {
      title: "For Everyone",
      subtitle: "Who It's For",
      description: "The club welcomes students, teachers, and parents alike.",
      tabs: {
        students: {
          label: "Students",
          title: "For Students",
          points: [
            "Learn practical tech skills applicable to real life",
            "Join team projects and build an impressive personal portfolio",
            "Get dedicated guidance from mentors and seniors",
            "Compete at STEM contests within and beyond school",
          ],
        },
        teachers: {
          label: "Teachers",
          title: "For Teachers",
          points: [
            "Accompany students on their creative journey",
            "Share expertise and lead engaging workshops",
            "Build modern, effective STEM teaching methods",
            "Connect with a dynamic STEM education community",
          ],
        },
        parents: {
          label: "Parents",
          title: "For Parents",
          points: [
            "Follow your child's growth through activities",
            "Rest assured with a safe, healthy learning environment",
            "Explore and guide your child's future career together",
            "Receive regular updates on progress and achievements",
          ],
        },
      },
    },
    featured: {
      title: "Featured Activities",
      subtitle: "Experience",
      description: "Diverse activities to help you grow comprehensively.",
      items: [
        { title: "Workshops", desc: "In-depth hands-on sessions by topic." },
        { title: "Competitions", desc: "Compete and challenge yourself at all levels." },
        { title: "Team Projects", desc: "Collaborate to build complete STEM products." },
        { title: "Skill Training", desc: "Develop soft and technical skills." },
        { title: "Product Showcase", desc: "Present your work to the community." },
        { title: "Mentoring", desc: "Get guidance from experienced advisors." },
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Products",
      description: "Some outstanding STEM projects by our members.",
      placeholder: "Coming Soon",
      items: [
        {
          title: "Obstacle-Avoiding Robot",
          category: "Robotics",
          desc: "An autonomous robot that navigates and avoids obstacles using sensors.",
        },
        {
          title: "IoT Smart Home",
          category: "IoT",
          desc: "A remote-controlled home model: lights, doors, temperature via mobile app.",
        },
        {
          title: "AI Learning Assistant",
          category: "AI",
          desc: "An app using AI to suggest learning paths and answer student questions.",
        },
        {
          title: "Environmental Project",
          category: "Science",
          desc: "A real-time air quality monitoring and pollution alert system.",
        },
      ],
    },
    process: {
      title: "How to Join",
      subtitle: "Getting Started",
      description: "Six simple steps to become an official member.",
      steps: [
        { title: "Learn About Us", desc: "Explore the club's areas and activities." },
        { title: "Fill the Form", desc: "Provide your basic information." },
        { title: "Choose an Area", desc: "Select the field you want to pursue." },
        { title: "Orientation", desc: "Attend a meet-and-greet session." },
        { title: "Join a Team", desc: "Start working with your team." },
        { title: "Present Your Work", desc: "Showcase your results to the community." },
      ],
    },
    registration: {
      title: "Register to Join",
      subtitle: "Join Now",
      description: "Fill in the form below and we'll get back to you soon.",
      fields: {
        name: "Full Name",
        role: "You are a",
        roleOptions: { student: "Student", teacher: "Teacher", parent: "Parent" },
        interestOptions: ["Robotics", "Artificial Intelligence", "Programming", "IoT", "Applied Science", "Product Design", "Creative Projects"],
        class: "Class / Unit",
        email: "Email",
        phone: "Phone Number",
        interest: "Area of Interest",
        experience: "Current Experience",
        reason: "Why You Want to Join",
        submit: "Submit",
        submitting: "Submitting...",
      },
      placeholders: {
        name: "John Doe",
        class: "e.g. Grade 10A1 or Physics Dept.",
        email: "email@example.com",
        phone: "0123 456 789",
        experience: "Briefly describe your experience (if any)",
        reason: "Share what makes you want to join the club...",
        interest: "Select your area of interest",
      },
      success: {
        title: "Registration Successful!",
        desc: "Thank you for registering. We'll contact you as soon as possible.",
        again: "Register Another",
      },
      required: "Required",
      errors: {
        name: "Please enter your name",
        email: "Invalid email",
        role: "Please select a role",
        interest: "Please select an area",
      },
      pitch: {
        status: "Now recruiting new members",
        points: [
          "100% free — no experience needed",
          "Response within 3–5 business days",
          "Choose up to 2 main areas",
        ],
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Q & A",
      description: "Common questions about CLB STEM-AI-ROBOTIC.",
      more: "Still have questions?",
      moreDesc: "Don't hesitate to reach out via the email below.",
    },
    footer: {
      description:
        "CLB STEM-AI-ROBOTIC — Nurturing the innovators of tomorrow. Science, technology, and creativity at your fingertips.",
      school: "[School Name]",
      quickLinks: "Quick Links",
      contact: "Contact",
      follow: "Follow",
      email: "stemclub@example.com",
      rights: "All rights reserved by CLB STEM-AI-ROBOTIC.",
      madeWith: "Built with a passion for science",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Language];
