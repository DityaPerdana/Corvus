"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BookOpenIcon, TrophyIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Course } from "@/lib/types";

export default function StudentDashboard() {
  const { appUser, signOut } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated, redirect to login if not
    if (!appUser) {
      router.push('/login');
      return;
    }
    async function fetchEnrolledCourses() {
      try {
        const { data: enrollments, error: enrollError } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', appUser?.id);
        
        if (enrollError) throw enrollError;
        
        if (enrollments && enrollments.length > 0) {
          const courseIds = enrollments.map(enroll => enroll.course_id);
          
          const { data: coursesData, error: coursesError } = await supabase
            .from('courses')
            .select('*')
            .in('id', courseIds);
          
          if (coursesError) throw coursesError;
          setCourses(coursesData || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (appUser?.id) {
      fetchEnrolledCourses();
    }
  }, [appUser]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "ST";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {appUser?.full_name || "Student"}!</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={appUser?.avatar_url || ""} alt={appUser?.full_name || "Student"} />
            <AvatarFallback>{getInitials(appUser?.full_name)}</AvatarFallback>
          </Avatar>
          <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {courses.length > 0 ? `${Math.floor(Math.random() * 30) + 20}% completed overall` : "No courses yet"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 quizzes, 1 assignment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <TrophyIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 new this month</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-40 relative bg-gradient-to-r from-indigo-500 to-purple-600">
                    {course.cover_image && (
                      <img 
                        src={course.cover_image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => router.push(`/dashboard/student/courses/${course.id}`)}
                    >
                      Continue Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8">
              <div className="text-center">
                <BookOpenIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't enrolled in any courses yet.
                </p>
                <Button onClick={() => router.push('/courses')}>Browse Courses</Button>
              </div>
            </Card>
          )}

          <h2 className="text-2xl font-semibold mt-10 mb-4">Upcoming Schedule</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                    <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Module Quiz: Introduction to JavaScript</p>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                      <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                    </div>
                  </div>
                  <Badge className="ml-auto">Due Soon</Badge>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                    <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Assignment: Python Data Structures</p>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                      <p className="text-sm text-muted-foreground">Friday, 11:59 PM</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">Upcoming</Badge>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                    <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Final Project: UX Research</p>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                      <p className="text-sm text-muted-foreground">Next week, Monday</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">Upcoming</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <h2 className="text-2xl font-semibold mb-6">My Courses</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
                      {course.cover_image && (
                        <img 
                          src={course.cover_image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {course.description || "No description available"}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2 mb-4" />
                      <Button 
                        onClick={() => router.push(`/dashboard/student/courses/${course.id}`)}
                      >
                        Continue Course
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8">
              <div className="text-center">
                <BookOpenIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't enrolled in any courses yet.
                </p>
                <Button onClick={() => router.push('/courses')}>Browse Courses</Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="assignments">
          <h2 className="text-2xl font-semibold mb-6">My Assignments</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Due Soon</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Python Data Structures</p>
                        <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-1">Due in 3 days</Badge>
                        <p className="text-sm text-muted-foreground">Friday, 11:59 PM</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Module Quiz: Introduction to JavaScript</p>
                        <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="mb-1">Due Tomorrow</Badge>
                        <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Upcoming</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Final Project: UX Research</p>
                        <p className="text-sm text-muted-foreground">UX/UI Design Principles</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">Due in 7 days</Badge>
                        <p className="text-sm text-muted-foreground">Next Monday, 11:59 PM</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Final Exam: Advanced React</p>
                        <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">Due in 14 days</Badge>
                        <p className="text-sm text-muted-foreground">March 20, 10:00 AM</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grades">
          <h2 className="text-2xl font-semibold mb-6">My Grades</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Web Development Fundamentals</h3>
                  <ul className="space-y-4">
                    <li className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center border-b pb-4">
                      <div className="col-span-2">
                        <p className="font-medium">HTML/CSS Basics Quiz</p>
                        <p className="text-sm text-muted-foreground">Module 1</p>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-green-600 hover:bg-green-700">95%</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Completed Feb 15</p>
                      </div>
                    </li>
                    <li className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      <div className="col-span-2">
                        <p className="font-medium">JavaScript Fundamentals Quiz</p>
                        <p className="text-sm text-muted-foreground">Module 2</p>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-yellow-600 hover:bg-yellow-700">78%</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Completed Feb 22</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">UX/UI Design Principles</h3>
                  <ul className="space-y-4">
                    <li className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center border-b pb-4">
                      <div className="col-span-2">
                        <p className="font-medium">Design Thinking Quiz</p>
                        <p className="text-sm text-muted-foreground">Module 1</p>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-green-600 hover:bg-green-700">92%</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Completed Jan 30</p>
                      </div>
                    </li>
                    <li className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      <div className="col-span-2">
                        <p className="font-medium">Wireframing Assignment</p>
                        <p className="text-sm text-muted-foreground">Module 2</p>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-green-600 hover:bg-green-700">85%</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Completed Feb 8</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}