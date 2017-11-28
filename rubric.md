# Homework 3 Rubric

So since this assignment involves JS, there are a numerous amount of ways to
complete this assignment. Be sure to look over each student's assignment
carefully.

## Points

* **+20**: If the pages loads with no errors. Every error will be an additional
	**-4**, for a maximum penalty of **-20**.
* **+10**: When the form submits, it successfully adds a new div to the
	`#post-list` element.
* **+48 (12 * 4 Posts)**: To test, add four div elements with different input data from
	the form. The penalties **for each** added post (**+12**) are as follows:
	* **-3**: The post div does not have a className of `.post`
	* **-3**: The post div does not have a span child with the correct title from
		`#input-username`
	* **-3**: The post div does not have a img child with the correct source from
		`#input-picture`
	* **-3**: The post div does not have a div child with the correct innerHTML
		from `#input-caption`
* **+21**: Test the hover effect on one of the posts, penalize as follows:
	* **-7**: Incorrect post-hover style `opacity`, should be `1`
	* **-7**: Incorrect style `transition duration`, should be `0.5ms`
	* **-7**: Incorrect style `transition property`, should be `opacity`
* **+1**: Just add the extra point to make it 100 points total ;)

[Here](https://github.com/robherley/cs146-js-autograder) is the link to the
autograder for this assignment if you choose to use. Be sure to also look over the assignment
manually to ensure it is functioning/graded properly.
