jquery-safeform
===============

jQuery plugin to preven multiple form submission.

Using jquery.safeform.js
----------------------------
To enable the safeform via javascript:
```javascript
$('#example').safeform(options)
```

Options
-----------

|Name|Type|Default|Description|
|----|----|-------|-----------|
|timeout|int|null|Timeout in miliseconds. If timeout is specified form will be re-enabled for next submission after this timeout is passed. You can complete submission (re-enable from) manualy ignoring timeout.|
|submit|function|null|Callback function that will be called on submit event. Function context will be set to form element like for jQuery.submit(...) method.|


Methods
-----------

#### $().safeform(options)

Attaches a safeform plugin to an element collection.
```javascript
$('#example').safeform({
    timeout: 2000,
    submit: function(event) { 
        var $form = $(this);
        return false;
    }
})
```
#### .safeform('complete')

Completes a form submission, that means that form will be re-enabled and ready for next submission tour. 
```javascript
$('#example').safeform('complete')
```
#### .safeform('disable')

Manually disable a form (ignore submit events). If timeout is set, form will be re-enabled after this timeout. 
```javascript
$('#example').safeform('disable')
```
#### .safeform('submit')

It's just alias for $().submit().
```javascript
$('#example').safeform('submit')
```

Examples
------------

Imagine next simple form:
```html
<form id="example" action="/post">
    <input id="firsname" name="firsname" type="text" />
    <input type="submit" onclick="$('#example').submit(); return false;"/>
</form>
```

#### 1. Prevent double submission
```javascript
$('#example').safeform({
    submit: function() {
        // put here validation and ajax stuff...
        return false;
    }
})
```
#### 2. Submission with timeout
```javascript
$('#example').safeform({
    timeout: 5000, // 5 sec.
    submit: function() {
        // put here validation and ajax stuff...
        return false;
    }
})
```
#### 3. Manually re-enable the form (maybe when some event is happened)
```javascript
$('#example').safeform({
    submit: function() {
        // put here validation and ajax stuff...

        //so all done, we ready for next submission
        $(this).safeform('complete');
        return false;
    }
})
```
#### 4. Combining both methods to save user experience and re-enable form ASAP
```javascript
$('#example').safeform({
    timeout: 5000,
    submit: function() {
        // put here validation and ajax stuff...
            
        // no need to wait for timeout, re-enable the form ASAP
        $(this).safeform('complete');
        return false;
    }
})
```

Authors
-------
 
 - Maxim Kamenkov ([@caxap](https://github.com/caxap))
