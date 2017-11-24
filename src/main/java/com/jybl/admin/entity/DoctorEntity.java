package com.jybl.admin.entity;

import java.io.Serializable;

/**


 create database xinyijia;
 
 use xinyijia;
 
 create table  doctor_info(
 id int not null auto_increment,
 name varchar(20),
 phone char(20) not null,
 password varchar(300) not null,
 sex char(3),
 practice_code varchar(100),
 hospital varchar(20),
 department varchar(20),
 title varchar(20),
 practice_pic varchar(300),
 adept varchar(300),
 experience varchar(300),
 QRcode_pic varchar(300),
 head_pic varchar(300),
 verify varchar(10),
 primary key (id)
 )engine=INNODB default charset=utf8;
 
 */


public class DoctorEntity implements Serializable{
	private Long id;
	private String name;//姓名
	private String phone;//电话
	private String password;//密码
	private String sex;//性别
	private String practice_code;//执业编码
	private String hospital;//医院
	private String department;//科室
	private String title;//职称
	private String practice_pic;//医生执业照
	private String adept;//专业擅长
	private String experience;//职业经验
	private String QRcode_pic;//二维码
	private String head_pic;//头像
	private String verify;//认证
	private String datetime;
	private Integer count = 0;

	public DoctorEntity(Long id, String name, String phone, String password, String sex, String practice_code,
                        String hospital, String department, String title, String practice_pic, String adept, String experience,
                        String qRcode_pic, String head_pic, String verify, String datetime, Integer count) {
		super();
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.password = password;
		this.sex = sex;
		this.practice_code = practice_code;
		this.hospital = hospital;
		this.department = department;
		this.title = title;
		this.practice_pic = practice_pic;
		this.adept = adept;
		this.experience = experience;
		this.QRcode_pic = qRcode_pic;
		this.head_pic = head_pic;
		this.verify = verify;
		this.datetime = datetime;
		this.count = count;
	}
	
	
	public DoctorEntity() {
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getPractice_code() {
		return practice_code;
	}
	public void setPractice_code(String practice_code) {
		this.practice_code = practice_code;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPractice_pic() {
		return practice_pic;
	}
	public void setPractice_pic(String practice_pic) {
		this.practice_pic = practice_pic;
	}
	public String getAdept() {
		return adept;
	}
	public void setAdept(String adept) {
		this.adept = adept;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public String getQRcode_pic() {
		return QRcode_pic;
	}
	public void setQRcode_pic(String qRcode_pic) {
		QRcode_pic = qRcode_pic;
	}
	public String getHead_pic() {
		return head_pic;
	}
	public void setHead_pic(String head_pic) {
		this.head_pic = head_pic;
	}

	public String getVerify() {
		return verify;
	}

	public void setVerify(String verify) {
		this.verify = verify;
	}

	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
}
