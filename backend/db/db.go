package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func InitDB(databaseURL string) (*sql.DB, error) {
	if databaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is not set")
	}

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Successfully connected to Neon PostgreSQL database")

	// Ensure tables exist
	createTablesSQL := `
	CREATE TABLE IF NOT EXISTS posts (
		id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL UNIQUE,
		content_html TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	);

	CREATE TABLE IF NOT EXISTS leads (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		message TEXT NOT NULL,
		status VARCHAR(50) DEFAULT 'new' NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	);

	CREATE TABLE IF NOT EXISTS case_studies (
		id SERIAL PRIMARY KEY,
		slug VARCHAR(255) NOT NULL UNIQUE,
		title VARCHAR(255) NOT NULL,
		client_name VARCHAR(255) NOT NULL,
		category VARCHAR(255) NOT NULL,
		meta_description TEXT NOT NULL,
		keywords TEXT NOT NULL,
		hero_category_text VARCHAR(255) NOT NULL,
		hero_title VARCHAR(255) NOT NULL,
		hero_image VARCHAR(550) NOT NULL,
		summary_title VARCHAR(255) NOT NULL,
		summary_text TEXT NOT NULL,
		client_brand_name VARCHAR(255) NOT NULL,
		engagement_length_value VARCHAR(50) NOT NULL,
		engagement_length_unit VARCHAR(50) NOT NULL,
		engagement_length_label VARCHAR(255) NOT NULL,
		front_end_tech_tags TEXT NOT NULL,
		engagement_type VARCHAR(255) NOT NULL,
		quote_text TEXT,
		quote_author VARCHAR(255),
		about_client_heading VARCHAR(255) NOT NULL,
		about_client_text TEXT NOT NULL,
		challenge_title VARCHAR(255) NOT NULL,
		challenge_paragraphs TEXT NOT NULL,
		challenge_callout_quote TEXT NOT NULL,
		solution_title VARCHAR(255) NOT NULL,
		solution_subtitle TEXT NOT NULL,
		technologies_title VARCHAR(255) NOT NULL,
		technologies TEXT NOT NULL,
		outcome_title VARCHAR(255) NOT NULL,
		outcome_subtitle TEXT NOT NULL,
		outcome_bullets TEXT NOT NULL,
		outcome_image VARCHAR(550) NOT NULL,
		previous_slug VARCHAR(255),
		previous_text VARCHAR(255),
		previous_client_name VARCHAR(255),
		next_slug VARCHAR(255),
		next_text VARCHAR(255),
		next_client_name VARCHAR(255),
		cta_heading VARCHAR(255) NOT NULL,
		cta_subheading VARCHAR(255) NOT NULL,
		cta_button_text VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	);`

	_, err = db.Exec(createTablesSQL)
	if err != nil {
		return nil, fmt.Errorf("failed to ensure tables exist: %w", err)
	}

	seedCaseStudies(db)

	return db, nil
}

