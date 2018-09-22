package io.javabrains.springbootstarter.hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

//	public static void main(String[] args) {
//		// TODO Auto-generated method stub
//
//	}
	
	@RequestMapping("/hello")
	public String sayHi() {
		return "hi";
	}

}