func seedCaseStudies(db *sql.DB) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM case_studies").Scan(&count)
	if err != nil || count > 0 {
		return
	}

	log.Println("Seeding initial Case Studies into database...")

	insertSQL := `
		INSERT INTO case_studies (
			slug, title, client_name, category, meta_description, keywords,
			hero_category_text, hero_title, hero_image, summary_title, summary_text,
			client_brand_name, engagement_length_value, engagement_length_unit, engagement_length_label,
			front_end_tech_tags, engagement_type, quote_text, quote_author,
			about_client_heading, about_client_text, challenge_title, challenge_paragraphs, challenge_callout_quote,
			solution_title, solution_subtitle, technologies_title, technologies, outcome_title, outcome_subtitle,
			outcome_bullets, outcome_image, previous_slug, previous_text, previous_client_name,
			next_slug, next_text, next_client_name, cta_heading, cta_subheading, cta_button_text
		) VALUES
		(
			'blackboard',
			'Blackboard Case Study - OpnixLabs',
			'Blackboard',
			'EdTech & LMS',
			'Blackboard needed to scale its LMS development. Discover how OpnixLabs provided top 1% nearshore engineers, enhanced ServiceNow processes, and integrated Salesforce.',
			'Blackboard Case Study||EdTech Software Engineering||LMS Cloud Scalability||OpnixLabs Case Studies||ServiceNow Integration||Salesforce Integration',
			'CASE STUDY > BLACKBOARD',
			'Building Custom Tech Solutions for an Established EdTech Brand',
			'/images/hero.jpg',
			'The summary.',
			'Blackboard needed to scale its Learning Management System development. We enhanced system processes through new implementations in ServiceNow, and integrated key functions between Salesforce and tracker systems to streamline support and development.',
			'Blackboard',
			'2',
			'years',
			'Engagement length',
			'Salesforce||.NET||Java',
			'Staff Augmentation',
			'',
			'',
			'About Blackboard',
			'Blackboard is an educational technology software company known for its learning management system, which provides software for education, higher education, enterprise, and government clients. They enable institution leaders to keep up with the fast pace of change.',
			'The challenge.',
			'Blackboard''s software is complex, featuring custom solutions for university departments worldwide. Their priority was to scale their LMS development to push the boundaries of e-learning development and innovation.||To maintain growth rate, they turned to OpnixLabs for staff augmentation. They were looking for top nearshore developers to work across different learning projects and internal developer tools.',
			'Their priority was to scale their LMS to push the boundaries of e-learning development and innovation.',
			'The solution.',
			'Our rigorous vetting process ensured we provided the top 1% of nearshore engineers.',
			'All technologies used.',
			'C#||SQL Server||Salesforce||.NET||Java||Visual Basic||ServiceNow',
			'The outcome.',
			'During our engagement, we were involved with:',
			'Maintenance and improvement of their solutions in managed hosting services.||Development and testing of scalable and reliable custom software applications.||New implementations and processes with ServiceNow.||Analysis and design of new processes between systems: Salesforce, tracker integration, support, and development of ServiceNow.||Resolution of incidents in ServiceNow instances.',
			'/images/project2.jpg',
			'azlo',
			'Read how we helped Azlo.',
			'Azlo',
			'consumeraffairs',
			'Read how we helped ConsumerAffairs.',
			'ConsumerAffairs',
			'Facing similar challenges to Blackboard?',
			'See how we can help.',
			'Schedule a Call'
		),
		(
			'consumeraffairs',
			'ConsumerAffairs Case Study - OpnixLabs',
			'ConsumerAffairs',
			'MarTech & E-Commerce',
			'Improving Consumer Affairs'' website UX/UI through front-end development and QA with OpnixLabs nearshore software engineering teams.',
			'ConsumerAffairs Case Study||UX UI Design Front-End||OpnixLabs Software Engineering||Python Django Development',
			'CASE STUDY > CONSUMERAFFAIRS',
			'Improving Consumer Affairs'' website UX/UI through front-end development and QA',
			'/images/project2.jpg',
			'The summary.',
			'Consumer Affairs needed to improve the UX/UI of their website and app. We shaped the UX/UI design to prioritize the usability and performance of their tech.',
			'ConsumerAffairs',
			'6',
			'years',
			'Engagement length',
			'Python||JavaScript',
			'Staff Augmentation',
			'We chose to work with OpnixLabs because we wanted to have a team that felt like our internal staff and that was split into the active roles we were looking for. We had a close and fluid relationship with the nearshore team at every step of the way.',
			'Vice President of Engineering, ConsumerAffairs',
			'About Consumer Affairs',
			'ConsumerAffairs is a customer review platform that connects buyers with verified brand reviews, purchasing guides, and buyer intent intelligence.',
			'The challenge.',
			'ConsumerAffairs was looking for support in their front-end development and UX/UI design projects. Their primary focus was on the improvement of their customer environment, looking to increase accessibility, user retention, and platform speed.||To achieve their goals, they turned to OpnixLabs for software staff augmentation. They wanted a nearshore team of top developers and QA engineers.',
			'ConsumerAffairs needed help with front-end development, UX/UI design, and QA.',
			'The solution.',
			'Through our staff augmentation engagement model, we provided senior TECH talent. Our specialists undergo a rigorous vetting process that assesses not only their technical expertise, but also their soft skills.',
			'All technologies used.',
			'MySQL||Django||Python||JavaScript||Selenium||HTML5',
			'The outcome.',
			'During our engagement, we were involved with:',
			'Versatile code maintenance, infrastructure, and feature improvements for web applications.||Automated test suite execution for regression testing.||Impactful UX/UI design and front-end development to maximize conversion and site performance.||Smooth cross-functional engineering team partnership.',
			'/images/project1.jpg',
			'blackboard',
			'Read how we helped Blackboard.',
			'Blackboard',
			'azlo',
			'Read how we helped Azlo.',
			'Azlo',
			'Facing similar challenges to Consumer Affairs?',
			'See how we can help.',
			'Schedule a Call'
		);
	`

	_, err = db.Exec(insertSQL)
	if err != nil {
		log.Printf("Warning: Seeding case studies failed: %v\n", err)
	} else {
		log.Println("Case studies initial seed completed successfully")
	}
}
